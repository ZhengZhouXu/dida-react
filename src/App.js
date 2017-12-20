import React, { Component } from 'react'
import { Provider } from 'react-redux'
import * as actions from './redux/actions'
import store from './redux/store'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Main from './components/main/main'
import SliderMenu from './components/sliderMenu/sliderMenu'
import Cover from './components/cover/cover'
import Right from './components/rigth/right'
import { AnimationFade, AnimationSlideRight } from './components/animation/animation'
import Ripple from 'src/static/js/ripple.min'
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {

	constructor (props) {
		super(props)
		this.state = {coverDisplay: true, rightActive: false}

		this.storeSubscribe = this.storeSubscribe.bind(this)
		this.storeSubscribe()
	}

	storeSubscribe () {
		store.subscribe(() => {	
			const { 
				coverDisplay, 
				rightActive 
			} = store.getState()

			this.setState({
				coverDisplay,
				rightActive: rightActive
			})
		})
	}

	componentDidMount () {
		const {setHeader, toggleSliderMenu, showCover} = actions
		const initHeader = {
			text: '今天',
			icons: [{
				className: 'fa fa-bars',
				location: 'l',
				onClick: () => {
					store.dispatch(toggleSliderMenu())
					store.dispatch(showCover())
				}
			}, {
				className: 'fa fa-bullseye',
				location: 'r',
			}, {
				className: 'fa fa-ellipsis-v',
				location: 'r',
			}]
		}
		store.dispatch(setHeader(initHeader))

		new Ripple({
			color: 'rgba(0, 0, 0, .2)'
		})
	}

	render () {
			return (
				<Provider store={store}>
					<Router>
						<div className="app">
							<Header />
							<Main />
							<Footer />
							<SliderMenu />
							<AnimationFade in={this.state.coverDisplay}>
								<Cover />	
							</AnimationFade>
							<AnimationSlideRight in={this.state.rightActive}>
								<Right />
							</AnimationSlideRight>
						</div>
					</Router>
				</Provider>
			)
	}
}

export default App