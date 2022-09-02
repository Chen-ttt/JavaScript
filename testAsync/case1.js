/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-02 00:46:46
 * @LastEditTime: 2022-09-02 01:49:10
 * @LastEditors:  
 */
/**
 * 使用Promise实现每隔1秒输出1,2,3 - 串行
 */

function answer (arr) {
  arr.reduce((prevPromise, cur) => {
    return prevPromise.then(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
          console.log(cur)
        }, 1000)
      })
    })
  }, Promise.resolve())
}

answer([1, 2, 3])