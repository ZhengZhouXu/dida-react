import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import CssModules from 'react-css-modules'
import styles from './sign.css'

class Sign extends Component {
	constructor (props) {
		super(props)
		this.state = {x: 0}

		this.handleToSignUp = this.handleToSignUp.bind(this)
		this.handleToSignIn = this.handleToSignIn.bind(this)
	}

	handleToSignUp (e) {
		let width = this.inputGroup.clientWidth
		this.setState({x: width}) 
		e.preventDefault()
	}

	handleToSignIn (e) {
		this.setState({x: 0}) 
		e.preventDefault()
	}

	render () {
		return (
			<div styleName="sign">
				<div styleName="logo">
					<img src="https://ws3.sinaimg.cn/large/006tNc79gy1flaytobvmej30ah0ab74n.jpg" alt="logo" width="135" height="135" />
				</div>
				<div styleName="input-group" ref={(el) => this.inputGroup = el}>
					<Motion style={{x: spring(this.state.x)}}>
						{
							({x}) => (
								<div className={styles.wrapper}  style={{transform: `translateX(-${x}px)`}}>
									<div className={styles["sign-in"]}>
										<input type="text" placeholder="邮箱"/>
										<input type="text" placeholder="密码"/>
										<a className={styles.btn}>注册</a>
										<a className={styles["link-btn"]} onClick={this.handleToSignUp}>我已有账号</a>
									</div>
									<div className={styles["sign-up"]}>
										<input type="text" placeholder="邮箱"/>
										{/* <input type="text" placeholder="密码"/> */}
										<a className={styles["btn"]}>登录</a>
										<div className={styles["link-btn-group"]}>
											<a className={styles["link-btn"]} style={{float: 'left'}}>忘记密码</a>
											<a className={styles["link-btn"]} onClick={this.handleToSignIn} style={{float: 'right'}}>创建账户</a>
										</div>
									</div>
								</div>
							)
						}
					</Motion>
				</div>
				<div styleName="footer">
					<i className="fa fa-qq"></i>
					<i className="fa fa-weixin"></i>
					<i className="fa fa-weibo"></i>
				</div>
			</div>
		)
	}
}

export default CssModules(Sign, styles)