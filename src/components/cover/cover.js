import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hideCover, hideSliderMenu } from 'src/redux/actions'

import cssModules from 'react-css-modules'
import styles from './cover.css'

class Cover extends Component {
	render () {
		const {onCoverClick} = this.props
		return (
			<div styleName="cover" onClick={onCoverClick}>
			</div>
		)
	}
}

function mapStateToProps (state) {
	return {
		coverDisplay: state.coverDisplay
	}
}

function mapDispatchToProps (dispatch) {
	return {
		onCoverClick: () => {
			dispatch(hideCover())
			dispatch(hideSliderMenu())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Cover, styles)) 