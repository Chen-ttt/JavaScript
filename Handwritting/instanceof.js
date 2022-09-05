/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-05 02:20:28
 * @LastEditTime: 2022-09-05 23:52:50
 * @LastEditors:  
 */

// 实现instanceof

function myInstanceOf (v1, v2) {
  let rightProto = v2.prototype
  let leftProto = v1.__proto__

  while (leftProto !== null) {
    if (leftProto === rightProto) {
      return true
    }

    leftProto = leftProto.__proto__
  }

  return false
}

let obj = {
  name: 'tong'
}

console.log(myInstanceOf(obj, Object))