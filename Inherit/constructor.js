/*
 * @Description:
 * @Author: Tong Chen
 * @Date: 2022-09-16 01:55:04
 * @LastEditTime: 2022-09-16 01:57:16
 * @LastEditors:  
 */
// 构造函数继承
function S () { // 父类
  this.a = 1
  this.lens = [1, 2, 3]
}
let obj = new S()

console.log(obj)
console.log(obj.__proto__)

function Son () { // 子类
  this.aa = 2
  S.call(this) // 构造函数继承的本质 -- 利用父类的构造函数，将父类的属性写入子类的this
}

Son.prototype = obj
let son = new Son()

console.log(Son.prototype)
console.log(son)

// 解决了引用值共享的问题，子类修改不影响父类
son.lens.push(77)
console.log(obj.lens)
console.log(son.lens)