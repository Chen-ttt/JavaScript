/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-07-31 16:01:37
 * @LastEditTime: 2022-07-31 23:39:58
 * @LastEditors:  
 */
/**
 * 使用递归进行深拷贝
 * 常用, 兼容性好, 效率较低, 次数过多的话, 容易栈溢出
 */

const obj = {
  name: 'Tong',
  age: 18,
  hobby: {
    1: 'eat',
    2: null
  },
  eat: () => { },
  sing: function () { },
  score: [99, 100, 59]
}

const newObj = deepClone(obj)

console.log(obj)
console.log(newObj)

if (null != 0) console.log("jjj")

function deepClone (initObj) {
  // 如果是原始数据类型, 直接返回
  if (typeof (initObj) !== 'object') return initObj
  // 但需要注意, 如果是null, typeof结果为object, 将被递归深拷贝, 导致null被拷贝成{}
  // 因此需要对null特别处理
  if (initObj === null) return null

  // 如果是引用数据类型, 需要深拷贝
  const newObj = {}
  // 遍历对象中的每一个属性/方法
  for (const key in initObj) {
    // console.log(initObj[key], initObj[key].constructor)
    // 若是原始数据类型的属性, 直接赋值
    if (typeof (initObj[key]) !== 'object') {
      newObj[key] = initObj[key]
    }

    // 如果是方法
    else if (typeof (initObj[key]) === 'function') {
      newObj[key] = initObj.bind(newObj) // 改变this指向后返回新函数
    }

    // 如果是对象属性/数组属性
    else {
      // 对数组特殊处理, 因为不能保证数组中每个元素都是原始类型, 因此需要递归拷贝
      // 判断数组 -- isArray / constructor
      if (Array.isArray(initObj[key])) {
        // if (initObj[key].constructor === Array) {
        newObj[key] = initObj[key].map(item => this.deepClone(item))
      } else {
        newObj[key] = this.deepClone(initObj[key])
      }
    }
  }
  return newObj
}