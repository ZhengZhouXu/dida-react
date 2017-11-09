import React, { Component } from 'react'
import Sign from './children/sign/sign' 
import CssModules from 'react-css-modules'
import styles from './right.css'

class Right extends Component {
	// constructor (props) {
	// 	super(props)
	// 	// this.state.height = {height: '100%'}
	// 	this.windowHeight = window.innerHeight
	// 	console.log(this.windowHeight)
	// }

	// handleInputFocus () {
		
	// 	this.state.height = {height: this.windowHeight}
	// }

	render () {
		return (
			<div styleName="right">
				<Sign />
			</div>
		)
	}
}

export default CssModules(Right, styles)