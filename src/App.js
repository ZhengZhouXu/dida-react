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
import { AnimationFade } from './components/animation/animation'
import Ripple from 'src/static/js/ripple.min'

class App extends Component {

	constructor (props) {
		super(props)
		this.state = {coverDisplay: true}
		store.subscribe(() => {
			const { coverDisplay } = store.getState()
			this.setState({coverDisplay})
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
					<div className="app">
						<div className="index">
							<Header />
							<Main />
							<Footer />
							<SliderMenu />
							<AnimationFade in={this.state.coverDisplay}>
								<Cover />	
							</AnimationFade>
						</div>
						<Right />
					</div>
				</Provider>
			)
	}
}

export default App