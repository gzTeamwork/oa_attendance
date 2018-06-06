// 获取对象元素个数,浅统计
let objectLength = function (obj) {
  let n = 0
  for (o in obj) {
    console.log(o)
    if (typeof obj[o] === 'object') {
      n++
    }
  }
  return n
}
//  对象转数组,浅复制
let objectToArray = function (ob) {
  let arr = []
  console.log(ob)

  ob.keys(obj).forEach(v => {
    let o = {}
    o[v] = obj[v]
    arr.push(o)
  })
  return arr
}

export default {
  getObjLen: objectLength,
  getObjToArr: objectToArray
}
