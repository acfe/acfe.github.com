/**
 * Created by 001264 on 2017/6/26.
 */

const FcDatePicker = {
  name: 'FcDatePicker',
  data () {
    return {
      itemShow: false,
      tdArr: [],
      yearArr: [],
      monthArr: [],
      showContent: 'date',
      inputKey: Math.random()
    }
  },
  props: ['param', 'callback'],
  created () {
    window.FcDatePickers = window.FcDatePickers || {}
    if (this.param.tag) {
      window.FcDatePickers[this.param.tag] = this
    }
    this.dataInit()
  },
  methods: {
    dataInit () {
      const param = this.param
      let date
      if (param.year && param.month) {
        param.date = param.date || 1
        date = new Date(parseInt(param.year), parseInt(param.month, 10) - 1, parseInt(param.date, 10))
      } else {
        date = new Date()
      }
      Object.assign(param, {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate()
      })
      if (!param.value) {
        // param.value = this.formatValue(date);
      }
      this.date = date
      let startWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
      startWeek = startWeek - 1
      startWeek = startWeek < 0 ? 6 : startWeek
      this.showAdded = param.showAdded
      this.showAdded = this.showAdded === undefined ? true : this.showAdded
      this.showArr = []
      if (startWeek > 0) {
        if (this.showAdded) {
          this.getPreAdded(startWeek, date)
        } else {
          for (var i = 0; i < startWeek; i++) {
            this.showArr.push({})
          }
        }
      }
      const monthDayNum = new Date(date.getFullYear(), (date.getMonth() + 1), 0).getDate()
      for (let i = 0; i < monthDayNum; i++) {
        const d = new Date(date.getFullYear(), date.getMonth(), i + 1)
        this.showArr.push({
          inMonth: true,
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          date: i + 1,
          disabled: this.checkDisabled(d),
          value: this.formatValue(d)
        })
      }
      const dayAddedNum = 42 - monthDayNum - startWeek
      if (dayAddedNum > 0) {
        if (this.showAdded) {
          this.getNextAdded(dayAddedNum, date)
        } else {
          for (let i = 0; i < dayAddedNum; i++) {
            this.showArr.push({})
          }
        }
      }
      const tdArr = []
      let key = 0
      let num = 0
      for (let i in this.showArr) {
        if (num && num % 7 === 0) {
          key++
        }
        tdArr[key] = tdArr[key] || []
        tdArr[key] && tdArr[key].push(this.showArr[i])
        num++
      }
      this.tdArr = tdArr
    },
    getPreAdded (startWeek, date) {
      const preDate = new Date(date.setMonth(date.getMonth() - 1))
      date.setMonth(date.getMonth() + 1)
      const preMonthDay = new Date(preDate.getFullYear(), preDate.getMonth(), 0).getDate()
      for (var i = preMonthDay - startWeek + 1; i <= preMonthDay; i++) {
        const d = new Date(preDate.getFullYear(), preDate.getMonth(), i)
        this.showArr.push({
          inMonth: false,
          year: preDate.getFullYear(),
          month: preDate.getMonth() + 1,
          date: i,
          disabled: this.checkDisabled(d),
          value: this.formatValue(d)
        })
      }
    },
    getNextAdded (dayAddedNum, date) {
      const nextDate = new Date(date.setMonth(date.getMonth() + 1))
      date.setMonth(date.getMonth() - 1)
      for (var i = 0; i < dayAddedNum; i++) {
        const d = new Date(nextDate.getFullYear(), nextDate.getMonth(), i + 1)
        this.showArr.push({
          inMonth: false,
          year: nextDate.getFullYear(),
          month: nextDate.getMonth() + 1,
          date: i + 1,
          disabled: this.checkDisabled(d),
          value: this.formatValue(d)
        })
      }
    },
    checkDisabled (date) {
      const param = this.param
      let disabled = false
      const num = parseInt('' + date.getFullYear() + this.formatNum(date.getMonth() + 1) + this.formatNum(date.getDate()))
      if (param.limitStart) {
        const arr = param.limitStart.split('-')
        const sYear = parseInt(arr[0], 10)
        const sMonth = parseInt(arr[1], 10)
        const sDate = parseInt(arr[2], 10)
        const sNum = parseInt('' + sYear + this.formatNum(sMonth) + this.formatNum(sDate))
        if (num < sNum) {
          disabled = true
        }
      }
      if (param.limitEnd) {
        const arr = param.limitEnd.split('-')
        const eYear = parseInt(arr[0], 10)
        const eMonth = parseInt(arr[1], 10)
        const eDate = parseInt(arr[2], 10)
        const sNum = parseInt('' + eYear + this.formatNum(eMonth) + this.formatNum(eDate))
        if (num > sNum) {
          disabled = true
        }
      }
      if (param.limitArr && param.limitArr.length) {
        for (var i in param.limitArr) {
          const limit = param.limitArr[i]
          const arr = limit.split('-')
          const lYear = parseInt(arr[0], 10)
          const lMonth = parseInt(arr[1], 10)
          const lDate = parseInt(arr[2], 10)
          const sYear = date.getFullYear()
          const sMonth = date.getMonth() + 1
          const sDate = date.getDate()
          if (lYear === sYear && lMonth === sMonth && lDate === sDate) {
            disabled = true
          }
        }
      }
      return disabled
    },
    formatNum (num) {
      return parseInt(num) < 10 ? '0' + num : num
    },
    formatValue (date) {
      const param = this.param
      let format = param.format
      if (!format) {
        return date.getFullYear() + '-' + this.formatNum(date.getMonth() + 1) + '-' + this.formatNum(date.getDate())
      }
      const fYear = date.getFullYear()
      const fMonth = this.formatNum(date.getMonth() + 1)
      const fDate = this.formatNum(date.getDate())
      const sMonth = date.getMonth() + 1
      const sDate = date.getDate()
      format = format.replace(/Y/g, fYear)
      format = format.replace(/M/g, fMonth)
      format = format.replace(/D/g, fDate)
      format = format.replace(/y/g, fYear)
      format = format.replace(/m/g, sMonth)
      format = format.replace(/d/g, sDate)
      return format
    },
    goPreMonth () {
      if (this.showContent === 'year') {
        return
      }
      const nData = new Date(this.date)
      const date = new Date(nData.getFullYear(), nData.getMonth(), 1)
      const preDate = new Date(date.setMonth(date.getMonth() - 1))
      date.setMonth(date.getMonth() + 1)
      const param = this.param
      const dateNum = new Date(preDate.getFullYear(), preDate.getMonth() + 1, 0).getDate()
      const num = parseInt('' + preDate.getFullYear() + this.formatNum(preDate.getMonth() + 1) + this.formatNum(dateNum))
      if (param.limitStart) {
        const arr = param.limitStart.split('-')
        const sYear = parseInt(arr[0], 10)
        const sMonth = parseInt(arr[1], 10)
        const sDate = parseInt(arr[2], 10)
        const sNum = parseInt('' + sYear + this.formatNum(sMonth) + this.formatNum(sDate))
        if (num < sNum) {
          return
        }
      }
      Object.assign(param, {
        year: preDate.getFullYear(),
        month: preDate.getMonth() + 1,
        date: 1
      })
      this.dataInit()
      if (this.showContent === 'month') {
        this.checkMonthArr()
      }
    },
    goNextMonth () {
      if (this.showContent === 'year') {
        return
      }
      const nData = new Date(this.date)
      const date = new Date(nData.getFullYear(), nData.getMonth(), 1)
      const nextDate = new Date(date.setMonth(date.getMonth() + 1))
      date.setMonth(date.getMonth() - 1)
      const param = this.param
      const num = parseInt('' + nextDate.getFullYear() + this.formatNum(nextDate.getMonth() + 1) + this.formatNum(1))
      if (param.limitEnd) {
        const arr = param.limitEnd.split('-')
        const eYear = parseInt(arr[0], 10)
        const eMonth = parseInt(arr[1], 10)
        const eDate = parseInt(arr[2], 10)
        const sNum = parseInt('' + eYear + this.formatNum(eMonth) + this.formatNum(eDate))
        if (num > sNum) {
          return
        }
      }
      Object.assign(param, {
        year: nextDate.getFullYear(),
        month: nextDate.getMonth() + 1,
        date: 1
      })
      this.dataInit()
      if (this.showContent === 'month') {
        this.checkMonthArr()
      }
    },
    select (e) {
      const key = e.target.getAttribute('data-key')
      const tdKey = e.target.getAttribute('data-tdKey')
      const date = e.target.getAttribute('data-date')
      const tdArr = this.tdArr
      if (!date || !tdArr[key] || !tdArr[key][tdKey]) {
        return
      }
      const param = this.param
      const selectDay = tdArr[key][tdKey]
      // console.log(selectDay);
      if (selectDay.disabled) {
        return
      }
      Object.assign(param, selectDay)
      param.option = selectDay.value
      if (this.callback) {
        this.callback(param)
      }
      if (!selectDay.inMonth) {
        this.dataInit()
      }
      if (this.param.selectHide) {
        this.hideItem()
      }
    },
    changeMonth (month) {
      this.param.month = month
      this.showContent = 'date'
      this.dataInit()
      this.resizeDate()
    },
    showMonthSelector () {
      this.showContent = this.showContent === 'month' ? 'date' : 'month'
      this.resizeDate()
      this.checkMonthArr()
    },
    checkMonthArr () {
      const year = this.param.year
      let monthArr = []
      const param = this.param
      let startYear
      let endYear
      let startMonth
      let endMonth
      if (param.limitStart) {
        const arr = param.limitStart.split('-')
        startYear = parseInt(arr[0], 10)
        startMonth = parseInt(arr[1], 10)
      }
      if (param.limitEnd) {
        const arr = param.limitEnd.split('-')
        endYear = parseInt(arr[0], 10)
        endMonth = parseInt(arr[1], 10)
      }
      if (startYear === endYear && year === startYear) {
        for (var i = startMonth; i <= endMonth; i++) {
          monthArr.push(i)
        }
      } else if (year === startYear) {
        for (let i = startMonth; i <= 12; i++) {
          monthArr.push(i)
        }
      } else if (year === endYear) {
        for (let i = 1; i <= endMonth; i++) {
          monthArr.push(i)
        }
      } else {
        for (let i = 1; i <= 12; i++) {
          monthArr.push(i)
        }
      }
      this.monthArr = monthArr
    },
    changeYear (year) {
      this.param.year = year
      this.showContent = 'date'
      this.dataInit()
      this.resizeDate()
    },
    resizeDate () {
      const itemList = this.$refs.itemList
      let width = itemList.clientWidth
      let itemWidth = width / 7
      const tds = itemList.querySelectorAll('td')
      if (tds.length < 10) {
        setTimeout(() => {
          this.resizeDate()
        })
        return false
      }
      for (var i = 0; i < tds.length; i++) {
        tds[i].style.height = (itemWidth - 2) + 'px'
      }
    },
    showDateContent () {
      this.showContent = 'date'
      this.resizeDate()
    },
    showYearSelector () {
      this.showContent = this.showContent === 'year' ? 'date' : 'year'
      this.resizeDate()
      const yearArr = []
      const param = this.param
      let year = param.year
      let minYear = year - 10
      let maxYear = year + 9
      let minMonth
      let maxMonth
      if (param.limitStart) {
        const arr = param.limitStart.split('-')
        minMonth = parseInt(arr[1], 10)
        if (arr[0] > minYear) {
          minYear = parseInt(arr[0], 10)
        }
      }
      if (param.limitEnd) {
        const arr = param.limitEnd.split('-')
        maxMonth = parseInt(arr[1], 10)
        if (arr[0] < maxYear) {
          maxYear = parseInt(arr[0], 10)
        }
      }
      for (var i = minYear; i <= maxYear; i++) {
        if (minYear === maxYear) {
          yearArr.push(i)
        } else if (minMonth && i === minYear) {
          if (param.month >= minMonth) {
            yearArr.push(i)
          }
        } else if (maxMonth && i === maxYear) {
          if (param.month <= maxMonth) {
            yearArr.push(i)
          }
        } else {
          yearArr.push(i)
        }
      }
      this.yearArr = yearArr
    },
    show () {
      if (window.FcDatePickers) {
        for (var i in window.FcDatePickers) {
          if (i !== this.param.tag) {
            window.FcDatePickers[i].hideItem()
          }
        }
      }
      this.itemShow = !this.itemShow
      if (!this.itemShow) {
        return
      }
      setTimeout(() => {
        const itemList = this.$refs.itemList
        const selectorContent = this.$refs.selectorContent
        let width = itemList.clientWidth
        let itemWidth = width / 7
        const tds = itemList.querySelectorAll('td')
        for (var i = 0; i < tds.length; i++) {
          tds[i].style.height = (itemWidth - 2) + 'px'
        }
        if (selectorContent && this.param.selectorPosition === 'top') {
          Object.assign(selectorContent.style, {
            bottom: '35px',
            top: 'auto'
          })
        }
      })
    },
    hideItem () {
      this.itemShow = false
    },
    empty () {
      const param = this.param
      param.value = ''
      param.option = ''
      this.inputKey = Math.random()
    }
  }
}

export default FcDatePicker
