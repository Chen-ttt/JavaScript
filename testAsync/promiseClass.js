/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-04 16:41:28
 * @LastEditTime: 2022-09-04 23:45:57
 * @LastEditors:  
 */

class Promise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'

  // 1. 传入函数func在new时自动调用
  constructor(func) {
    this.status = Promise.PENDING
    this.result = null

    this.resolveCallback = []
    this.rejectCallback = []

    // 7. 在构造器调用func时用try catch捕获错误, 如果在new的过程中抛出错误, 直接执行reject
    try {
      func(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error) // 注意, 此处的reject不需要bind, 因为是在构造器内部调用, 不是在外部调用
    }
  }

  // 2. 以类方法的形式定义resolve和reject
  //  注意, 相当于把这两个类方法传给func, 在func内部调用, 那就是在外部环境直接调用, 因此this指向就没有了, 需要用箭头函数定义 或者 用bind绑定this
  resolve (result) {
    setTimeout(() => {
      // 3. 修改状态
      if (this.status === Promise.PENDING) {
        this.status = Promise.FULFILLED

        // 4. 赋值结果
        this.result = result

        // 10. 一旦状态改变, 将池子里的回调顺序注册
        this.resolveCallback.forEach(fn => {
          console.log("清空任务队列", fn)
          fn(result)
        })
      }
    })
  }

  // 11. 如下面的例子, then和catch回调都是在事件循环的最后执行, 而不是状态一旦改变, 立即把池子里的函数都执行完
  // 因此将resolve和reject里面的代码都包上setTimeout, 等执行完全部同步代码再执行
  // 注意!!! 一定要先setTimeout再判断status是否是pending状态, 不可以在里面包setTimeout, 不然如果测试的时候同时调用resolve和reject, 判断时status都是pending状态, 会注册两个回调函数, 都会执行, 不符合promise状态不可变的性质
  reject (result) {
    setTimeout(() => {
      if (this.status === Promise.PENDING) {
        this.status = Promise.REJECTED
        this.result = result

        this.rejectCallback.forEach(fn => {
          fn(result)
        })
      }
    })
  }

  // 5. 定义then - 有两个参数
  then (onFulfilled, onRejected) {
    console.log("enter then", onFulfilled)
    onFulfilled = typeof (onFulfilled) === 'function' ? onFulfilled : (value) => (value)
    onRejected = typeof (onRejected) === 'function' ? onRejected : (reason) => { throw reason }

    const promise2 = new Promise((resolve, reject) => {
      console.log("enter promise2", this)
      const resolvePromise = (func) => {
        try {
          const re = func(this.result)
          if (re === promise2) {
            throw new Error("Could not return self")
          }

          if (re instanceof Promise) {
            console.log("is a promise")
            re.then((v) => { resolve(v); console.log("这里resolve了") }, (err) => reject(err))
          } else {
            console.log("not promise")
            resolve(re)
          }
        } catch (err) {
          reject(err)
          throw new Error(err)
        }
      }

      // 6. 根据状态判断调用哪个回调, 并传结果
      // 注意. 在外部调用then时如果传入的参数不是函数, 不可以直接调用, 因此在这之前先判断参数类型, 如果不是函数, 需要变成空函数
      if (this.status === Promise.FULFILLED) {
        // 8. 植入异步, 会将其放入宏任务队列
        console.log("进入ful", onFulfilled)
        setTimeout(() => {
          resolvePromise(onFulfilled)
        })
      }
      if (this.status === Promise.REJECTED) {
        setTimeout(() => {
          resolvePromise(onRejected)
        })
      }

      // 9. 考虑但promise状态还没有确定时, 先将成功和失败的回调暂时存起来, 等状态改变时, 立即将池子里的回调函数顺序执行
      if (this.status === Promise.PENDING) {
        console.log("放入池子", this.result)
        this.resolveCallback.push(resolvePromise.bind(this, onFulfilled))
        this.rejectCallback.push(resolvePromise.bind(this, onRejected))
      }
    })

    return promise2
  }

  // 7. 定义catch
  // catch


}

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("ssss")
    reject("ffff")
    console.log("test event loop")
  })
})

let tt = p.then(res => {
  console.log("success", res)
  return new Promise((resolve, reject) => {
    resolve("ppp")
  })
},
  err => {
    console.log("fail", err)
  }
).then(res => {
  console.log("进入第二个then", res)
})

// setTimeout(() => {
//   console.log("tt", tt)
// }, 5000)


// console.log(p)