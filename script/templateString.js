/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-25 23:34:51
 * @LastEditTime: 2022-09-25 23:45:03
 * @LastEditors:  
 */
/**
 * 模版字符串 - ES6新特性
 * 可以插入表达式的字符串字面量，并且可以输出多行文本，直接输出回车换行符
 * 
 * `` 英文输入下输入 反单引号
 */

// 1. 插入表达式 - `${expression}`
// 会将表达式的返回值转为字符串, 并和其他部分拼接
let myInfo = {
  name: 'tong',
  age: 18
}

let str = `My name is ${myInfo.name}, and I'm ${myInfo.age} years old.`
console.log(str)

let addFn = (a, b) => (a + b)
console.log(`Result of addFn is ${addFn(1, 2)}`)

// 如果表达式最终是引用类型的值, 则调用toString方法
let arr = [1, 2, 3]
console.log(`Array is ${arr}`)
console.log(`Object is ${myInfo}`)


// 2. 可以有多行文本, 直接插入换行（这在传统字符串中是不允许的）
let several = `Hi...
I'm hungrey...
Wanna some food...`

console.log(several)