/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-07-31 16:01:37
 * @LastEditTime: 2022-07-31 23:32:24
 * @LastEditors:  
 */
/**
 * 通过JSON暴力转换
 * 问题: 无法拷贝方法 如eat sing
 */

const obj = {
  name: 'Tong',
  age: 18,
  hobby: {
    1: 'eat',
    2: null
  },
  eat: () => { return 2 },
  sing: function () { return 2 },
  score: [99, 100, 59]
}

const newObj = deepClone(obj)

console.log(obj)
console.log(newObj)

function deepClone (initObj) {
  return JSON.parse(JSON.stringify(initObj))
}