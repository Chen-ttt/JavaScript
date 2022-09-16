/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-16 02:08:44
 * @LastEditTime: 2022-09-16 02:09:18
 * @LastEditors:  
 */
// 组合继承
function S () { // 父类
  this.a = 1
  this.lens = [1, 2, 3]
}

S.prototype.addOne = function () {
  this.lens.push(11)
}
let obj = new S()

console.log(obj)
console.log(obj.__proto__)

function Son () { // 子类
  this.aa = 2
  S.call(this) // 构造函数继承
}
Son.prototype = obj // 原型链继承
let son = new Son()

console.log(Son.prototype)
console.log(son)

son.lens.push(77)
console.log(obj.lens)
console.log(son.lens)

son.addOne()
console.log("after addOne", son.lens)