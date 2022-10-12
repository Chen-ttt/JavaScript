/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-10-12 15:38:12
 * @LastEditTime: 2022-10-12 16:16:25
 * @LastEditors:  
 */

// 华为二面算法题

// 给定一个数组, 从中选择两个元素, 使这两个元素将数据划分为三部分, 每一部分的和相等
// 找出这两个元素的下标并输出, 没有则返回-1

// case: [3, 2, 3, 5, 7, 1, 4]
// 输出: 2, 4; 选取下标2和4的元素, 将数组划分为[3, 2], [5], [1, 4], 和相等

function splitArr (arr) {
  const length = arr.length
  let left = 1
  let right = arr.length - 2

  // 分别维护前缀和, 后缀和
  let frontSum = new Array(length).fill(0)
  let endSum = new Array(length).fill(0)

  for (let i = 1; i < length; i++) {
    frontSum[i] = frontSum[i - 1] + arr[i - 1]
  }

  for (let i = length - 2; i >= 0; i--) {
    endSum[i] = endSum[i + 1] + arr[i + 1]
  }

  // 左右指针遍历
  while (left < right) {
    // 计算中间部分的和
    const midSum = endSum[left] - endSum[right] - arr[right]

    if (midSum === frontSum[left] && frontSum[left] === endSum[right]) {
      return [left, right]
    }

    // 比较左指针的前缀和右指针的后缀, 移动较小部分的指针
    // 两指针不能同时移动, 否则会错过正确的解
    if (frontSum[left] < endSum[right]) left++
    else right--
  }

  return -1
}

console.log(splitArr([3, 2, 3, 5, 7, 1, 4]))