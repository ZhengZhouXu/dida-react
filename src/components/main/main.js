import React, { Component } from 'react'
// import { Provider } from 'react-redux'
import TodoList from '../todoList/todoList'
// import store from 'src/redux/store'
import './mian.css'

class Main extends Component {
    getPositon () {
        return {
            top: Math.round(window.innerHeight * 0.09) + 'px' , // 阴影占3px
            bottom: 0 // 暂时写为 0
        }
    }

    render () {
        const style = this.getPositon()
        return (					
					<main style={style}>
						<TodoList />
						<TodoList completed={true}/>		
					</main>
        )
    }
} 

export default Main