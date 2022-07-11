/**
 * 原型链
 */

// 继承
Professor.prototype.topSkill = 'JAVA';
function Professor(){};
var professor = new Professor();

Teacher.prototype = professor;
function Teacher(){
    this.goodSkill = 'JS',
    this.success = {
        tencent: 10,
        baidu: 20
    }
}
var teacher = new Teacher();

Student.prototype = teacher;
function Student(){
    this.basicSkill = 'HTML'
}
var student = new Student();

// 原型链的终点 - Object.prototype!!! - Object.prototype里面再也没有proto了
// !!!特例 - Object.create(null)返回的新对象没有原型
console.log(student);
console.log("空对象", Object.create(null));
/**
 * !!!注意
 * 1. Object.prototype底下保存了一个toString方法
 * 2. 在浏览器的控制台中, __proto__字样如果是浅色, 表示它是Object.prototype, 到头了; 其他原型的键__proto__都是深色
 */

// 以下两句完全一样, 原型直接就是终点 - Object.prototype
// var obj = {}
// var obj = new Object();

/**
 * 子类是否可以修改父类属性? - 可以, 但不建议
 * 
 * 1. 原始值属性
 *    不会修改父类的goodSkill, 而是给自己这个实例添加了goodSkill属性
 *    原因: 打印或取值语句中,  发现该实例没有对应的属性, 将到父类中寻找; 而赋值语句中, 发现该实例没有对应的属性, 直接添加属性
 * 
 * 2. 引用值属性
 *    将修改父类success中的tencent数值, 本实例没有变化
 */
student.goodSkill = 'CSS';
console.log("修改原始值属性", student);

student.success.tencent = 30;
console.log("修改引用值属性", student);


/**
 * Object.create(对象/null) - 创建对象
 * 调用该函数则必须传参, 可传入对象或null, 该对象参数会成为新创建出的对象的prototype
 * 
 * 好处:
 *     可以自定义原型, 让别的实例来成为自己的原型, 实现继承
 */
function Obj(){};
Obj.prototype.num = 1;
var obj1 = Object.create(Obj.prototype);
var obj2 = new Obj();
console.log("通过Object.create和自定义构造函数原型创建对象", obj1); // 这俩一模一样
console.log("通过自定义构造函数创建对象", obj2);

var testProto = {
    num: 2
};
var obj3 = Object.create(testProto);
console.log("通过Object.create创建对象", obj3); // 这个不一样

// !!!特例 - Object.create(null)返回的新对象没有原型
var nullObj = Object.create(null);
// 可以手动添吗?
nullObj.prototype= {
    num: 1
};
console.log("给空对象添加原型", nullObj);
console.log("给空对象添加原型", nullObj.num);

// 结果undefined
// 原因: prototype作为键值被添加; 而原型不能手动添加; 可以更改, 不能自造

/**
 * undefined和null可以使用toString()吗?
 * 
 * 不可以, 它俩没有这个方法, 都会报错
 *      1.不能变成包装类, 继承不了toString()
 *      2.没有原型, 没有Object.prototype, 没有toString
 */
// console.log(undefined.toString());
// console.log(null.toString());
// 复习
var num = 1;
console.log("包装类的tostring", num.toString());
console.log("原型上继承来的toString", obj1.toString());

// 笔试题
document.write(num); // document.write有隐式的类型转换, 会调用参数的toString方法
document.write(obj1);
document.write(nullObj); // 因此这行将报错

// 可以重写原型链上的方法