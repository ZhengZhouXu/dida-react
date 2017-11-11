import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setRightActive } from 'src/redux/actions'
import cssModules from 'react-css-modules'
import styles from './menuHeader.css'

class MenuHeader extends Component {
	componentDidMount () {
	}
	render () {
		const { showSign, name, avatar } = this.props
		return (
			<div styleName="menu-header">
				<div>
					{
						avatar ? <img styleName="avatar" src={avatar} alt="头像"/> : <i styleName="avatar" className="fa fa-user-circle"></i>
					}	
					<div styleName="right-d">
						<i className="fa fa-search" styleName="icon"></i>
						<i className="fa fa-cog" styleName="icon"></i>
					</div>			
				</div>
				<div>
					{
						name ? <span styleName="name">{name}</span> : 
						<a styleName="btn" className="ripple" onClick={showSign}>登录或注册</a>
					}
				</div>
			</div>
		)
	}
}

function mapStateToProps (state) {
	return {
		name: state.userinfo.name,
		avatar: state.userinfo.avatar
	}
}

function mapDispatchToProps (dispatch, ownProps) {
	return {
		showSign: () => {
			dispatch(setRightActive(true))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(MenuHeader, styles))