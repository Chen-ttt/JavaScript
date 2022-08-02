/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-08-02 13:46:29
 * @LastEditTime: 2022-08-02 17:24:23
 * @LastEditors:  
 */
/**
 * ES6 - Class
 * 
 *   1. 声明式
 *   2. 表达式
 */

// 声明式
// 1. 类声明中的代码自动强行运行在严格模式下
// 2. 类的所有方法都定义在类的prototype中, 实例化对象调用方法, 就是在调用原型方法
class Foo {
  // 构造函数是类的默认方法, new时自动调用, 若没有定义, 则一个空的构造函数会被默认添加
  constructor(name = 'Tong') { // 设定默认值
    this.name = name
    this.sayName = this.sayName.bind(this)
  }

  sayName () {
    console.log("My name is", this.name)
  }

  sayNameAgain = () => {
    console.log("Say again. My name is", this.name)
  }
}

const foo = new Foo()
foo.sayName()

// class中的this指向实例
// 但如果 像下面这样单独将方法拿出来用, 此时脱离了实例, this指向此时的运行环境
// 且因为class中代码会在严格模式下运行, 此时this是undefined(见this.js), 会找不到变量
const { sayName, sayNameAgain } = foo
sayName()
// 解决方案1: 通过bind绑定this实例
// 解决方案2: 定义箭头函数, 继承上层作用域的this
sayNameAgain()

// 实例对象的属性 除非显式地定义在其本身(即this), 否则都是定义在类的原型中
console.log(foo)
console.log(foo.hasOwnProperty('name'))
console.log(foo.hasOwnProperty('sayName'))


// 访问器 - 拦截某些属性的读取行为
class Student {
  constructor(score) {
    this.score_ = score
  }

  // 注意这里! get函数和set函数的名字是score, 在外部调用时用score就能调用到两个函数
  // 但是类属性叫score_, 不能和函数同名, 因为同名的话, get中return自己, set中给自己赋值, 都将导致递归栈爆掉
  get score () {
    console.log("调用get函数")
    return this.score_
  }

  set score (value) {
    this.score_ = value
  }

  reportScore () {
    console.log("I'm a student. My score is", this.score_)
  }
}

let student = new Student(29)
console.log("set修改前", student.score)
student.score = 99
console.log("set修改前", student.score)

/**
 * static属性/方法
 * 类中static声明的静态属性和方法, 都是挂载在类之下的, 而不是实例对象下
 * 
 * 父类的静态属性和方法 如果要在子类中使用
 *   1. 可以被子类继承, 但不会被子类实例继承
 *   2. 可以在子类中用super调用
 * 用法见继承的后半部分
 */
class Table {
  static info = "This is a blue table"

  constructor() {
    this.size = 3
  }

  static test () {
    // 静态方法下, this指向类, 而不是实例, 因此this.size是undefined
    console.log("This is a Table!!!!!", this.size)
  }

  static staticTest () {
    console.log(this.info)
  }
}
const table = new Table()
console.log("通过实例table访问info属性:", table.info)
console.log("通过类Table访问info属性:", Table.info)
console.log("通过类Table调用静态方法test():")
Table.test()


// 类名访问不了实例方法, 会报错
// console.log("通过类Table访问实例方法test():", Table.test())


/**
 * 继承
 * 
 * 1. super作为函数
 * 2. super作为对象
 *    2a. super在普通函数中作为对象
 *    2b. super在静态方法中作为对象
 */
class Baby extends Student {
  constructor() {
    super() // 子类必须调用super方法后才能得到this指向, 其中有继承的属性和方法
    this.age = 1 // 然后再添加自己的东西, 否则报错

    // 1. super作为函数被调用, 就是父类的构造函数, 但返回的并不是指向父类的this, 仍是指向baby实例的
    // 相当于 Student.prototype.constructor.call(this)
  }

  lookSuper = () => {
    // 2a-1. super在普通函数里指向父类的原型对象
    // 通过super调用父类方法时, super内部的this仍指向子类实例, 因此输出的各种值都是从实例对象中找到的, 找不到就是undefined
    // 在父类方法中修改子类实例的值也是可行的
    super.reportScore()
  }

  testSuper = () => {
    // 2a-2. 通过super给子类实例赋值时, super就是this
    super.e = 20 // super就是this, 给this加上了e属性
    console.log(super.e) // super指向父类的原型, undefined
    console.log(this.e) // 20
  }
}

const baby = new Baby()
baby.lookSuper()
baby.testSuper()


class Subtable extends Table {
  static info = "This is a subtable!!!!!"

  static catchTable () {
    // 2b-1. super指向父类, 而不是父类的原型对象
    console.log(super.info)
    // console.log(super.test()) test是无法调用的, 因为此时的super是父类而不是父类原型, 因此只能调用类下挂载的静态方法

    // 2b-2. 通过super调用父类的方法时, 方法内部的this指向子类, 而不是子类的实例对象, 因此打印静态属性可以成功
    super.staticTest()

    // 通过this调用也可以, 因为在static方法中this指向当前类, 而子类继承了父类的静态方法
    this.staticTest()
  }
}

Subtable.catchTable()
const subtable = new Subtable()
// subtable.staticTest()
// 这里会报错, 父类的静态属性和方法不会被子类实例继承, 只会被子类继承, 因此只能用类来调用


// 如何判断一个子类的父类是什么
console.log(Object.getPrototypeOf(Baby) === Student)


console.log(Table.prototype)
console.log(Subtable.prototype)