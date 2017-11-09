import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from './menuList.css'

class MenuList extends Component {
	List ({list}) {
		return (
			<ul>
				{
					list.map(item => (
							<li key={item.text} className={item.active ? 'active' : ''}>
								<i className={'icon ' + item.icon}></i>
								<span>{item.text}</span>
							</li>
						)
					)
				}
			</ul>
		)
	}

	render () {
		const List = this.List
		const fixList = [{
			icon: 'fa fa-calendar-check-o',
			text: '今天',
			active: true
		}, {
			icon: 'fa fa-inbox',
			text: '收集箱'
		}, {
			icon: 'fa fa-calendar',
			text: '日历'
		}]
		return (
			<div styleName="menu-list">
				<List list={fixList} />
			</div>
		)
	}
}

export default cssModules(MenuList, styles)