import React, { Component } from 'react'
import { connect } from 'react-redux'
import { UpdateScroll } from 'src/redux/actions'
import { Route, withRouter } from 'react-router-dom'
import BScroll from 'better-scroll'
import TodoList from './children/todoList/todoList'
import Calendar from '../calendar/calendar'
import todoListGroup from './children/todoListGroup/todoListGroup.js'
import './mian.css'


class Main extends Component {
	constructor (props) {
		super(props)
		// this.Today = this.Today.bind(this)
		this.CollectionBox = this.CollectionBox.bind(this)
	}

	componentDidMount () {
		let scroll = new BScroll(this.wrapper, {
			click: true
		})
		this.props.setScroll(scroll) // 写入scroll，以便其他组件更新
	}

	// 收集箱
	CollectionBox (props) {
		let list = [].concat(this.props.list) // 深拷贝

		if (list.length <= 0) {
			return (
				<div className="nothing">
					<img src="https://ws3.sinaimg.cn/large/006tNc79gy1fmfjyy2qkfj304v04xjri.jpg"/>
					<p>今天没有任务</p>
					<p>享受美好的一天吧</p>
				</div>
			)
		}

		return (
			<div>
				<TodoList onDidUpdate={this.refreshScroll} list={list} />
				<TodoList onDidUpdate={this.refreshScroll} completed={true} list={list} />
			</div>
		)
	}

	test () {
		return (
			<div>
				{this.props.params.type}
			</div>
		)
	}

	render () {
			// const style = this.getPositon()
			
			return (					
				<main className="scroll-wrapper" ref={el => this.wrapper = el}>
					<div className="scroll-content">
						<Route path="/todolistgroup/:type" component={todoListGroup}/>
						<Route path="/calendar" component={Calendar} />	
					</div>
				</main>
			)
	}
}

function mapStateToProps (state) {
	const list = state.todos
	return {
		list
	}
}

function mapDispatchToProps (dispatch) {
	return {
		setScroll: (scroll) => {
			dispatch({
				type: UpdateScroll.MAIN_SCROLL,
				scroll
			})
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))