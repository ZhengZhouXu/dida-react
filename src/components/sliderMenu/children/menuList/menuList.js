import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from './menuList.css'
import { Link } from 'react-router-dom'
import { hideSliderMenu, hideCover, setHeader } from 'src/redux/actions'
import { connect } from 'react-redux'

class MenuList extends Component {

	constructor (props) {
		super(props)
		this.state = {
			fixList: [{
				icon: 'fa fa-calendar-check-o',
				text: '今天',
				active: true,
				url: '/todolistgroup/today'
			}, {
				icon: 'fa fa-inbox',
				text: '收集箱',
				url: '/todolistgroup/collectionbox'
			}, {
				icon: 'fa fa-calendar',
				text: '日历',
				url: '/calendar'
			}]
		}
		this.List = this.List.bind(this)
		this.sliderMenuClick = this.sliderMenuClick.bind(this)
	}

	List ({list}) {
		return (
			<ul>
				{
					list.map(item => (
							<li key={item.text} className={item.active ? 'active' : ''}>
								<Link to={item.url} onClick={this.sliderMenuClick.bind(this, item)}>
									<i className={'icon ' + item.icon}></i>
									<span>{item.text}</span>
								</Link>
							</li>
						)
					)
				}
			</ul>
		)
	}

	sliderMenuClick (item) {
		// debugger
		let fixList = this.state.fixList
		let initActive = item.active // 初始时的选中状态
		fixList.forEach(i => i === item ? i.active = true : i.active = false)
		this.setState({fixList})
		this.props.hideSliderMenuAndCover()
		// 修改标题
		if (!initActive) {
			if (item.text === '日历') {
				const nowMonth = new Date().getMonth()
				this.props.setHeadetText(`${nowMonth + 1}月`)
			} else {
				this.props.setHeadetText(item.text)
			}
		}
	}

	render () {
		const List = this.List
		
		return (
			<div styleName="menu-list">
				<List list={this.state.fixList} />
			</div>
		)
	}
}

function mapDispatchToProps (dispatch, ownProps) {
	return {
		hideSliderMenuAndCover: () => {
			dispatch(hideSliderMenu())
			dispatch(hideCover())
		},
		setHeadetText: (text) => {
			dispatch(setHeader({text}))
		}
	}
}

export default connect(null, mapDispatchToProps)(cssModules(MenuList, styles))