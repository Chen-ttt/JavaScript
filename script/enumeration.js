/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-07-12 14:41:40
 * @LastEditTime: 2022-08-28 23:22:47
 * @LastEditors:  
 */
/**
 * 枚举 - 遍历
 * JS中就是用对象
 */

// 数组是特殊的对象
var arr = [1, 2, 3, 4, 5]
console.log("遍历数组")
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i])
}
console.log("遍历数组values")
for (var i of arr) {
  console.log(i)
}

console.log("遍历数组keys")
for (var i in arr) {
  console.log(i)
}

var car = {
  name: 'Benz',
  price: 155,
  width: '2.5'
}
// 读取属性 - 2种写法
console.log(car.name) // 常用
console.log(car['name'])
// 其实在JS引擎内部, 会先将car.name转化为car['name'], 再去寻找name这个键

console.log("遍历对象")
for (var key in car) {
  console.log(key + ":" + car[key])
  console.log(key + ":" + car.key) // 这行不行
  // 因为JS会将其转为car['key'], 在car对象中找不到key这个键因此输出undefined
}

function Car () {
  this.brand = 'Benz'
  this.price = 155
  this.width = '2.5'
}
Car.prototype = {
  color: 'red'
}
Object.prototype.name = 'Obj'

var car = new Car()
car.__proto__ = {
  p: 'lll'
}
console.log(car)
console.log("遍历原型链")
for (var key in car) {
  console.log(key + ":" + car[key])
}
// 用for...in去遍历, 原型链上所有自定义的属性都会被打印出来!!!
// Array也是
let arrTest = [1, 2, 0, 2]
Array.prototype.add = 0
for (let i in arrTest) {
  console.log("Find key in arrTest", i)
}

arrTest.a = 0
console.log(Object.getOwnPropertyNames(arrTest))


// 如果只想打印自己的属性, 不想打印原型上的呢?
/**
 * Object方法
 * 实例化对象.hasOwnProperty(属性名)
 * 1. 返回一个布尔值, 判断对象是否包含特定的自身(非继承)属性
 * 2. 该方法可以被覆盖, 可以自己重写
 */
console.log("遍历自身属性")
for (var key in car) {
  if (car.hasOwnProperty(key)) {
    console.log(key + ":" + car[key])
  }
}

// 另一种判断属性是否存在于对象中的方法
// 属性名 in 对象名 - 返回boolean值
// 但这种方法不能排除继承属性
console.log("遍历属性")
for (var key in car) {
  console.log(key + ":" + car[key]) // 相当于没判断, 因为就是通过in取得key
  if (key in car) {
    console.log(key + ":" + car[key])
  }
}