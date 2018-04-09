//  日历类
const dateCalendar = { events: [] }
//  日历初始化
dateCalendar.init = function () {
  let dateToday = new Date()
  // 今天
  let today =
    dateToday.getFullYear() +
    '/' +
    (dateToday.getMonth() + 1) +
    '/' +
    dateToday.getDate()
  this.today = today
  dateToday.setMonth(dateToday.getMonth() + 1)
  dateToday.setDate(0)
  let toMouth = dateToday.getDate() //  获取当月最大日期
  for (let i = 1; i < toMouth + 1; i++) {
    dateToday.setDate(i)
    let event = {
      date:
        dateToday.getFullYear() +
        '/' +
        (dateToday.getMonth() + 1) +
        '/' +
        dateToday.getDate(),
      title: '排班',
      onDuty: [
        '胡玲飞',
        '胡琼枝',
        '钟春苑',
        '杨柳',
        '彭小琴',
        '黄楚欣',
        '江秀云',
        '林华清',
        '郭梓豪',
        '何锦文',
        'zhangshan'
      ],
      onRest: []
    }
    let dateDay = dateToday.getDay()
    if (
      dateDay > 0 &&
      dateDay < 6 &&
      dateToday.toLocaleDateString !== event.date
    ) {
      this.events.push(event)
    }
  }
}

const one_event = { date: '', onDuty: '', onRest: '' }

export default dateCalendar
