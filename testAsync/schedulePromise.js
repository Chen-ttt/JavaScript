/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-08-28 22:41:10
 * @LastEditTime: 2022-08-28 23:04:11
 * @LastEditors:  
 */

// 定义任务 - 定时器模拟任务
const createPro = (time, i) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("time" + time)
    }, time)
  })
}

async function schedule (arr, maxNum) {
  // 正在执行的任务数组 pool
  let pool = [],
    curNum = 0

  for (let i = 0; i < arr.length; i++) {
    const task = createPro(arr[i], i) // 定义当前任务
    pool.push(task) // 放入池子
    curNum++

    // 为当前任务定义then回调
    task.then((data) => {
      console.log("任务", i, "执行完成, data:", data, ", 当前并发数", curNum)

      // 一旦任务完成, 将其从池子里删掉
      pool.splice(pool.indexOf(task), 1)
      curNum--
      console.log("将任务", i, "删除, 当前并发数", curNum)
    })

    // 如果当前池子已达到最大并发条件
    if (curNum === maxNum) {
      await Promise.race(pool) // 阻塞代码, 一旦有一个promise完成, 就会触发then且从pool中被删除, 则不再阻塞, 可以进入下一轮for, 处理新的任务
    }
  }

}

const times = [2000, 1000, 1800, 500, 1000]

schedule(times, 2)