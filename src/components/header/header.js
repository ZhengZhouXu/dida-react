import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './header.css'

class Header extends Component {
	render () {
		return (
			<header styleName="header">
				<span styleName="left">1</span>
				<span styleName="text">2</span>
				<span styleName="rigth">3</span>
			</header>
		)
	}
}

export default CSSModules(Header, styles)