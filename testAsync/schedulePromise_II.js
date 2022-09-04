/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-08-29 16:49:50
 * @LastEditTime: 2022-09-04 15:41:59
 * @LastEditors:  
 */
const request = (time, url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url + '')
      console.log(url, "任务完成, 耗时:", time)
    }, time)
  })
}

function answer (obj) {
  const MAX = 3
  let pool = []
  let curList = []

  function run (task) {
    return task.then(data => {

      pool.splice(pool.indexOf(task), 1)
      if (curList.length) {
        const obj = curList.shift()
        const nextTask = request(obj.time, obj.url)

        pool.push(nextTask)
        run(nextTask)
      }

      return data
    })

  }

  function putRequest (obj) {
    return new Promise(resolve => {
      if (pool.length < MAX) {
        const task = request(obj.time, obj.url)
        pool.push(task)
        run(task).then(resolve)
      } else {
        curList.push(obj)
      }
    })
  }

  return putRequest
}

let myRequest = answer()

myRequest({
  time: 5000,
  url: '1'
})
myRequest({
  time: 500,
  url: '2'
})
myRequest({
  time: 2000,
  url: '3'
})
myRequest({
  time: 1000,
  url: '4'
})
myRequest({
  time: 100,
  url: '5'
})
