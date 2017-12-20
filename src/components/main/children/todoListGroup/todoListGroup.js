import React, { Component } from "react"
import { connect } from 'react-redux'
import { setAddTodoSetting } from 'src/redux/actions'
import TodoList from '../todoList/todoList.js'

class TodoListGroup extends Component {

	getTodayList(list) {
		const date = new Date()
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()

		return list.filter((item) => {
			if (item.startDate === `${year}${month}${day}`) {
				return true
			}
			return false
		})
	}

	componentWillMount () {
		const date = new Date()
		const setAddTodoSetting = this.props.setAddTodoSetting
		let type = this.props.match.params.type
		switch (type) {
			case 'today':
				setAddTodoSetting({date: `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`}) // 写入日期
				break
			default:
				break
		}
	}

	render() {
		let list = [].concat(this.props.list) // 深拷贝
		let type = this.props.match.params.type

		switch (type) {
			case 'today':
				list = this.getTodayList(list)
				break;
			default:
				break;
		}

		const todoListUpdate = this.props.todoListUpdate
		
		if (list.length <= 0) {
			return (
				<div className="nothing">
					<img alt='没有任务' src="https://ws3.sinaimg.cn/large/006tNc79gy1fmfjyy2qkfj304v04xjri.jpg" />
					<p>今天没有任务</p>
					<p>享受美好的一天吧</p>
				</div>
			)
		}

		return (
			<div>
				<TodoList onDidUpdate={todoListUpdate} list={list} />
				<TodoList onDidUpdate={todoListUpdate} completed={true} list={list} />
			</div>
		)

	}
}

function mapStateToProps(state) {
	return {
		list: state.todos,
	}
}

function mapDispatchToProps (dispatch) {
	return {
		setAddTodoSetting: (setting) => {
			dispatch(setAddTodoSetting(setting))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListGroup)