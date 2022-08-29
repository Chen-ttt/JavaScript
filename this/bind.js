/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-08-28 23:54:40
 * @LastEditTime: 2022-08-29 02:33:20
 * @LastEditors:  
 */

function test () {
  console.log("enter test: ", this.name, this)
  return Array.from(arguments).join("/")
}

let person = { name: 'Tong' }

let resultFunc = test.bind(person, 7, 77)
console.log("result after call", resultFunc()) // 返回 7/77

// 重要细节! bind返回之后的函数, 在调用时, 如果又传入了新的参数, 那么将增加参数的数量, 而不是替换参数
console.log("result1 after call", resultFunc(8, 9)) // 返回 7/77/8/9

// 重要细节! 如果用new关键字 构造绑定函数, 则新的this会被忽略
new resultFunc()

// 形成闭包 - 作用域里有this原函数, newThis 和 args列表(即person和72,772)
Function.prototype._bind = function (newThis, ...args) {
  // 注意! 这里的oldFunc很重要, 因为必须把this原函数保存在闭包里, 不让返回的function中this指向window, 或者用箭头函数可以解决
  let oldFunc = this
  newThis = newThis || window

  let fn = function (...newArgs) {
    if (this instanceof fn) { // 如果该函数隐式地创建了this, 且是fn的实例, 则证明当前是在用new关键字调用函数
      // 如果是new, 那么直接返回原函数构造的对象就可以
      return new oldFunc(...args, ...newArgs)
    }
    newThis.func = oldFunc
    let result = newThis.func(...args, ...newArgs)
    delete newThis.func
    return result
  }

  return fn
}
let resultFunc2 = test._bind(person, 72, 772)
console.log("result after call", resultFunc2()) // 返回 7/77

// 重要细节! bind返回之后的函数, 在调用时, 如果又传入了新的参数, 那么将增加参数的数量, 而不是替换参数
console.log("result1 after call", resultFunc2(82, 92)) // 返回 7/77/8/9

console.log(person)


function Car () {
  this.a = 0
  this.b = 9
}

let nCar = Car._bind({ age: 9 }, 90)

// 重要细节! 如果用new关键字 构造绑定函数, 则新的this会被忽略
console.log("Begin to new")
console.log("result for new", new nCar())