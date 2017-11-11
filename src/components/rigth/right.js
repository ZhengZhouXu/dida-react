import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sign from './children/sign/sign' 
import CssModules from 'react-css-modules'
import styles from './right.css'

class Right extends Component {
	constructor (props) {
		super(props)
		this.state = {height: window.innerHeight}
	}

	componentDidMount () {
		const doc = document
		window.onresize = () => {
			if (doc.activeElement === doc.body && window.innerHeight > this.state.height) {
				this.setState({
					height: window.innerHeight
				})
			}
		}
	}

	render () {
		return (
			<div styleName="right" style={{height: `${this.state.height}px`}}>
				<Sign />
			</div>
		)
	}
}

function mapStateToProps (state) {
	return {
		signActive: state.signActive
	}
}

export default connect(mapStateToProps)(CssModules(Right, styles))