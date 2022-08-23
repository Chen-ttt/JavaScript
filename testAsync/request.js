/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-08-23 21:50:37
 * @LastEditTime: 2022-08-23 22:17:07
 * @LastEditors:  
 */
/**
 * 1. 从task任务队列中取第一个task（比如setTimeout、setIntervel的回调，也可以将同一轮循环中的所有同步代码看作是一个宏任务），执行它。
 * 2. 执行微任务队列里的所有微任务。
 * 3. 浏览器判断是否更新渲染屏幕，如果需要重新绘制，则执行步骤4-13，如果不需要重新绘制，则流程回到步骤1，这样不断循环。
 * 4. 触发resize、scroll事件，建立媒体查询（执行一个任务中如果生成了微任务，则执行完任务该后就会执行所有的微任务，然后再执行下一个任务）。
 * 5. 建立css动画（执行一个任务中如果生成了微任务，则执行完该任务后就会执行所有的微任务，然后再执行下一个任务）。
 * 6. 执行requestAnimationFrame回调（执行一个任务中如果生成了微任务，则执行完该任务后就会执行所有的微任务，然后再执行下一个任务）。
 * 7. 执行 IntersectionObserver 回调（执行一个任务中如果生成了微任务，则执行完该任务后就会执行所有的微任务，然后再执行下一个任务）。
 * 8. 更新渲染屏幕。
 * 9. 浏览器判断当前帧是否还有空闲时间，如果有空闲时间，则执行步骤10-12。
 * 10. 从 requestIdleCallback回调函数队列中取第一个，执行它。
 * 11. 执行微任务队列里的所有微任务。
 * 12. 流程回到步骤9，直到requestIdleCallback回调函数队列清空或当前帧没有空闲时间。
 * 13. 流程回到步骤1，这样不断循环。
 */

// requestAnimationFrame和requestIdleCallback是和宏任务性质一样的任务，只是他们的执行时机不同而已
// requestAnimationFrame回调的执行与task和microtask无关，而是与浏览器是否渲染相关联的。它是在浏览器渲染前，在微任务执行后执行
// requestIdleCallback是在浏览器渲染后有空闲时间时执行，如果requestIdleCallback设置了第二个参数timeout，则会在超时后的下一帧强制执行

requestAnimationFrame(() => {
  console.log(111)
  setTimeout(() => {
    console.log(222)
  })
  Promise.resolve().then(() => {
    console.log(333)
  })
})

requestAnimationFrame(() => {
  console.log(444)
  Promise.resolve().then(() => {
    console.log(555)
  })
})

/**
 * 111
 * 333
 * 444
 * 555
 * 222
 */

requestIdleCallback(() => {
  console.log(111)
  setTimeout(() => {
    console.log(222)
  })
  Promise.resolve().then(() => {
    console.log(333)
  })
})

requestIdleCallback(() => {
  console.log(444)
  Promise.resolve().then(() => {
    console.log(555)
  })
})

/**
 * 111
 * 333
 * 444
 * 555
 * 222
 */

Promise.resolve().then(() => {
  console.log(111)
  setTimeout(() => {
    console.log(222)
  })
  Promise.resolve().then(() => {
    console.log(333)
  })
})

Promise.resolve().then(() => {
  console.log(444)
  Promise.resolve().then(() => {
    console.log(555)
  })
})

/**
 * 111
 * 444
 * 333
 * 555
 * 222
 */