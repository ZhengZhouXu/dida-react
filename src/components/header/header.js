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
				<i className="fa fa-bars" aria-hidden="true"></i>
				<span styleName="text">2</span>
				<span styleName="right">3</span>
			</header>
		)
	}
}

export default CSSModules(Header, styles)