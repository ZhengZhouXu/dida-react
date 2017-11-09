import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from './menuHeader.css'

class MenuHeader extends Component {
	componentDidMount () {
	}
	render () {
		return (
			<div styleName="menu-header">
				<div>
					<i className="fa fa-user-circle"></i>
					<div styleName="right-d">
						<i className="fa fa-search" styleName="icon"></i>
						<i className="fa fa-cog" styleName="icon"></i>
					</div>			
				</div>
				<div>
					<a styleName="btn" className="ripple">登录或注册</a>
				</div>
			</div>
		)
	}
}

export default cssModules(MenuHeader, styles)