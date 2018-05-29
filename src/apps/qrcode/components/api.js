let Units = [{
  thumb: require('./../assets/imgs/unit_1.png'),
  title: '1404',
  unit_id: 1404
}, {
  thumb: require('./../assets/imgs/unit_2.png'),
  title: '6301',
  unit_id: 6301
}, {
  thumb: require('./../assets/imgs/unit_2.png'),
  title: '6302',
  unit_id: 6302
}, {
  thumb: require('./../assets/imgs/unit_2.png'),
  title: '6303',
  unit_id: 6303
}, {
  thumb: require('./../assets/imgs/unit_2.png'),
  title: '6304',
  unit_id: 6304
}]
const Api = {
  getUnits: function () {
    return Units
  }
}

export default Api
