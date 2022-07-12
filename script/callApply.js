/**
 * call & apply
 * 每个函数都包含两个非继承而来的方法: call()和apply()
 *   作用: 修改this指向
 *        设置函数体内this对象的值，以扩充函数赖以运行的作用域
 */

// 唯一不同 - 接受参数的方式不一样
function add(c,d){
    return this.a + this.b + c + d;
}

var s = {a:1, b:2};
console.log(add.call(s,3,4)); // 1+2+3+4 = 10
console.log(add.apply(s,[5,6])); // 1+2+5+6 = 14

// 解决原型链问题 - 继承父类属性
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
console.log(student);