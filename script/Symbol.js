/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-08-28 19:07:03
 * @LastEditTime: 2022-08-28 19:17:15
 * @LastEditors:  
 */
/**
 * Symbol - 用于生成全局唯一的值, 可用做对象唯一的属性名, 防止覆盖属性
 */

// 同一个key创建出来的symbol也不一样
let id = Symbol("id")
let id2 = Symbol("id")
console.log(id === id2)

// 用作属性
let obj = {
  [id]: "test"
}

// for...in和obj.keys都读不到symbol值的属性
for (let i in obj) {
  console.log("key: ", i)
}

// 但可以通过Object.getOwnPropertySymbols访问
// 返回数组, 包含该对象里所有的symbol类型的key
let arr = Object.getOwnPropertySymbols(obj)
console.log(arr)
console.log(obj[arr[0]])

// 如果希望多次使用同一个symbol值
// 用Symbol.for()来注册
let id3 = Symbol.for("id") // 检测到未创建 - 新建
let id4 = Symbol.for("id") // 检测到已创建 - 返回
console.log(id3 === id4)

// 用这种方式创建的symbol值, 可以通过Symbol.keyFor 来找注册时用的key
console.log(Symbol.keyFor(id3))