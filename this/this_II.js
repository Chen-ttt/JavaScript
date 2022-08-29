/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-08-23 20:13:40
 * @LastEditTime: 2022-08-29 01:07:29
 * @LastEditors:  
 */
/**
 * this指向
 */

// 1. 箭头函数 - 箭头函数的this在创建时就已经确定, 指向外层this, 且不会被改变

// 2. new - 使用new关键字调用构造函数, 函数中的this指向JS新创建的对象
// 且箭头函数不能当作构造函数, 否则报错

// 3. bind
// a. bind不会修改箭头函数中的this
let f3a = () => {
  console.log("f3a", this)
}

f3a.bind(1)()

// b. 多次bind只改变第一次bind的值
function f3b () {
  console.log("f3b", this)
}

f3b.bind(1).bind(2)()

// c. bind不改变构造函数的this(apply&call也不行)
function F3c () {
  this.a = "p"
  console.log("f3c", this)
}

let f3c = F3c.bind(1)
new f3c()

// 4. apply & call
// a. apply 和 call不会改变箭头函数的this
let f4a = () => {
  console.log("f4a", this)
}

f4a.apply(1)

// b. bind函数之后, apply和call也不能修改this（同3b）
function f4b () {
  console.log("f4b", this)
}

let f = f4b.bind(1)
f.apply(2)

// c. apple & call也不能改变构造函数的this


// 5. 函数作为对象的属性方法被调用
// a. 指向对象
function f5a () {
  console.log("f5a", this, this.x)
}

let obj = { x: 1 }
obj.func = f5a
obj.func()

// b. 如果该函数是箭头函数, 则this不被改变, 指向上层作用域的this -> window
obj.func2 = () => {
  console.log("f5b", this, this.x)
}
obj.func2()

// 6. function定义的函数作为函数被直接调用 - 指向全局对象, 浏览器环境中是指向window, Nodejs环境中指向Global
function f6a () {
  console.log("f6a", this)
}
f6a()

function f6b () {
  console.log("f6b", this.x)

  function f6c () {
    console.log("f6c", this.x) // function定义, 非箭头函数, 作为函数被调用, 指向window
  }

  f6c()
}
f6b.bind({ x: 1 })()

// 7. 不在函数内
// a. <script />标签中, this指向window
// b. Node.js的模块文件中, this指向Module的默认导出对象, 也就是module.exports

// 8. 严格模式 & 非严格模式
// 在ES5规范之前, 没有严格模式, 规定this如果得出null或undefined, 则一律指向全局对象, 以上1-7都是这样
// 在严格模式下, 如果找到了this的值, 就可以输出, 如果值为null或undefined, this不会被转换, 将输出null或undefined
function f8 () {
  "use strict" // 要让全局都严格模式, 就写在所有代码的第一行
  console.log("f8", this)

    ; (() => {
      console.log("arrow f8", this)
    })()
}

f8()
f8.bind(0)()
f8.bind(null)()
f8.bind(undefined)()
f8.bind().bind(2)()
f8.apply()

// 需要注意, 箭头函数就算使用严格模式也是window, 因为严格模式只使那些本来就找不到值的this转换为全局对象
// 而这里的箭头函数指向了上层的this, 已经找到了全局变量window的值
let f8b = () => {
  "use strict"
  console.log("f8b", this)
}

f8b()


// test 1
function func (num) {
  this.count++
}

func.count = 0
func(1)
console.log("func.count", func.count, "this.count", this.count)
// 函数内改的是this里count的值(即window里count的值), undefined++ 结果为NaN
// 函数外为func添加一个count属性(因为function是object, 可以添加), 因此和window.count没关系

// test 2
var length = 10
function fn () {
  console.log(this.length)
}

const objTest = {
  length: 5,
  method: function (fn) {
    fn()
    arguments[0]()
  }
}

objTest.method(fn, 1)

// 注意, arguments是传入的实参列表, arguments[0]可以看成arguments.0(), 因此this指向arguments, this.length即为实参列表的长度

// 且, 如果改为const length = 10或改成let, 则const/let变量不会被挂载到window, 第一次fn()将输出window.length, 输出0
// 且, 如果在Nodejs下运行, 变量不会绑定到global上, 将输出undefined 2


