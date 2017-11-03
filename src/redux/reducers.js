import { combineReducers } from 'redux'
import * as actions from './actions'

function changeTodoCompleted (id, completed) {
	return (item) => {
		if (item.id === id)
			item.completed = completed
		return item
	} 
}

function todos (state=[{id:1,text: '测试1号，嘿嘿'}, {id:2,text: '测试2号，学习react'}], action) {
	const operate = actions.OperateTodo
	switch(action.type) {
		case operate.ADD_TODO: 
			return [...state, action.newTodo]
		case operate.COMPLETE_TODO:
			return state.map(changeTodoCompleted(action.id, true))
		case operate.BACKOUT_TODO: 
			return state.map(changeTodoCompleted(action.id, false))
		default:
			return state
	}
}

const reducers = combineReducers({
	todos
})

export default reducers