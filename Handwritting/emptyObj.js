/*
 * @Description:
 * @Author: Tong Chen
 * @Date: 2022-09-07 21:55:11
 * @LastEditTime: 2022-09-07 22:01:15
 * @LastEditors:  
 */
/**
 * 如何判断空对象
 */

let obj = {}

// 1. for...in
function isEmpty (obj) {
  for (const key in obj) {
    return true
  }

  return false // 没有遍历到key, 空对象, 返回false
}

console.log(isEmpty(obj))

// 2. Object.keys(obj)
function isEmpty2 (obj) {
  if (Object.keys(obj).length == 0) return false // 对象的keys长度为0, 无属性, 为空
  else return true
}

console.log(isEmpty2(obj))

// 3. JSON.stringfy(obj)
function isEmpty3 (obj) {
  if (JSON.stringify(obj) == '{}') return false
  else return true
}

console.log(isEmpty3(obj))

