/**
 * call & apply & bind
 * 三种方法都继承自Function.prototype
 *   
 * 作用: 1. 修改this指向
 *      2. 设置函数体内this对象的值，以扩充函数赖以运行的作用域
 *      3. 让一个对象去借用另一个对象的方法或属性, 为己所用
 *         如果应用在构造函数之间, 可以解决原型链问题 - 继承父类属性或方法
 */

// cal和apply 唯一不同 - 接受参数的方式不一样
function add(c,d){
    return this.a + this.b + c + d;
}

var s = {a:1, b:2};
console.log(add.call(s,3,4)); // 1+2+3+4 = 10
console.log(add.apply(s,[5,6])); // 1+2+5+6 = 14


// 解决原型链问题 - 继承父类属性或方法
Teacher.prototype = {
    job: 'Math'
};
function Teacher(name, mSkill){
    this.name = name;
    this.mSkill = mSkill;
}

function Student(name, mSkill, age, major){
    // 此时Teacher()执行的过程中, this不再指向调用它的实例对象, 而是第一个传入的参数this(即当前这个student实例对象)
    Teacher.apply(this, [name, mSkill]);
    this.age = age;
    this.major = major;
}

var student = new Student('Tong', 'JS', 18, 'CS');
console.log("使用bind函数效果", student);

// bind和其他两个函数的区别
// call和apply执行时, 原函数被立即调用一次
// 但bind不会调用原函数, 且在改变完this指向后返回一个新的函数
var obj = {
    name: 'tong'
}
function fn(){
    console.log("使用bind函数效果", this.name);
}
var fn1 = fn.bind(obj);
fn1();