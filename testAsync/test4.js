/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-07-27 15:19:19
 * @LastEditTime: 2022-07-27 15:19:26
 * @LastEditors:  
 */
setTimeout(function () {
  Promise.resolve().then(function () {
    console.log("bbb")
  })
}, 0)
Promise.resolve().then(function () {
  setTimeout(function () {
    console.log("aaa")
  }, 0)
})