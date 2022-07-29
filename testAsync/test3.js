/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-07-27 14:59:50
 * @LastEditTime: 2022-07-29 16:14:58
 * @LastEditors:  
 */
async function async1 () {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2 () {
  console.log('async2')
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
}, 0)

async function async3 () {
  return new Promise(function (resolve) { // await一次
    console.log('promise1')
    resolve()
  })

  /**
   * 相当于
   * var pro = await new Promise(function (resolve) {
      console.log('promise1')
      resolve()
    })
     return pro
   */
}

async3().then(function (value) { // await两次, 因此排在'async1 end'后面
  console.log('async3.then:', value)
})

async1()

console.log('script end')

