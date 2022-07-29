/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-07-29 22:53:30
 * @LastEditTime: 2022-07-29 23:57:50
 * @LastEditors:  
 */
/**
 * Promise.all() / race()
 * 
 * 1. all()
 *    接收一个以Promise实例为成员的可迭代对象为参数, 并返回一个新创建的Promise实例;
 * 当该参数中的所有成员都变为fulfilled状态时, 返回的promise也变为fulfilled状态, 且传递的值为每个Promise实例成员的返回值组成的数组;
 * 当该参数中有一个成员变为rejected状态, 返回的promise就会rejected, 且只传递第一个rejected状态的Promise实例的返回值
 * 
 * 如果参数中有成员不是promise实例, 会先用Promise.resolve将其转为promise实例
 */

const p1 = new Promise((resolve, reject) => {
  resolve("hello我是1111")
})

const p2 = new Promise((resolve, reject) => {
  throw new Error("p22222错啦!!!")
}).then((result) => result)
  .catch((err) => err)

const p3 = new Promise((resolve, reject) => {
  reject("p33333来啦!!!")
}).then((result) => result)
  .catch((err) => err)

Promise.all([p1, p2, p3, 3])
  .then((result) => console.log("then:", result)) // 由于现在all方法返回的promise实例是fulfilled状态, 因此会进入then回调
  .catch((err) => console.log("catch:", err))

// 注意, 上面这个例子中p2,p3虽然reject, 但是reject之后会执行p2的catch回调, 在回调中只要没有抛出错误, 仍返回resolved状态的promise
// 不同的是, p2传递的是整个error信息, 而p3传递的是reject方法的参数

// !!!手写all
function All (arr) {
  // 1. res数组记录每个promise成员的返回值
  var res = new Array(arr.length)
  // 2. count记录已成功的promise数量
  var count = 0

  return new Promise((resolve, reject) => {
    arr.forEach((item, index) => { // 3. 为每个promise成员添加then和catch
      item = Promise.resolve(item) // 用Promise.resolve包裹一下是为了接收非promise实例的参数成员, 但这些成员没有状态, 包裹后直接fulfilled, 进入then
        .then((result) => {
          // 4. 有成员变为resolved后, 记录返回值和数量, 检查是否所有promise成员都resolved了, 如果是, 将新建的promise变为resolved并返回结果数组
          count++
          res[index] = result
          if (count === arr.length) resolve(res)
        }).catch(err => reject(err)) // 5. 为每个promise成员添加catch, 一旦有一个reject, 立即将新建的promise变为reject并返回错误信息
    })
  })
}

All([p1, p2, p3, 3])
  .then((result) => console.log("then:", result)) // 由于现在all方法返回的promise实例是fulfilled状态, 因此会进入then回调
  .catch((err) => console.log("catch:", err))

/**
 * 2. race() -- 赛跑
 *    接收一个可迭代对象作为参数, 当某个成员promise状态变更后, 不管是fulfilled状态还是rejected状态
 * 都立即返回一个新建的promise实例, 并传递该成员的返回值
 * 
 * 同样, 如果参数中有成员不是promise实例, 会先用Promise.resolve将其转为promise实例
 */
const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("我停顿了3秒")
  }, 3000)
})

const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("我停顿了1秒")
  }, 1000)
})

Promise.race([p4, p5])
  .then((result) => console.log("Race.then:", result))
  .catch((err) => console.log("Race.catch:", err))

function Race (arr) {
  return new Promise((resolve, reject) => {
    arr.forEach((item) => { // 这里也可以用Promise.resolve容错常量参数
      // 哪个成员的状态一旦改变, 无论成功还是失败, 都直接改变返回的promise实例状态并传递结果
      item.then(result => resolve(result))
        .catch(err => reject(err))
    })
  })
}

Race([p4, p5])
  .then((result) => console.log("Race.then:", result))
  .catch((err) => console.log("Race.catch:", err))