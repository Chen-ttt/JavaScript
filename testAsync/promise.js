/**
 * Promise
 * 异步编程的一种解决方案, 用链式调用的方式解决回调地狱
 * 本质上来说promise是JS内置对象, Promise是构造函数, 封装一个异步操作并获取其成功/失败的值
 * 
 * 1. pending -> resolved 或 rejected
 *    一旦状态改变后就不可再变, 不可逆
 * 2. new Promise为同步函数, 一旦创建实例就立即执行, 无法取消
 */

/**
 * 基本使用
 * const p1 = new Promise((resolve, reject) => {
 *    if(// 异步操作成功){
 *      resolve(value);
 *    } else {
 *      reject(reason);
 *    }
 * })
 */

// 1. 如何改变promise状态
const p1 = new Promise((resolve, reject) => {

})
console.log("p1:", p1) // PromiseState: pending

const p2 = new Promise((resolve, reject) => {
  // 用定时器模拟异步任务, 1秒钟后将promise状态变为成功
  setTimeout(() => {
    resolve()
    console.log("setTimeout. p2:", p2) // PromiseState: fulfilled
  }, 1000)
})
console.log("p2:", p2) // PromiseState: pending 
// 先执行这里, 此时打印的状态还没改变, 但点开promise看里面是fulfilled, 这是因为打印的时候异步任务还没执行, 点开的时候异步任务已经执行完了

const p3 = new Promise((resolve, reject) => {
  reject()
})
console.log("p3:", p3) // PromiseState: rejected


// 2. promise三种状态的表现
//  2a. pending状态下, 不会执行任何回调
p1.then(() => {
  console.log("p1 then执行啦")
}).catch(() => {
  console.log("p1 catch执行啦")
})

//  2b. resolved状态下, 执行then回调, 且默认返回一个resovled的promise
// (但一开始只能拿到pending状态的promise, 因为then还没执行)
const p4 = Promise.resolve()
console.log("p4:", p4)
const res = p4.then(() => {
  console.log("p4 then执行啦")
}).catch(() => {
  console.log("p4 catch执行啦")
})

// 默认返回一个resovled状态的promise
// 由于异步回调, 打印时状态为pending, 点开状态是fulfilled(因为then被放到微任务队列, 等执行到then时才返回resolved状态的promise)
console.log("p4第1次回调返回:", res)

const res1 = p4.then(() => {
  console.log("p4的第二个then执行啦")
  throw new Error('Error of p4')
})

// 如果手动抛出异常, 则返回一个rejected状态的promise
// 由于异步回调, 打印时状态为pending, 点开状态是rejected
console.log("p4第2次回调返回:", res1)

//  2c. rejected状态下, 执行catch回调, 且默认返回一个resovled的promise
const p5 = Promise.reject()
const res3 = p5.then(() => {
  console.log("p5 then执行啦")
}).catch(() => {
  console.log("p5的第一个catch执行啦")
})

// !!!和之前情况一样
console.log("p5第1次回调返回:", res3)

const res4 = p5.catch(() => {
  console.log("p5的第二个catch执行啦")
  throw new Error('Error of p5')
})
console.log("p5第2次回调返回:", res4)

/**
 * 总结
 * 不管在then回调中, 还是catch回调中, 只要没有抛出异常, 则返回resolved状态的promise
 * 如果抛出异常或人为抛出异常, 则返回rejected状态的promise
 */

// 3. finally - 不管成功与否, 都会执行finally
p5.finally(() => {
  console.log("finally")
})


const p7 = Promise.resolve()
p7.then(() => {
  console.log("p7的第", 1, "个then执行啦")
  return 2
}).then((value) => {
  console.log("p7返回的value:", value)
  console.log("p7的第", value, "个then执行啦")
})


// 面试题
console.log("面试题")
const p6 = Promise.resolve()

p6.then(() => {
  console.log(1) // 先输出1, 此处返回一个resolved状态的promise
}).catch(() => {
  console.log(2)
}).then(() => {
  console.log(3) // 因此触发这里的then, 输出3
  throw new Error('') // 抛出异常, 因此此处返回一个rejected状态的promise
}).catch(() => {
  console.log(4) // 因此触发这里的then, 输出4
})

// 面试题2
let p8 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("面试题2 setTimeout")
    resolve()
  }, 0)
  console.log("面试题2 promise")
}).then((value) => {
  console.log("面试题2 成功啦")
})
console.log("面试题2结束")

// !!!注意 new Promise中的宏任务会放入任务队列, 到下一轮时间循环才执行
// 但会先于该promise对象的then, 虽然then是微任务, 但在promise对象状态未被确定时, then回调一直被挂起
// 需要等待发起函数new Promise的返回值, 根据返回结果才能决定是否执行回调或执行哪个回调
// 最后才注册相应的回调函数并放入任务队列, 待主线程空闲时, 该微任务被推入主线程

// !!!注意 将上述例子中的setTimeout换成resolve()/Promise.resolve()等也是一样的, 都是宏任务


// 如果需要在循环中执行异步操作, 不可以使用forEach或map这一类方法
// 因为forEach或map会立即返回, 并不会等到所有的异步操作都执完毕
// 应当使用传统的for循环

// 更进一步, 如果想要循环中的操作并发执行, 使用for await

// Promise.all将多个promise实例包装成一个新的promise实例, 返回结果数组
// Promise.race 返回最快的

// await - 阻塞后面的代码
// 如果返回reject，await后面都不会执行了，需要用try catch

/**
 * Promise.resolve()
 * 1. 参数为空, 返回一个resolved状态的promise对象
 * 2. 参数为Promise实例, 不作任何修改, 直接返回实例
 * 3. 参数是具有then方法的对象(i.e.thenable对象), 将该对象转为promise对象, 并立即执行then方法
 */
