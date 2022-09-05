/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-05 23:45:35
 * @LastEditTime: 2022-09-05 23:50:32
 * @LastEditors:  
 */
/**
 * 如何判断array
 */

let arr = [1, 2, 3]
// 1. instanceof
console.log(arr instanceof Array)

// 2. isArray
console.log(Array.isArray(arr))

// 3. constructor指向构造该变量的构造函数
console.log(arr.constructor === Array)

console.log({ name: 't' }.constructor === Object)
console.log("strrrrr".constructor === String)
console.log(true.constructor === Boolean)
console.log((() => { }).constructor === Function)

// 4. tostring
console.log(Object.prototype.toString.call(arr))

// 5. 判断原型
console.log(arr.__proto__ === Array.prototype)