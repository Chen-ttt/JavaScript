/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-03 23:43:23
 * @LastEditTime: 2022-09-04 00:33:24
 * @LastEditors:  
 */
const time = (timer) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}
const ajax1 = () => time(2000).then(() => {
  console.log(1)
  return 1
})
const ajax2 = () => time(1000).then(() => {
  console.log(2)
  return 2
})
const ajax3 = () => time(3000).then(() => {
  console.log(3)
  return 3
})

function mergePromise (arr) {
  let data = []
  let promise = Promise.resolve()

  for (const i of arr) {
    promise = promise.then(() => {
      return i().then((res) => {
        data.push(res)
        return data
      })
    })
  }
  return promise
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log("done")
  console.log(data) // data 为 [1, 2, 3]
})

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]