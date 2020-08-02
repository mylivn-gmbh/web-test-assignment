
Array.prototype.myMap = function (callback) {
    let newArray = [];
    let x = this.length;
    for (let i = 0; i < x; i++) {
        let counter = callback(this[i]);
        newArray.push(counter);
    }
    return newArray;
};
Array.prototype.myReduce = function (fn, initial) {
    let _array = this;
    let total = initial || 0;
    for (let i = 0; i < _array.length; i++) {
        total = fn(total, _array[i]);
    }
    return total;
}
//console.log([1,2,3].myFunction(function(total,x){return total +x},10));

Array.prototype.myFilter = function (condition, thisArg) {
    let j = 0;

    this.forEach((el, index) => {
        if (condition.call(thisArg, el, index, this)) {
            if (index !== j) {
                this[j] = el;
            }
            j++;
        }
    })

    this.length = j;
    return this;
}
//arr.filterInPlace(x => x > 2);