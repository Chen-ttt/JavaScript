/**
 * 对象&实例化
 */

// 对象字面量
var student = {
    name: 'Anna',
    age: 18,
    score: 60,
    study: function(){
        // this指对象本身;即student.score
        this.score += 10;
        console.log('Studying...Score:', this.score);
    },
    play: function(){
        console.log("Playing...");
    }
};

// 系统自带的构造函数
var people = new Object();
people.name = 'Mary';
people.age = 20;

student.study();
student.study();

// 增
student.weight = 55;
console.log("Add weight:", student);

// 删
delete student.play;
console.log("Delete play:", student);

// 改
student.age = 88;
console.log("Change age:", student);

// 查
console.log("View:", student.study);


/**
 * 自定义构造函数
 *   命名: 大驼峰
 */
function Student(name, age){
    this.name = name;
    this.age = age;
    this.study = function(){
        console.log("St udy...");
    }
}
var mary = new Student('Mary', 19);
var ken = new Student('Ken', 34);
console.log("Mary 对象", mary);
console.log("Ken 对象", ken);

/**
 * 1. 调用构造函数 People('Tong', 18)
 *      此时函数被执行,AO产生
 * 
 * 2. new向JS表示这是实例化对象的操作,程序自动先在AO中保存一个this对象;
 * AO = {
 *    this: {}
 * }
 * 
 * 3. 执行到赋值语句,将属性写入this
 * AO = {
 *    this: {
 *      name: name,
 *      age: age
 *    }
 * }
 * 
 * 4. 将实例化出的对象返回给me变量,me变量被写入GO
 * GO = {
 *    People: function...,
 *    me: {
 *      name: name,
 *      age: age
 *    }
 * }
 */
function People1(name, age){
    // this = {}; // 隐式添加这句
    this.name = name;
    this.age = age;
    // return this; // 隐式添加这句
}
var me = new People1('Tong', 18);
console.log("例子1 Tong:", me);

function People2(name, age){
    this.name = name;
    this.age = age;
    return '123';
}
me = new People2('Tong', 18);
console.log("例子2 返回'123'", me);

function People3(name, age){
    this.name = name;
    this.age = age;
    return {};
}
me = new People3('Tong', 18);
console.log("例子3 返回空对象", me);
/**
 * 构造函数中,默认返回的是this
 * 人为修改成返回原始数据类型,不起作用
 * 改成引用类型,可成功返回(Eg.function [] {})
 */