/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-02 19:53:08
 * @LastEditTime: 2022-10-17 20:58:56
 * @LastEditors:  
 */

// 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？(用Promise实现)三个亮灯函数已经存在

function red () {
  console.log('red')
}
function green () {
  console.log('green')
}
function yellow () {
  console.log('yellow')
}

function light (time, fn) {
  return new Promise(resolve => {
    setTimeout(() => {
      fn()
      resolve()
    }, time)
  })
}

// 方法1
function answer () {
  Promise.resolve()
    .then(() => {
      console.log("enter 1st then")
      return light(3000, red)
    })
    .then(() => {
      console.log("enter 2nd then")
      return light(2000, green)
    })
    .then(() => {
      console.log("enter 3rd then")
      return light(1000, yellow)
    })
    .then(() => {
      console.log("enter last then")
      answer()
    })
}

answer()


// 方法2
let a = [() => { return light(1000, yellow) }, () => { return light(1000, red) }, () => { return light(1000, green) },]

let fn = async function () {
  for (const i of a) {
    await i()
  }
  return 3
}

console.log("hhhh", fn())
