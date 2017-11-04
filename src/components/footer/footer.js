import React, { Component } from 'react'
import AddTodo from './children/addTodo/addTodo'
import './footer.css'

class Footer extends Component {
	getFooterHeight () {
		return Math.round(window.innerHeight * 0.08)
	}

	render () {
		const style = {
			height: this.getFooterHeight()
		}

		return (
			<footer style={style}>
				<AddTodo />
			</footer>
		)
	}
}

export default Footer