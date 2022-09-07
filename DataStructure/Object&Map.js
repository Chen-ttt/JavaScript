/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-07 22:48:41
 * @LastEditTime: 2022-09-07 23:33:32
 * @LastEditors:  
 */
/**
 * object 和 map 的区别
 */

// 1. Map的键值可以是任意类型, 而对象不是, 对象的键值只能是string或者symbol
// 就算定义对象时, key不写引号, 也会隐式地转换成string(如果不能转, 会报错)
let map = new Map()
map.set(1, [1, 2, 3])
map.set('someKey', [4, 5, 6])

let arr = ['a', 1]
let fn = () => { console.log(111) }
map.set(arr, 'value')
map.set(fn, 'fnValue')

console.log(map)
console.log(map.get(arr))
console.log(map.get(fn))

let obj = {
  name: 'tong',
  fn: 111 // fn不会使用函数, 而是被转换成'fn'
}

console.log(Object.keys(obj))

// 2. 遍历方式
// Map是可迭代的, 可以用for, forEach, for...of遍历
// 对象不可迭代, 只能用for...in遍历keys
map.forEach((value, key) => {
  console.log("遍历map", key, value)
})

// 3. 获取键值对 及其数量
console.log(Object.keys(obj))
console.log(Object.values(obj))
console.log(Object.entries(obj))
console.log(Object.keys(obj).length)

console.log(map.keys())
console.log(map.values())
console.log(map.entries())
console.log(map.size)

// 4. map的键值对是根据push的顺序排列的
// 而对象的键值对的顺序是会被重新排列的, 和什么时候添加的键值对没有任何关系
let newMap = new Map([
  [1, 4],
  [3, 5],
  [2, 9]
])
console.log("是否有序", newMap)

let newObj = {
  'c': 999,
  'a': 99,
  1: 1,
  5: 5,
  2: 2,
  '4': 4,
  '3': 3
}

newObj['0'] = 0
console.log("是否有序", newObj) // 规律是: 先按顺序排列数字开头的键值, 再按顺序排列字符开头的键值

// 5. 原型
// map的原型链 map -> Map -> Object
// obj的原型链 obj -> Object
// Object.create(null) 可以创建一个没有原型的对象
console.log(map)
console.log(obj)
console.log(map instanceof Map)
console.log(map instanceof Object)
console.log(obj instanceof Object)

let empty = Object.create(null)

console.log(empty)

