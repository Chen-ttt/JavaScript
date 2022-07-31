/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-07-31 12:48:15
 * @LastEditTime: 2022-07-31 14:22:25
 * @LastEditors:  
 */
/**
 * Iterator 迭代器
 * ES6 为各种不同的数据结构提供统一的接口访问机制
 * 
 * 任意类型的数据, 只要部署了Iterator接口, 可以遍历
 * 使用迭代器对象的next方法, 依次返回集合的下一项元素的值
 * 
 * 注意. Iterator接口主要供for...of消费, 当使用for...of遍历时, 循环会自动寻找Iterator接口
 * 只要有Iterator接口, 就可以使用for...of
 * 
 * 其他遍历方式的缺点:
 *   1. for: 条件部分冗杂, 多层嵌套需要定义多个变量, 复杂度高
 *   2. for...in: 只能获取对象键名, 之后再通过属性访问器的方括号的形式拿到值; 并且只适用于对象, 其他类型不行
 *   3. forEach: 不能中断跳出循环
 */

/**
 * 原生具有Iterator接口的数据结构如下:
 *   Array / Map / Set / String / TypedArray / 函数的arguments对象 / NodeList
 * 它们都有Symbol.iterator属性, 并通过该方法创建迭代器
 */

let arr = [1, 2, 3]
let iter = arr[Symbol.iterator]()

console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())

// 手写Iterator - 利用闭包
// 生成迭代器的函数将返回一个闭包, 该闭包是一个带有next方法的对象
// 调用next函数将返回一个包含两个属性(value/done)的对象, value表示读取的元素值, done表示迭代是否完成

function createIterator (array) {
  let count = 0
  return {
    next: function () {
      return count < array.length ?
        { value: array[count++], done: false } :
        { value: undefined, done: true }
    }
  }
}

let iterator = createIterator(arr)
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())