/* 质朴长存法  by lifesinger */
let getPadFill = function (num, n, mode = 'left', letter = '0') {
  var len = num.toString().length
  switch (mode) {
    default: while (len < n) {
      num = letter + num
      len++
    }
  }
  return num
}

export default {
  getPadFill: getPadFill
}
