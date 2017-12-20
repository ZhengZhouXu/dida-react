import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import { connect } from 'react-redux'
import { completeTodo, backoutTodo } from 'src/redux/actions'
import { UpdateScroll } from 'src/redux/actions'
// import Ripple from 'src/static/js/ripple.min'
import styles from './todoList.css'

class TodoList extends Component {
	componentDidUpdate () {
		this.props.refreshScroll()
	}

	render() {
		// 初始化
		const { completed, onClick } = this.props
		let list = this.props.list
		
		const iconClass = completed ? 'fa fa-check-square-o' : 'fa fa-square-o'
		const liClass = completed ? 'li-completed' : ''
		// debugger
		list = list.filter((item) => {
			return !!item.completed === !!completed
		})
		list = list.map((item) => {
			return (
				<li key={item.index} className="ripple" onClick={onClick.bind(this, item.index)} styleName={liClass}>
					<i className={iconClass} styleName="icon"></i>
					<span>{item.text}</span>
					<span>删除</span>
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

function mapDispatchToProps (dispatch, ownProps) {
	return {
		onClick: (index) => {
			if (ownProps.completed) { // 已完成的todos
				dispatch(backoutTodo(index))
			} else {
				dispatch(completeTodo(index))
			}
		},
		refreshScroll: () => dispatch({
			type: UpdateScroll.MAIN_SCROLL
		})
	}
}

export default connect(null, mapDispatchToProps)(cssModules(TodoList, styles)) 