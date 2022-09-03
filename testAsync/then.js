/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-03 22:43:23
 * @LastEditTime: 2022-09-03 22:47:34
 * @LastEditors:  
 */
/**
 * then可以传入两个参数
 * 第一个参数是处理promise成功的函数, 第二个参数是处理promise失败的函数
 */


Promise.reject()
  .then((
    () => { console.log("第一次尝试...成功!!! 进入then的第一个参数函数") }
  ),
    () => { console.log("第一次尝试...失败!!! 进入then的第二个参数函数") }) // 会进入这里; 如果不传入这第二个参数函数, 则进入catch
  .then(() => { console.log("第一次尝试...yes!!!! 进入第二个then啦!!!") }) // 上一个then仍返回resolved的promise, 因此进入第二个then
  .catch(() => { console.log("第一次尝试...进入catch") })


Promise.resolve()
  .then((
    () => {
      console.log("第二次尝试... 成功!!! 进入then的第一个参数函数")
      throw new Error("第二次尝试...抛出错误!!!") // 在这里抛出错误, 会进入catch, 而不是then的第二个参数函数
    }
  ),
    () => { console.log("第二次尝试...失败!!! 进入then的第二个参数函数") })
  .then(() => { console.log("第二次尝试...es!!!! 进入第二个then啦!!!") })
  .catch(() => { console.log("第二次尝试...进入catch") }) // 进入这里!!!