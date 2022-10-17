/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-02 00:46:46
 * @LastEditTime: 2022-09-03 05:38:40
 * @LastEditors:  
 */
/**
 * 使用Promise实现每隔1秒输出1,2,3 - 串行
 */

async function answer (arr) {
  console.log(arr)
  for (const a of arr) {
    console.log(a)
    const r = await new Promise(resolve => {
      setTimeout(() => {
        resolve
        console.log("enter timer", a)
      }, 1000)
    })
    console.log("r", r)
  }
}

answer([1, 2, 3])
