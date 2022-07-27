/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-07-27 00:41:38
 * @LastEditTime: 2022-07-27 15:27:57
 * @LastEditors:  
 */
/**
 * async/await & promise
 * 
 * async用于申明一个函数是异步函数, 返回的都是promise
 * await用于等待一个Promise对象/等待一个异步方法执行完成, 阻塞代码, 接收原始数据类型/对象/表达式, 但经过await之后都是数据/对象
 * 
 * 如果async函数中没有await, 那么执行起来和普通函数一样
 */

// 1. async函数的返回值
//  1a. 执行async函数, 返回的都是promise对象
async function test1 () {
  return 1
} // 若返回的不是promise对象, 则该数据被Promise.resolve()封装成promise对象

async function test2 (num) {
  const p2 = Promise.resolve(num)
  console.log("create test2.p2", p2)
  return p2 // 也可以直接返回promise对象, 三种状态都可以
  // try {
  //   const pp = new Promise((reject) => {
  //     console.log("enter new Promise")
  //     reject()
  //   }).then(() => {
  //     console.log("enter test2 then") // 这里最后执行, 在有返回值之前, then一直被挂起
  //   }).catch(() => {
  //     console.log("enter test2 catch")
  //   })
  // } catch (e) {
  //   console.log("catch catch")
  // }
}

console.log("test1", test1())
console.log("test2", test2(111))

//  1b. async函数内部return返回的值, 会成为then回调的参数
//              内部抛出的错误, 会成为catch回调的参数
//  但不管是then还是catch都要等到async函数内部的同步 异步代码执行完, 才能根据返回值确定哪个回调要放入任务队列, 才会有输出
test1().then((value) => {
  console.log("捕捉到test1的返回值:", value)
})
test2(222).then((e) => {
  console.log("捕捉到test2的返回值:", e) // ？？？
})


// 2. Promise.then 成功的情况对应 await
async function test3 () {
  console.log("enter test3")
  const p3 = Promise.resolve(3)
  console.log("create p3", p3)
  p3.then((data) => {
    console.log("p3.then:", typeof (data), data)
  })

  const data3 = await p3
  console.log("await p3:", typeof (data3), data3)
}

test3() // 拿到的数据是一样的

/**
 * await三种使用 - 主要用于等待一个Promise对象, 阻塞后面的代码, 但其它数据也可处理
 * await + promise对象 // 这个情况在上一个例子中
 * await + 数据
 * await + 异步函数
 * 
 * await的返回值:
 * 1. await后面 跟着的是数据, 则不做任何处理
 * 2. await后面 跟着的是promise对象, 则取promise对象中的值
 */

// await + 数据
async function test4 () {
  const data4 = await 4
  console.log("await 4:", typeof (data4), data4)
}

test4()

// await + 异步函数
async function test5 () {
  console.log("enter test5")
  const data5 = await test1()
  console.log("await 5:", typeof (data5), data5)

  console.log("enter test5-2")

  const data51 = await test2(333)
  console.log("await 5-1:", typeof (data51), data51)
}

test5()


// 3. Promise.catch 异常的情况 对应 try...catch
async function test6 () {
  console.log("enter test6")
  const p6 = Promise.reject(6) // 这是同步代码
  console.log("enter test6-2")

  try {
    const data6 = await p6
    console.log("await p6:", typeof (data6), data6)
  } catch (e) {
    console.log("await p6 error:", typeof (e), e)
  }
}

test6()

console.log("第一轮时间循环, 同步代码执行完毕")


// 4. 

// async function async1 () {
//   console.log('async1 start')//4、在执行过程中，这里是同步代码，所以直接执行【2】
//   await async2()//5、遇到await，执行await后面的代码，执行async2函数
//   console.log('async1 end')//6、await会返回一个promise，将await下面的代码直接放入微任务队列，暂不执行
// }
// async function async2 () {
//   console.log('async2')//6、这里是同步代码，所以直接执行【3】
// }
// console.log('script start')//1、这里是同步代码，首先直接执行【1】
// setTimeout(function () {//2、这里是异步宏任务，所以放入宏任务队列，暂不执行
//   console.log('setTimeout')
// }, 0)
// async1()//3、这个async函数，这里调用了，所以去执行async1函数
// new Promise(function (resolve) {
//   console.log('promise1')//7、这里是promise，promise里的resolve是同步代码，所以这里直接执行【4】
//   resolve()
// }).then(function () {
//   console.log('promise2')//9、then里的代码是要放入微任务队列的，暂不执行
// })
// console.log('script end')//10、这里是同步代码，直接执行【5】
// //11、当同步代码走完，现在需要把任务队列里的输出出来，首先清空微任务队列，秉持先进先出原则，输出的是async1 end【6】、promise2【7】，然后输出宏任务队列里的东西，setTimeout【8】
// //12、所以最后输出的顺序是script start、async1 start、async2、promise1、script end、async1 end、promise2、setTimeout
