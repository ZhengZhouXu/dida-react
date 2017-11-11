import { combineReducers } from 'redux'
import * as actions from './actions'

const { 
	OperateTodo, 
	SliderMenuDisplay,
	SET_HEADER,
	SET_COVER_DISPLAY,
	SET_RIGHT_ACTIVE,
	PostUserinfo
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

function sliderMenuDisplay (state = false, action) {
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

function rightActive (state = false, action) {
	switch(action.type) {
		case SET_RIGHT_ACTIVE: return action.active
		default: return state
	}
}

/* 用于登录的账号密码，此处方便测试返回账号密码，真实环境中只返回登录结果：成功或失败 */
function userinfo (state = {}, action) {
	switch(action.type) {
		case PostUserinfo.RECEIVE: return action.json
		case PostUserinfo.REQUEST:
		default: return state
	}
}

const reducers = combineReducers({
	todos,
	sliderMenuDisplay,
	header,
	coverDisplay,
	rightActive,
	userinfo
})

export default reducers