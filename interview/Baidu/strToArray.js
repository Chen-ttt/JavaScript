/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-09-25 23:29:52
 * @LastEditTime: 2022-09-26 00:01:37
 * @LastEditors:  
 */

// 百度一面
// 将str转为二维数组
// [
//  [0, 12, 9, 84],
//  [97, 23, 10],
//  [7, 3]
// ]

let str = `0 12 9  84
97    23   10

  7 3

  99`

function trans (input) {
  const lines = input.split("\n")

  let result = []

  for (const line of lines) {
    // if (line === "") continue

    const arr = line.split(" ")
    let newArr = []

    arr.forEach(item => {
      if (Number(item) + "" !== NaN && item !== "") { // 排除split后出现的空字符串
        newArr.push(Number(item))
      }
    })

    if (newArr.length) result.push(newArr) // 排除空行和只包含空格的行
  }

  return result
}

console.log(trans(str))