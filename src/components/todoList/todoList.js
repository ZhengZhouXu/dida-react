import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import { connect } from 'react-redux'
import { completeTodo, backoutTodo } from 'src/redux/actions'
import styles from './todoList.css'

class TodoList extends Component {
	render() {
		// 初始化
		const { completed, onClick } = this.props
		let list = this.props.list
		
		const iconClass = completed ? 'fa fa-check-square-o' : 'fa fa-square-o'
		const liClass = completed ? 'li-completed' : ''
		// 获得对应的list
		list = list.filter((item) => {
			return !!item.completed === !!completed
		})
		list = list.map((item) => {
			return (
				<li key={item.id} onClick={onClick.bind(this, item.id)} styleName={liClass}>
					<i className={iconClass} styleName="icon"></i>
					{item.text}
				</li>
			)
		})


		if (list.length === 0) return

		return (
			<div>
				{
					completed && <div styleName="tag">已完成</div>
				}
				<ul styleName="todo-list">{list}</ul>
			</div>
		)
	}
}

function mapStateToProps (state) {
	const list = state.todos
	return {
		list
	}
}

function mapDispatchToProps (dispatch, ownProps) {
	return {
		onClick: (id) => {
			if (ownProps.completed) { // 已完成的todos
				dispatch(backoutTodo(id))
			} else {
				dispatch(completeTodo(id))
			}
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(TodoList, styles)) 