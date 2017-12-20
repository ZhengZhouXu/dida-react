import React, { Component } from 'react'
import styles from './calendar.css'
import cssModules from 'react-css-modules'
import { connect } from 'react-redux'
import { setHeader } from 'src/redux/actions'
// import Swiper from 'swiper'
import Velocity from 'velocity-animate'


class Calendar extends Component {
	constructor (props) {
		super(props)

		var date = new Date()
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()

		this.date = {
			width: 0,
			activeIndex: 2,
			selectYear: year,
			selectMonth: month,
			activeDay: false, // 是否有选中的日期
			direction: 0, // 滑动方向，0: 不动, -1: 左边，1: 右边
		}

		this.state = {
			translateX: 0,
			duration: 0,
			dateList: this.getAllDateList(year, month),
			activeDay: day,
			activeMonth: month,
			activeYear: year
		}

		// touch相关的内容
		this.touch = {
			start: 0, // TouchStart的位置
			changeStart: 0, // 每次改变时重新赋值
		}

		this.handleTouchStart = this.handleTouchStart.bind(this)
		this.handleTouchMove = this.handleTouchMove.bind(this)
		this.handleTouchEnd = this.handleTouchEnd.bind(this)
		
		this.slideDirection = this.slideDirection.bind(this)

		this.autoSlide = this.autoSlide.bind(this)
		this.preAdd = this.preAdd.bind(this)
		this.dateItemClick = this.dateItemClick.bind(this)
		this.completeSlider = this.completeSlider.bind(this)
		this.beginSlider = this.beginSlider.bind(this)
		// this.slideTo = this.slideTo.bind(this)
		// this.leftSlide = this.leftSlide.bind(this)
		// this.rightSlide = this.rightSlide.bind(this)
	}

	componentDidMount () {
		this.date = Object.assign({}, this.date, {
			width: this.dateList.clientWidth
		})
		
		this.setTranslateX(this.dateList, -this.date.activeIndex * this.date.width)
	}

	dateItemClick (dateItem) {
		this.setState({
			activeDay: dateItem.day,
			activeMonth: dateItem.month,
			activeYear: dateItem.year
		})
	}

	// 获取class
	getClassName (dateListItem) {
		if (dateListItem.type === 1) {
			return 'other'
		} else {
			const {activeDay, activeMonth, activeYear} = this.state
			const {year, month, day} = dateListItem
			if (year === activeYear && month === activeMonth && day === activeDay) {
				return 'active'
			} else {
				return ''
			}
		}
	}

	// 获得前一个月的年月
	getPreDate (year, month, diff = 1) {
		if (month - diff >= 1) {
			return {year, month: month - diff}
		} else {
			return {year: year - (Math.floor(diff / 12) + 1), month: 12 + month - diff}
		}
	}

	// 获取下个月的年月
	getNextDate (year, month, diff = 1) {
		if (month + diff < 13) {
			return {year, month: month + diff}
		} else {
			return {year: year + (Math.floor(diff / 12) + 1), month: (month + diff) % 12}
		}
	}

	// 获取单个dateList
	// diff: month差值，diff > -12 && diff < 12，比如后两个月赋值 2， 前两个月赋值 -2
	getDateList (year, month, diff = 0) {
		// 处理实际要计算的year和month

		let [y, m] = [year, month]
		if (m + diff < 1) {
			m = 12 + m + diff
			y = y - 1
		} else if (m + diff > 12) {
			m = (m + diff) % 12
			y = y + 1
		} else {
			m += diff
		}
				
		const dateList = []
		const fullDay = new Date(y, m, 0).getDate() // 当月总天数
		const startWeek = new Date(`${y}-${m}-1`).getDay()

		let prefullDay = new Date(y, m - 1, 0).getDate() // 前一个月总天数
		if (m - 1 < 1) {
			prefullDay = new Date(y - 1, 12, 0).getDate()
		}

		for (let i = 1; i <= startWeek; i++) {
			dateList.push({
				day: prefullDay - startWeek + i,
				type: 1 // type属性，是否是当月。0: 当月，1: 其他月
			})
		}
		
		for (let i = 1; i <= fullDay; i++) {
			dateList.push({
				day: i,
				year: y,
				month: m,
				type: 0
			})
		}
		let len = dateList.length
		for (let i = 1; i <= 42 - len; i++) {
			dateList.push({
				day: i,
				type: 1 
			})
		}

		return dateList
	}

	// 或者完整的 dateList: [preDateList, activeDateList, nextDateList]
	getAllDateList (year, month) {
		// debugger
		// const {selectYear: y, selectMonth: m} = this.state
		const [y, m] = [year, month]
		const allDateList = []

		allDateList.push(this.getDateList(y, m, -2)) // 前两个月
		allDateList.push(this.getDateList(y, m, -1)) // 前一个月
		allDateList.push(this.getDateList(y, m)) // activeDateList
		allDateList.push(this.getDateList(y, m, 1)) // 后一个月
		allDateList.push(this.getDateList(y, m, 2)) // 后两个月

		return allDateList
	}

	handleTouchStart (e) {
		const pageX = e.targetTouches[0].pageX
		// 记录位置
		this.touch = Object.assign({}, this.touch, {
			start: pageX,
			changeStart: pageX
		})
	}

	handleTouchMove (e) {
		const pageX = e.targetTouches[0].pageX
		const changeX = pageX - this.touch.changeStart // 位移量
		this.touch.changeStart = pageX // 重新记录起始位置
		this.setState({
			translateX: this.state.translateX + changeX,
			duration: 0
		})
		// 手动修改
		// this.dateList.style.transform = `translateX(${this.state.translateX + changeX}px)`
	}

