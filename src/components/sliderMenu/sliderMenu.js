import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hideSliderMenu, hideCover } from 'src/redux/actions'
import styles from './sliderMenu.css'
import { Motion, spring } from 'react-motion'
import MenuHeader from './children/menuHeader/menuHeader'
import MenuList from './children/menuList/menuList'

class SliderMenu extends Component {
	render () {
		let menuWidth = 300
		let left = this.props.sliderMenuDisplay ? 0 : -menuWidth
		const menuStyle = {
			width: menuWidth
		}
		return (
			<Motion style={{left: spring(left)}}>
			{
				({left}) => (
					<div className={styles["slider-menu"]} style={Object.assign({}, menuStyle, {left})}>
						<MenuHeader />
						<MenuList />
						<i className={styles['close']} onClick={this.props.closeSliderMenu} style={{float: 'right'}}>关闭</i>
					</div>
				)
			} 
			</Motion>
		)
	}
}

function mapStateToProps (state) {
	return {
		sliderMenuDisplay: state.sliderMenuDisplay
	}
}

function mapDispatchToProps (dispatch, ownProps) {
	return {
		closeSliderMenu: () => {
			dispatch(hideSliderMenu())
			dispatch(hideCover())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderMenu)