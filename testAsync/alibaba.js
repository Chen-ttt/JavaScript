/**
 * 1.补全createFlow函数，实现功能，按照以下顺序打印
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
  // 考核实现

  // 处理输出格式 - 非函数和数组
  const newArr = []
  if (arr.length === 1) {
    return () => { return arr[0]() }
  } else {
    for (const i of arr) {
      if (Array.isArray(i)) {
        newArr.push(...i)
      } else newArr.push(i)
    }
  }

  arr = newArr
  // 串行
  const result = arr.reduce((prevPromise, cur) => {
    return prevPromise.then(() => {
      return new Promise(resolve => {
        let re = cur()
        if (re instanceof Promise) {
          re.then(res => {
            resolve()
          })
        } else {
          resolve()
        }

      })
    })
  }, Promise.resolve())

  return { // 返回的值里一定要有run属性方法, 且应用闭包, 把run传入的f回调的执行时机和result的promise状态联系起来
    run (f) {
      result.then(() => f()) // result状态变为成功, 则执行这行, 才会调用run传进来的f
    }
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const subFlow = createFlow([
  () => delay(2000).then(() => console.log('c'))
])

createFlow([
  () => console.log('a'),
  () => console.log('b'),
  subFlow,
  [() => delay(2000).then(() => console.log('d')), () => console.log('e')],
]).run(() => {
  console.log('done')
})
