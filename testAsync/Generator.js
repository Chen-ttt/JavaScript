/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-07-31 12:43:36
 * @LastEditTime: 2022-07-31 15:39:29
 * @LastEditors:  
 */
/**
 * Generator
 * ES6提供的一种异步解决方案
 * 
 * 可以将Generator理解成一个状态机, 封装了多个内部状态
 * 同时, 它也是一个Iterator生成器, 返回的Iterator对象可以依次遍历Generator函数内部的每个状态
 */

// 1. 特征1: function关键字后加*
function* helloGenerator () {
  console.log("进入Generator啦")
  yield 'Hello' // 2. 特征2: yield定义不同的内部状态
  yield 'World'
  return 'Ending'
}

// 调用该函数, 并不执行, 只返回的hw是一个指向内部状态的Iterator对象
const hw = helloGenerator()
console.log("hw创建好啦") // 因此这句会先执行

// 调用next方法, 内部指针从Generator函数头部开始执行, 直到遇到第一个yield表达式停止
// 返回一个包含value和done的对象, value是当前yield表达式的值, done表示遍历是否结束
console.log(hw.next())
// 调用next方法, 内部指针从上一次停止的地方开始执行....同理
console.log(hw.next())
console.log(hw.next())
console.log(hw.next()) // 最后返回的是return语句的值, 且done为true(因为return只是返回, 该表达式不算作可遍历的状态); 如果没有return语句, 则value为undefined

// 换言之, Generator时分段执行的, yield表达式是暂停执行的标记, next恢复执行
// 注意 yield后面的表达式, 只有内部指针移动到那里的时候才会被计算执行


/**
 * Generator如果不用yield表达式, 将变成一个单纯的暂缓执行函数
 */
function* fn () {
  console.log("fn执行啦")
}

var fnG = fn()
setTimeout(function () {
  fnG.next()
}, 1000)


/**
 * yield表达式嵌套情况
 * 1. yield如果在另一个表达式里面, 必须放在圆括号里
 * 2. yield表达式用作函数参数或放在赋值表达式的右边, 可以不加括号
 */

function forTest (a) {
  console.log("forTest:", a)
}

function* test1 () {
  console.log('Hello' + (yield)) // 1. 这不加括号的话 SyntaxError

  forTest(yield 'a') // 2. 可以
  let a = yield // 2. 也可以
}

/**
 * 原型方法 - 都是让Generator函数恢复执行
 */

// 1. next(arg) 返回当前yield表达式的值, 同时将yield表达式替换成arg参数, 如果没有传参, 默认undefined
function* test2 (x, y) {
  let result = yield x + y
  console.log("test2: result is ", result)
  return result
}

const test2G = test2(1, 2)
console.log("test2 1", test2G.next())
console.log("test2 2", test2G.next(1)) // 相等于返回{value:x+y, done:false}, 并执行let result = yield 1
// 这里不传参的话, 返回undefined

// 2. throw(new Error()) 将yield表达式替换成throw语句
function* test3 (x, y) {
  let result = yield x + y
  console.log("test3: result is ", result)
  return result
}

const test3G = test3(1, 2)
// console.log("test3 1", test3G.throw(new Error("出错啦"))) // 这里如果报错, 后面都没法执行
// 相等于执行let result = throw(new Error("出错啦"))
// 这里不传参的话, 报错 Uncatch undefined

// 3. return(arg) 将yield表达式替换成return语句
function* test4 (x, y) {
  console.log("hhhh")
  let result = yield x + y
  console.log("test4: result is ", result)
  return result
}

const test4G = test4(1, 2)
console.log("test4 1", test4G.return(444))
// 相等于执行let result = return 444
// 这里不传参的话, let result = return undefined


// Generator对象的判断方法
function isGenerator (obj) {
  return obj && typeof obj.next === 'function' && typeof obj.throw === 'function'
}

console.log(isGenerator(test4G))

// Generator函数的判断方法
// 利用构造器constructor的名字来判断, 判断name和displayname是为了兼容性
// 递归判断constructor的原型是因为有自定义迭代器的存在
function isGeneratorFunction (obj) {
  var constructor = obj.constructor
  if (!constructor) return false
  if (constructor.name === 'GeneratorFunction' || constructor.displayName === 'GeneratorFunction') {
    return true
  }
  return isGenerator(constructor.prototype)
}

console.log(test4.prototype)
console.log(isGeneratorFunction(test4))