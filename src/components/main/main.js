import React, { Component } from 'react'
// import { Provider } from 'react-redux'
import TodoList from './children/todoList/todoList'
// import store from 'src/redux/store'
import './mian.css'

class Main extends Component {

    render () {
        // const style = this.getPositon()
        return (					
					<main>
						<TodoList />
						<TodoList completed={true}/>		
					</main>
        )
    }
} 

export default Main