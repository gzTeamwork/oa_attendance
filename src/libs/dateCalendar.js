//  日历类
const dateCalendar = { events: [] }
//  日历初始化
dateCalendar.init = function (onDutyUsers, restDays) {
  //  输入数据处理
  restDays = restDays || []
  onDutyUsers = onDutyUsers || [
    { userid: 'hulingfei', username: '胡玲飞' },
    { userid: 'huqiongzhi', username: '胡琼枝' },
    { userid: 'zhongchunyuan', username: '钟春苑' },
    { userid: 'yangliu', username: '杨柳' },
    { userid: 'pengxiaoqin', username: '彭小琴' },
    { userid: 'jiangxiuyun', username: '江秀云' },
    { userid: 'linhuaqing', username: '林华清' },
    { userid: 'guozihao', username: '郭梓豪' },
    { userid: 'hejinwen', username: '何锦文' }
  ]

  let dateToday = new Date()
  // 今天
  let today = dateToday.Format('yyyy/MM/dd')
  this.today = today
  dateToday.setMonth(dateToday.getMonth() + 1)
  dateToday.setDate(0)
  let toMouth = dateToday.getDate() //  获取当月最大日期

  //  生成当月排班数据
  for (let i = 1; i < toMouth + 1; i++) {
    dateToday.setDate(i)
    let event = {
      date: dateToday.Format('yyyy/MM/dd'),
      title: '排班',
      onDuty: onDutyUsers,
      onRest: []
    }
    let dateDay = dateToday.getDay()
    if (
      dateDay > 0 &&
      dateToday.toLocaleDateString() !== event.date &&
      restDays.indexOf(dateToday.toLocaleDateString()) < 0
    ) {
      this.events.push(event)
    }
  }
}

export default dateCalendar
