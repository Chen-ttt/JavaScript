/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-02 00:46:46
 * @LastEditTime: 2022-09-02 19:32:49
 * @LastEditors:  
 */
/**
 * 使用Promise实现每隔1秒输出1,2,3 - 串行
 */

function answer (arr) {
  arr.reduce((prevPromise, cur) => {
    return prevPromise.then(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
          console.log(cur)
        }, 1000)
      })
    })
  }, Promise.resolve())
}

answer([1, 2, 3])

// function answer (arr) {
//   arr.reduce((prevPromise, cur) => {
//     // r取到的是pending状态的promise, 只有第一个promise.then会进入微任务队列, 因为初始值是有状态的, 之后的then都被挂起, 要等到前面的then返回状态才执行
//     const r = prevPromise.then(() => {
//       const p = new Promise(resolve => {
//         console.log("enter new Promise")
//         // 第一个定时器会挂起, 之后的2 3的then因为pending会被阻塞, 直到这个定时器内部执行了resolve, 返回的新promise才有状态, 才会进入2的then函数
//         setTimeout(() => {
//           resolve()
//           console.log(cur)
//         }, 1000)
//       })

//       console.log("p", p)
//       return p
//     })

//     console.log("r", r)
//     return r
//   }, Promise.resolve())
// }