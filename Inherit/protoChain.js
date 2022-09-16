/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-16 01:29:36
 * @LastEditTime: 2022-09-16 01:54:33
 * @LastEditors:  
 */

// 原型链继承
function S () { // 父类
  this.a = 1
  this.lens = [1, 2, 3]
}
let obj = new S()

console.log(obj)
console.log(obj.__proto__)

function Son () { // 子类
  this.aa = 2
}

Son.prototype = obj
let son = new Son()

console.log(Son.prototype)
console.log(son)

// 会引发引用值共享的问题，子类可以修改父类
son.lens.push(77)
console.log(obj.lens)
console.log(son.lens)