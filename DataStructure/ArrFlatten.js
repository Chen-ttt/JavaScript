/*
 * @Description:
 * @Author: Tong Chen
 * @Date: 2022-08-24 17:08:25
 * @LastEditTime: 2022-08-24 18:35:24
 * @LastEditors:  
 */
/**
 * 数组扁平化
 */

let arr = [1, 2, [3, 4], [5, [6, 7, [8, 9]]]]

// 1. flat()
// 按照指定的深度递归遍历arr, 将所有元素和遍历到的数组中的元素合并到一个新的数组返回
const result1 = arr.flat(1) // 默认深度为1
console.log(result1)

const result2 = arr.flat(2) // 3 4 5是第一层的, 6 7是第二层, 8 9是第三层
console.log(result2)

const result3 = arr.flat(Infinity) // 指定深度为无限
console.log(result3)


// 2. 使用正则


// 3. reduce() + concat()
let flattenReduce = (arr) => {
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? flattenReduce(cur) : cur)
  }, [])
}
console.log("Reduce & Concat: ", flattenReduce(arr))


// 4. 使用递归
const result4 = []
let recursion = (arr) => {
  arr.forEach(item => {
    if (Array.isArray(item)) {
      recursion(item)
    } else {
      result4.push(item)
    }
  })
}
recursion(arr)
console.log("递归flat: ", result4)


// 5. 使用展开语法 + concat()
function flatten (arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr) // 展开是降维操作
  }
  return arr
}
const t = flatten(arr)
console.log("展开: ", t)
