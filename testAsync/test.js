/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-07-27 13:56:15
 * @LastEditTime: 2022-07-27 15:06:04
 * @LastEditors:  
 */
/*
 * 例子1. 当await的表达式结果是原始数据或有状态的promise对象时
 * 主要看'async1 end'和'promise2'谁先输出
 */

/**
 * 1. async函数中, 第一个await之前全是同步, 因此async函数正常执行直到遇到第一个await
 * 2. 遇到第一个await后, 执行await之后的表达式(可能是表达式或某个异步函数)
 * 3. 执行完后, 阻塞代码, 将await及之后的代码块挂起
 * 4. 此时根据await后的表达式结果, 将发生两种情况
 *    a. await之后的表达式可能返回一个直接的数据(2或者"out"等), 或是一个有状态的promise对象(其中有状态就代表着有值)
 *       因此, 该数据/该promise对象的值将作为await的表达式结果, 那么await代码块不再被挂起, 根据结果注册相应的回调函数并进入微任务队列
 *    b. await之后的表达式返回一个无状态的(pending)的promise对象
 *       因此, 该promise没有返回结果, await代码块将一直被挂起; 直到某一时刻promise状态改变, 则变为情况a(例子在test2.js)
 * 5. 跳出async函数, 执行同等级的同步函数, 之后再执行任务队列中的微任务
 */

async function async1 () {
  console.log('async1 start')
  await async2()
  // await 3
  // 1. 调用async2(); 默认返回一个值undefined, 状态为fulfilled的promise对象
  // 2. 之后代码阻塞; 被挂起; 由于promise对象有状态, 因此进入微任务队列
  // 3. 跳出async1后执行同等级的同步代码; 
  // 5. 第二个微任务回到这里, 执行之后代码
  console.log('async1 end')
}
async function async2 () {
  console.log('async2')
  // 这里也可以手动返回有状态的promise对象
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
}, 0)
new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2') // 4. 同步代码执行完毕, 第一个微任务输出promise2
})

async1()
console.log('script end')

