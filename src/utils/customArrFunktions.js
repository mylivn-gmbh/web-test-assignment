

Array.prototype.customMap = function (callback) {


  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
}


Array.prototype.customReduce = function (callback, initialValue) {

  for (let i = 0; i < this.length; i++) {
    initialValue = callback(initialValue, this[i], i, this)
  }
  return initialValue
}

Array.prototype.customFilter = function (callback) {

  let result
  for (let i = 0; i < this.length; i++) {
    let found = callback(this[i], i, this)
    if (found) {
      result = this[i]
      break
    }
  }
  return result
}










