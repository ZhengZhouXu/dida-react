import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodo, UpdateScroll } from 'src/redux/actions'
import cssModules from 'react-css-modules'
import styles from './addTodo.css'

class AddTodo extends Component {
	
	constructor (props) {
		super(props)
		this.state = {text: '', sendColor: '#ccc'}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSendClick = this.handleSendClick.bind(this)
	}	

	handleInputChange (e) {
		this.setState({
			text: e.target.value,
		})
		e.preventDefault()
	}

	handleSendClick (e) {
		const { addNewTodo, refreshScroll } = this.props
		const newTodo = {
			text: this.state.text, 
			createDate: Date.now(),
			startDate: this.props.addTodoSetting.date,
			completed: false
		}
		addNewTodo(newTodo)
		refreshScroll() // 刷新main的scroll
		this.setState({text: ''})
		e.preventDefault()
	}

	render () {
		const text = this.state.text
		const sendColor = text.length > 0 ? 'rgb(94, 117, 228)' : '#ccc'
		return (
			<div styleName="add-todo">
				<input type="text" value={text} onChange={this.handleInputChange} placeholder="准备做什么?"/>
				<div styleName="send" style={{color: sendColor}} onClick={this.handleSendClick}><i className="fa fa-send"></i></div>
			</div>
		)
	}
}

function mapDispatchToProps (dispatch, ownProps) {
	return {
		addNewTodo: (newTodo) => {
			dispatch(addTodo(newTodo))
		},
		refreshScroll: () => {
			dispatch({
				type: UpdateScroll.MAIN_SCROLL
			})
		}
	}
}

function mapStateToProps (state) {
	return {
		addTodoSetting: state.addTodoSetting // 所要添加todo的时间
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(AddTodo, styles))