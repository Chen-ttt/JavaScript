/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-05 00:47:07
 * @LastEditTime: 2022-09-05 01:27:58
 * @LastEditors:  
 */

function throttle (fn, time) {
  let timer = null

  const r = () => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn()
      console.log("set a new timer")
    }, time)
  }
  return r
}
