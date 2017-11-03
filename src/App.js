import React, { Component } from 'react'
// import { Router, Route} from 'react-router'
import Header from './components/header/header'
// import TodoList from './components/todoList/todoList'
import Main from './components/main/main'
class App extends Component {
    render () {
        return (
            <div className="app">
							<Header />
							<Main />
            </div>
        )
    }
}

export default App