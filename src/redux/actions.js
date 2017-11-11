import fetch from 'isomorphic-fetch'

/* 异步测试用的基础url */
const baseUrl = ' https://www.easy-mock.com/mock/5a055c7be264ca23e8c71f4a'

/* 
	定义类型
	*/

// todo操作
export const OperateTodo = {
	ADD_TODO: 'ADD_TODO',
	COMPLETE_TODO: 'COMPLETE_TODO', // 完成一条
	BACKOUT_TODO: 'BACKOUT_TODO' // 撤销一条
}

// slider menu
export const SliderMenuDisplay = {
	SET_SLIDER_MENU_DISPLAY: 'SET_MENU_DISPLAY',
	TOGGLE_SLIDER_MENU_DISPLAY: 'TOGGLE_SLIDER_MENU_DISPLAY'
}
// header
export const SET_HEADER = 'SET_HEADER'

// cover
export const SET_COVER_DISPLAY = 'SET_COVER_DISPLAY'

// right
export const SET_RIGHT_ACTIVE = 'SET_RIGHT_ACTIVE'

// Sign
export const PostUserinfo = {
	REQUEST: 'REQUEST',
	RECEIVE: 'RECEIVE',
	FAIL: 'FAIL'
}

/*
 创建action函数
 */

/* todo */
export function addTodo (newTodo) {
	return {
		 type: OperateTodo.ADD_TODO,
		 newTodo
	}
}

export function completeTodo (index) {
	return {
		type: OperateTodo.COMPLETE_TODO,
		index
	}
}

export function backoutTodo (index) {
	return {
		type: OperateTodo.BACKOUT_TODO,
		index
	}
}

/* slider menu */
export function showSliderMenu (display) {
	return {
		type: SliderMenuDisplay.SET_SLIDER_MENU_DISPLAY,
		display: true
	}
}

export function hideSliderMenu (display) {
	return {
		type: SliderMenuDisplay.SET_SLIDER_MENU_DISPLAY,
		display: false
	}
}

export function toggleSliderMenu () {
	return {
		type: SliderMenuDisplay.TOGGLE_SLIDER_MENU_DISPLAY
	}
}

/* cover */
export function showCover (display) {
	return {
		type: SET_COVER_DISPLAY,
		display: true
	}
}

export function hideCover (display) {
	return {
		type: SET_COVER_DISPLAY,
		display: false
	}
}

/* header */
/**
 * example: 
 * headerObj = {
 * 	text: String, // 标题
 *  icons: [{
 * 		className: String, 
 * 		location: 'right' || 'r' || 'left' || 'l', // 图标所在位置
 * 		onClick: function, // 点击时的触发事件 
 * 	}]
 * }
 */
export function setHeader (headerObj) {
	return {
		type: SET_HEADER,
		headerObj
	}
}

export function setRightActive (active) {
	return {
		type: SET_RIGHT_ACTIVE,
		active
	}
}

/* sign */
export function postUserinfo () {
	return dispatch => {
		dispatch({type: PostUserinfo.REQUEST})
		return fetch(baseUrl + '/dida_sign_in')
			.then(response => response.json())
			.then(json => {
				dispatch({type: PostUserinfo.RECEIVE, json})
				return json
			})
	}
}