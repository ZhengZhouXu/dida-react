import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './animation.css'

// fade
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

// slider
export function AnimationSlideRight ({children, ...props}) {
	
	function clearTransform (el) {
		el.style.transform = ''
	}

	function onEntered (el) {
		el.style.transform = 'translateX(0)'
	}

	function onExited (el) {
		el.style.transform = 'translateX(100%)'
	}

	return (
		<CSSTransition 
			{...props} 
			timeout={1000} 
			classNames="slider-right" 
			onEnter={clearTransform}
			onEntered={onEntered}
			onExit={clearTransform}
			onExited={onExited}>
			{children}
		</CSSTransition>
	)
}