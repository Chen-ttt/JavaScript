/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-05 00:56:44
 * @LastEditTime: 2022-09-05 01:16:19
 * @LastEditors:  
 */
function debounce (fn, time) {
  let flag = false

  const r = () => {
    if (!flag) {
      setTimeout(() => {
        console.log("时间到")
        fn() // 业务逻辑
        flag = false
      }, time)
    }

    flag = true
  }

  return r
}