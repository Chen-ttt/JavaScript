/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-08 22:59:04
 * @LastEditTime: 2022-10-17 21:26:09
 * @LastEditors:  
 */
/**
 * 阿里一面
 * 补全createFlow函数，实现功能，按照以下顺序打印
 * -> a
 * -> b
 * [延迟1秒]
 * -> c
 * [延迟1秒]
 * -> d
 * -> e
 * -> done
 */

function createFlow (arr) {
  // 补全代码
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const subFlow = createFlow([
  () => delay(1000).then(() => console.log('c'))
])

createFlow([
  () => console.log('a'),
  () => console.log('b'),
  subFlow,
  [() => delay(1000).then(() => console.log('d')), () => console.log('e')],
]).run(() => {
  console.log('done')
})
