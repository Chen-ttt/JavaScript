/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-08-28 20:58:16
 * @LastEditTime: 2022-08-28 23:18:37
 * @LastEditors:  
 */
/**
 * Iterator
 * 
 * 可迭代对象 = 可以用for...of (对象不能用)
 * 
 * for
 * for...in (但对象能用这个)
 * forEach - 不能中断, 跳出循环
 */

let obj = {
  "a1": "pp",
  "n": "kk",
  "a2": "ll"
}

// 对象不是可迭代的, 不能用for...of, 会报错
for (let i in obj) {
  console.log(i)
}

// 遵循迭代协议的对象, 都是迭代器(它不是一种内置对象)
// 对于可迭代对象, 其Symbol.iterator是一个无参函数, 返回一个迭代器
// 迭代器调用next返回一个对象, {value, done}
const arr = [0, 1, 2]
const iter = arr[Symbol.iterator]()

iter.next()		// Output: {value: 0, done: false}
iter.next()		// Output: {value: 1, done: false}
iter.next()		// Output: {value: 2, done: false}
iter.next()		// Output: {value: undefined, done: true}


// 具有Iterator接口的数据结构 就一定能用for...of, 但for...in不一定
// Array Map Set String TypedArray arguments对象 NodeList对象

// 对于map, 可以用for...of遍历 map.keys() values() entries()
// forEach((value, key) => {})
let map = new Map()
map.set("oo", 0)
map.set("o1", 0)
map.set("o2", 0)
for (let pair of map.keys()) {
  console.log(pair)
}

let str = "lsw"
for (let i in str) {
  console.log(i)
}