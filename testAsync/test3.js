/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-07-27 14:59:50
 * @LastEditTime: 2022-07-27 15:34:34
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
  return new Promise(function (resolve) {
    console.log('promise1')
    resolve()
  })
}

async3().then(function (value) {
  console.log('async3.then:', value)
})

async1()

console.log('script end')

