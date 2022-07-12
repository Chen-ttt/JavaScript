/**
 * 模块化开发
 * 
 * 复习:
 *  闭包的几种实现:
 *  1. inner函数实现, return inner function
 *  2. 对象实现, obj = {add:..., mul:...}, return obj
 *  3. 构造函数实现, function Compute(){this.add=function{...}; this.mul=function{...}}, 该构造函数会隐式地return this; 最后实例化对象并调用其中的函数成员
 */

// 将interit.js中的圣杯模式封装成闭包
Teacher.prototype = {
    job: 'Math'
};
function Teacher(name, mSkill){
    this.name = name;
    this.mSkill = mSkill;
}

function Student(name, mSkill, age, major){
    this.age = age;
    this.major = major;
}

var inherit = (function(){
    var Buffer = function(){};
    return function(Target, Origin){
        Buffer.prototype = Origin.prototype;
        Target.prototype = new Buffer();
        Target.prototype.constructor = Target;
        Target.prototype.super_class = Origin;
    };
})();

inherit(Student, Teacher);
var student = new Student('Tong', 'JS', 18, 'CS');
Student.prototype.hobby = 'Sing';
console.log(student);

// 以上方法是模块化开发的一种形式
// 防止全局环境的污染, 利于后期维护和二次开发

// 为什么要模块化开发?
// 多人协同开发时, 可能会在同一个js文件中写代码, 为了防止变量污染全局环境, 最好进行模块化, 这样可以创造一个伪全局, 将自己部分的所有代码逻辑都写到自己的模块里
// 使用立即执行函数, 但将函数抛出, 抛给一个变量, 让其等待被调用
var initProgrammer = (function(){
    var Programmer = function(){};
    Programmer.prototype = {
        name: 'mm',
        say: function(){
            console.log("我是一名", this.type, ".我擅长的语言是", this.lan);
        }
    };

    function FrontEnd(){}
    function BackEnd(){}

    inherit(FrontEnd, Programmer);
    inherit(BackEnd, Programmer);

    FrontEnd.prototype.lan = 'HTML';
    FrontEnd.prototype.type = '前端程序员';
    BackEnd.prototype.lan = 'C++';
    BackEnd.prototype.type = '后端程序员';

    return { // 本质上返回的是包含构造函数的对象
        FrontEnd: FrontEnd,
        BackEnd: BackEnd
    }

})();

var fPro = new initProgrammer.FrontEnd();
var bPro = new initProgrammer.BackEnd();
fPro.say();
bPro.say();
