/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-07-31 23:42:54
 * @LastEditTime: 2022-07-31 23:57:05
 * @LastEditors:  
 */
/**
 * 1. 判断变量是否是null - 不能直接typeof, 因为typeof(null)返回object
 */

// 1a 直接比较
var a = {}
console.log(a === null)

// 1b
// !a筛选转为boolean后是false的数据类型 - 0, null, undefined, Nan, "", false
// 再限定在其中typeof为object的数据 - null
console.log(!a && typeof (a) === 'object')
