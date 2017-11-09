import { combineReducers } from 'redux'
import * as actions from './actions'

const { 
	OperateTodo, 
	SliderMenuDisplay,
	SET_HEADER,
	SET_COVER_DISPLAY
} = actions

function changeTodoCompleted (index, completed) {
	return (item) => {
		if (item.index === index)
			item.completed = completed
		return item
	} 
}

function todos (state=[{id:1,text: '测试1号，嘿嘿', index: 0}, {id:2,text: '测试2号，学习react', index: 1}], action) {
	switch(action.type) {
		case OperateTodo.ADD_TODO:
			action.newTodo.index = state.length 
			return [...state, action.newTodo]
		case OperateTodo.COMPLETE_TODO:
			return state.map(changeTodoCompleted(action.index, true))
		case OperateTodo.BACKOUT_TODO: 
			return state.map(changeTodoCompleted(action.index, false))
		default:
			return state
	}
}

function sliderMenuDisplay (state = true, action) {
	switch(action.type) {
		case SliderMenuDisplay.SET_SLIDER_MENU_DISPLAY: return action.display
		case SliderMenuDisplay.TOGGLE_SLIDER_MENU_DISPLAY: return !state
		default: return state
	}
}

function header (state = {text: '', icons: []}, action) {
	switch(action.type) {
		case SET_HEADER: return action.headerObj
		default: return state
	}
}

function coverDisplay (state = false, action) {
	switch(action.type) {
		case SET_COVER_DISPLAY: return action.display
		default: return state
	}
}

const reducers = combineReducers({
	todos,
	sliderMenuDisplay,
	header,
	coverDisplay
})

export default reducers