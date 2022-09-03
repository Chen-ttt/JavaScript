/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-03 16:33:08
 * @LastEditTime: 2022-09-03 16:47:30
 * @LastEditors:  
 */
/**
 * 串行promise - 递归
 */

function answer (arr) {
  (function fn () {
    if (arr.length) { // 当arr中还有未完成的任务时才继续递归, 否则会取出undefined, 给undefined写then回调, 会报错
      arr.shift()().then(res => {
        setTimeout(() => fn(), 1000) // 串行, 隔一秒之后, 再递归下一个任务
      })
    }
  })() // 用立即执行, 第一次启动fn函数
}

const arr = [() => {
  return new Promise(resolve => {
    console.log("1")
    resolve()
  })
},
() => {
  return new Promise(resolve => {
    console.log("2")
    resolve()
  })
},
() => {
  return new Promise(resolve => {
    console.log("3")
    resolve()
  })
}]

answer(arr)