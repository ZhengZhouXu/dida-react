import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './header.css'

class Header extends Component {
	
	constructor (props) {
		super(props)
		this.state = {background: "rgb(94, 117, 228)", color: '#fff'}
	}

	getHeaderHeight () {
		return window.innerHeight * 0.09
	}

	render () {
		const height = this.getHeaderHeight() + 'px'
		const style = {
			height: height,
			lineHeight: height,
			background: this.state.background,
			color: this.state.color
		}
		return (
			<header styleName="header" style={style}>
				<div styleName="left">
					<i className="fa fa-bars" styleName="icon"></i>
				</div>
				<span styleName="text">今天</span>
				<div styleName="right">
				<i className="fa fa-dot-circle-o" styleName="icon"></i>
					<i className="fa fa-ellipsis-v" styleName="icon"></i>
				</div>
			</header>
		)
	}
}

export default CSSModules(Header, styles)