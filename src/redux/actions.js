/* 
	定义类型
	*/

// todo操作
export const OperateTodo = {
	ADD_TODO: 'ADD_TODO',
	COMPLETE_TODO: 'COMPLETE_TODO', // 完成一条
	BACKOUT_TODO: 'BACKOUT_TODO' // 撤销一条
}

/*
 创建action函数
 */

export function addTodo () {
	return {
		 type: OperateTodo.ADD_TODO
	}
}

export function completeTodo (id) {
	return {
		type: OperateTodo.COMPLETE_TODO,
		id
	}
}

export function backoutTodo (id) {
	return {
		type: OperateTodo.BACKOUT_TODO,
		id
	}
}