const timePicker = {
  date: () => {
    return new Date()
  },
  getToday: function () {
    return this.date.toLocaleString()
  },
  tomorrow: function () {
    let tomorrow = this.date.setDate
    return this.date
  }

}

export default timePicker
