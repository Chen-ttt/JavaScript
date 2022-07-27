/*
 * 例子2. 当await的表达式结果是无状态的promise对象时
 */
async function async1 () {
  console.log('async1 start')
  await async2()
  // 1. 调用async2(); 返回一个pending状态的promise对象
  // 2. 之后代码阻塞; 
  // 3. 跳出async1后执行同等级的同步代码; 
  // 4. 执行完毕, 回到这里, await之后的表达式仍无状态, 将之后的代码挂起, 继续干该干的活
  // 5. 定时器的5秒到达, promise状态变为fulfilled, 则此时resolve中的参数2作为await的表达式结果, 执行之后代码
  console.log('async1 end')
}
async function async2 () {
  console.log('async2')
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("setTime in async2")
      resolve(2)
    }, 5000)
  })
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
}, 0)
async1()
new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')

