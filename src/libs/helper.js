//  解释url
let getUrlJson = function (url) {
  url = url == null ? window.location.href : url
  var search = url.substring(url.lastIndexOf('?') + 1)
  var obj = {}
  var reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, function (rs, $1, $2) {
    var name = decodeURIComponent($1)
    var val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}
//  获取对象元素个数,浅统计
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
/* 质朴长存法  by lifesinger */
let getPad = function (num, n) {
  var len = num.toString().length;
  while (len < n) {
    num = "0" + num;
    len++;
  }
  return num;
}

const helper = {
  getUrlJson: getUrlJson,
  getO2A: objectToArray,
  getObjLen: objectLength,
  getPad: getPad
}

export default helper
