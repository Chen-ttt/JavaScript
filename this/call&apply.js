/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-08-28 23:54:40
 * @LastEditTime: 2022-08-29 00:43:37
 * @LastEditors:  
 */

/**
 * 手写call
 *  1. 因为是原函数.call的方式调用, 因此call的函数内this就表示原函数
 *  2. 为了能用原函数.call的方式调用, 需要吧call方法写在Function.prototype里
 *  2. ...args可接收参数列表
 *  3. 记得return
 *  4. 当新的this传入的是null或者undefined时, 自动替换为window
 *  5. 细节: 给newThis添加完func方法, 调用完, 可以删掉
 */

function test (a, b) {
  console.log("enter test: ", this.name, this)
  return a + b
}

Function.prototype.call = function (newThis, ...args) {
  newThis = newThis || window
  newThis.func = this
  let result = newThis.func(...args)
  delete newThis.func
  return result
}

let person = { name: 'Tong' }

let result = test.call(person, 7, 77)
console.log("result after call", result)

let result1 = test.call(null, 7, 77)
console.log("result1 after call", result1)

console.log("person", person)

Function.prototype.apply = function (newThis, args) {
  newThis = newThis || window
  newThis.func = this
  let result = newThis.func(...args)
  delete newThis.func
  return result
}