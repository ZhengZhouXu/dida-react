import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './animation.css'

export function AnimationFade ({children, ...props}) {
	
	function onEnter (el) {
		el.style.display = 'inline-block'
	}

	function onExited (el) {
		el.style.display = 'none'
	}

	return (
		<CSSTransition {...props} timeout={1000} classNames="fade" onEnter={onEnter} onExited={onExited}>
			{ children }
		</CSSTransition>
	)
}