	handleTouchEnd (e) {
		if (this.date.changing) {
			console.log(1)
			return
		}

		const endX = e.changedTouches[0].pageX
		const totalChangeX = endX - this.touch.start 
		const direction = this.slideDirection(totalChangeX) // 获取silde方向
		this.autoSlide(direction) // 移动
	}

	/**
	 * 判断位移方向 -1:向左, 0:不动, 1:向右
	 */
	slideDirection (changeX) {
		const width = this.date.width
		const z = 0.1 // 位移量百分比，指定位移了多少百分比后改变

		if (Math.abs(changeX / width) > z) { // 需要位移
			if (changeX < 0) { // 向右
				return 1
			} else if (changeX > 0) { // 向左
				return -1
			}
		}

		return 0 
	}

	/**
	 * 自动滑动
	 */
	autoSlide (direction) {
		const width = this.date.width
		let activeIndex = this.date.activeIndex
		const dateList = this.dateList
		let {selectYear, selectMonth} = this.date
		const from = -width * activeIndex
		let to

		// debugger
		if (direction < 0) {
			// 左
			activeIndex--
			const {year, month} = this.getPreDate(selectYear, selectMonth)
			this.date.selectYear = year
			this.date.selectMonth = month
		} else if (direction > 0) {
			// 右
			activeIndex++
			const {year, month} = this.getNextDate(selectYear, selectMonth)
			this.date.selectYear = year
			this.date.selectMonth = month
		} else {
			return
		}
		
		this.date.activeIndex = activeIndex
		to = -activeIndex * width
		this.slideTo(dateList, from, to, this.beginSlider, this.completeSlider.bind(this, direction))


		// switch (direction) {
		// 	case 1: 
		// 		// 右
		// 		this.rightSlide()
		// 		break
		// 	case -1: 
		// 		// 左
				
		// 		break
		// 	default:
		// 		// 滚动回原来的位置
		// 		console.log(1)
		// 		this.setState({
		// 			translateX: -this.date.activeIndex * width
		// 		})
		// 		this.slideAnimate(from, - activeIndex * width)
		// 		break
		// }
	}

	// 滑动到某个位置
	slideTo (el, from, to, begin, complete, time = 500) {
		Velocity(el, { translateX: [to, from] }, {
				duration: time,
				begin: begin,
				complete: complete
			}
		)
	}

	// 直接改变translateX, 没有滑动动画
	setTranslateX (el, translateX) {
		el.style.transform = `translateX(${translateX}px)`
	}

	beginSlider () {
		this.date.changing = true
	}

	completeSlider (direction) {
		const activeIndex = this.date.activeIndex

		if (direction < 0) {
			// 左
			if (activeIndex === 1) {
				const {year, month} = this.getPreDate(this.date.selectYear, this.date.selectMonth, 2)
				this.preAdd(year, month)
			}		
		} else if (direction > 0) {
			// 右
			if (this.state.dateList.length - activeIndex - 1 <= 1) {
				const {year, month} = this.getNextDate(this.date.selectYear, this.date.selectMonth, 2)
				this.nextAdd(year, month)
			}	
		}

		// 修改日期
		const nowYear = new Date().getFullYear()
		const {selectYear, selectMonth} = this.date
		 
		if (nowYear === selectYear) {
			this.props.setHeaderText(`${selectMonth}月`)
		} else {
			this.props.setHeaderText(`${selectMonth}月 ${selectYear}年`)
		}

		this.date.changing = false
	}

	preAdd (year, month) {
		const dateList = this.state.dateList
		const width = this.date.width
		const activeIndex = ++this.date.activeIndex

		dateList.unshift(this.getDateList(year, month))
		dateList.pop() // 删除最后一个，否则变项目变多滑动会卡
		this.setState({
			dateList: dateList
		}, () => {
			this.setTranslateX(this.dateList, -activeIndex * width)
		})
	}

	nextAdd (year, month) {
		const dateList = this.state.dateList
		const width = this.date.width
		const activeIndex = --this.date.activeIndex
		// debugger
		dateList.push(this.getDateList(year, month))
		dateList.shift()

		this.setState({
			dateList: dateList
		}, () => {
			this.setTranslateX(this.dateList, -activeIndex * width)
		})
	}

	render () {
		let style = {
			transform: `translateX(${this.state.translateX}px)`
		}
		// console.log(y, m)
		return (
			<div >
				<div styleName="week">
					<span>日</span>
					<span>一</span>
					<span>二</span>
					<span>三</span>
					<span>四</span>
					<span>五</span>
					<span>六</span>
				</div >
				<div styleName="date-wrapper">
					<div className="month">
						<div ref={dateList => this.dateList = dateList} 
							styleName="date-list" 
							onTouchStart={this.handleTouchStart}  
							onTouchMove={this.handleTouchMove}
							onTouchEnd={this.handleTouchEnd}  
							>
							{
								this.state.dateList.map((dateList, index) => (
									<div styleName="date" key={index}>
									{ 
										dateList.map((item, index) => <span onClick={this.dateItemClick.bind(this, item)} styleName={this.getClassName(item)} key={index}>{item.day}</span>)
									}
									</div>
								))
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapDispatchToProps (dispatch) {
	return {
		setHeaderText: (text) => {
			dispatch(setHeader({text})) // 修改头部标题
		}
	}
}

export default connect(null, mapDispatchToProps)(cssModules(Calendar, styles))