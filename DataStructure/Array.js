/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-07-13 19:30:09
 * @LastEditTime: 2022-08-24 18:33:12
 * @LastEditors:  
 */
/**
 * Array
 */

/**
 * filter() - 对数组进行筛选,返回一个符合条件的新数组;
 * !!! 不会原地改动!
 * Array.filter(function(currentValue, index, arr), thisValue)
 * 参数为function, 对每个元素执行该function, 若返回true则保留该元素
 * currentValue是function的必要参数, 即当前元素的值
 */
var arr = [1, 1, 2, 3, 2, 4]
var newArr = arr.filter((num) => {
  return num > 2 ? true : false
})
console.log(newArr)

/**
 * indexOf(item)
 * 检索item, 找到则返回item第一个出现的位置的数组下标, 没找到返回-1
 * 
 * indexOf(item, start)
 * start是可选择的整数参数, 规定了数组开始检索的位置
 * 若不传值, 则从头开始检索
 * start范围是0到length-1
 * 
 */
var score = [99, 98, 50, 99]
console.log(score.indexOf(99))
console.log(score.indexOf(2222))

console.log(score.indexOf(99, 2))

/**
 * map(function(currentValue, index, arr))
 * 创建一个新数组, 其结果是该数组中每一个元素调用一次该function的返回值, 不改变原数组, 也不对空数组进行操作
 */

var arr1 = [1, 2, 3]
var result = arr1.map(value => value * 2)
console.log(result)

/**
 * shift()
 * 将数组中第一个元素删除并返回该元素的值
 * 用于实现队列!!!
 * 
 * 注意: 该方法不创建新数组, 直接改变原数组, 和pop一样
 *      如果数组为空, 那么shift不进行任何操作, 并返回undefined
 */

var firstNum = arr1.shift()
console.log("shift模拟队列: 首元素", firstNum)
console.log("shift模拟队列: 首元素出队后", arr1)

/**
 * fill()
 * 用参数指定的数据填满数组
 */
arr1.fill(0)
console.log("After fill:", arr1)

/**
 * 创建二维数组 3*4
 */
var arr2D = new Array(3).fill(0).map(() => new Array(4).fill(0))
console.log("2D array:", arr2D)


/**
 * sort() - 将原地改动函数
 * 对函数进行排序, 默认是按照字母升序(依照ASCII码)
 * 
 * 如果需要排序数字, 需要在参数中传入一个函数来指定如何排序
 * sort(function(a, b){ // a在b后面
 *  return true/正值 将交换a和b的位置
 *  return false/负值 将不交换
 * })
 * 
 * 在V8引擎中, 如果数组元素少于10个, 则sort使用的是插入排序;
 * 多于10个, 则使用的是快速排序
 */

console.log(['a', 'c', 'b'].sort())
// 但如果是数字比较, 会先调用toString() 将数字转为字符串比较
console.log([45, 5, 412].sort())
// 45会在5前面, 因为比较第一位4和5, 已经小于, 就不再向后比较
// 412会在45前面, 因为第一位4相等, 比较第二位1和5, 1更小, 不在向后比较

// 比较数字

// 升序
console.log([45, 5, 412].sort((a, b) => {
  console.log(a, b) // a在b后面
  return a - b // 返回负值, 说明a小于b(i.e.较后的那个元素更小), 交换; 正值, 不交换
}))

// 降序
console.log([45, 5, 412].sort((a, b) => {
  console.log(a, b)
  return b - a // 反之
}))


/**
 * concat() - 合并两个或多个数组, 返回一个合并后的新数组
 */

let a1 = [1, 2, 3]
let a2 = [4, 5, 6]
let a3 = [7, 8, [9, 10]]
let num = 11

let re = a1.concat(a2)
console.log("concat a1 & a2", re)

let re1 = a1.concat(a2, a3, num)
console.log("concat a1 & a2 & a3 & num", re1) // 数字也可以被拼接进去
// 但嵌套数组中的元素不会被拍平

let re2 = a1.concat()
console.log("concat不传入参数, 相当于执行一次深拷贝", re2)


/**
 * reduce(callback, [initialValue])
 * 按照升序, 对数组中每个元素依次执行回调函数, 不包括被删除和从未被赋值的元素
 * 
 * callback参数:
 *    1. accumulation: 截至当前元素, 所有之前元素被reduce处理的累计的结果
 *    2. current: 当前被执行的数组元素
 *    3. currentIndex: 当前元素index
 *    4. sourceArray: 调用reduce方法的数组
 */

console.log(a1.reduce((total, current, curIndex, arr) => {
  console.log("total:", total, "current", current, "curIndex", curIndex)
  return total + current
}))

// 如果传入初始值, 则以初始值作为起点
console.log(a1.reduce((total, current, curIndex, arr) => {
  console.log("total:", total, "current", current, "curIndex", curIndex)
  return total + current
}, 10))

// 用法
// 求和
console.log("a2 sum", a2.reduce((a, b) => a + b))
// 求乘积
console.log("a2 multiply", a2.reduce((a, b) => a * b))

// 统计每个元素出现次数
let names = ['Anna', 'Ben', 'Tong', 'Ben', 'Ben']
let nameNum = names.reduce((pre, cur) => {
  if (cur in pre) {
    pre[cur]++
  } else {
    pre[cur] = 1
  }
  return pre
}, {})
console.log("统计个数: ", nameNum)

// 数组去重
let nameDeSame = names.reduce((prev, cur) => {
  if (prev.includes(cur)) {
    return prev
  } else {
    prev.push(cur)
    return prev
  }
}, [])
console.log("去重: ", nameDeSame)

// flatten 见ArrFlatten.js

/**
 * some(回调函数(item, index, arr)) - 判断数组中至少存在一个满足指定条件的元素, 返回Boolean
 * 对每个元素执行回调函数, 直到找到回调函数返回true的元素, 就返回true, 不再继续遍历; 否则返回false
 * 回调函数的参数中只有item是必要的
 */

let marks = [90, 91, 97, 80, 40]
let great = marks.some(item => item > 95)
console.log("great: ", great)
let bad = marks.some(item => item < 20)
console.log("bad: ", bad)

/**
 * every(回调函数(item, index, arr)) - 判断数组元素是否全部满足条件, 返回Boolean
 */

let allGreat = marks.every(item => item > 95)
console.log("allGreat: ", allGreat)
let allOK = marks.every(item => item > 20)
console.log("allOK: ", allOK)

/**
 * find(回调函数) - 对每个元素执行回调, 返回第一个符合条件的元素(找到后停止遍历, 直接返回)
 * 如果没有符合条件的元素, 则返回undefined
 */
let findGreat = marks.find(item => item > 95)
console.log("findGreat", findGreat)
let findBad = marks.find(item => item < 20)
console.log("findBad", findBad)

/**
 * filter() - 返回所有符合条件的元素, 返回一个新数组
 */
