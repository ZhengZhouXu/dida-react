import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from './header.css'

class Header extends Component {
	
	constructor (props) {
		super(props)
		this.state = {background: "rgb(94, 117, 228)", color: '#fff'}
	}

	// location = 'right' || 'left'
	getIconDom (icons, location) {
		return icons.map((i, index) => {
			return (i.location === location || i.location === location[0]) &&
			 	<i key={index} className={i.className} styleName="icon" onClick={i.onClick}></i>
		})
	}

	render () {
		// const height = this.getHeaderHeight() + 'px'
		const style = {
			background: this.state.background,
			color: this.state.color
		}
		const { icons, text } = this.props.headerObj
		return (
			<header styleName="header" style={style}>
				<div styleName="left">
					{this.getIconDom(icons, 'left')}
				</div>
				<span styleName="text">{text}</span>
				<div styleName="right">
					{this.getIconDom(icons, 'right')}
				</div>
			</header>
		)
	}
}

function mapStateToProps (state) {
	return {
		headerObj: state.header
	}
}

export default connect(mapStateToProps)(CSSModules(Header, styles))