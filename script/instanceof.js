/**
 * instanceof
 */

function Student(){}

function Car(){
    this.brand = 'Benz';
    this.price = 155;
    this.width = '2.5';
}
Car.prototype = {
    color: 'red'
}

var student = new Student();
var car = new Car();

// 只要原型链上有重合, 就会返回true
console.log(car instanceof Car);
console.log(car instanceof Object);
console.log(car instanceof Student);
console.log("[] instanceof Array", [] instanceof Array);
console.log("[] instanceof Object", [] instanceof Object);
console.log("{} instanceof Object", {} instanceof Object);

// 判断a类型的几种方法
var a = [];
// 1. 构造函数
console.log("a", a.constructor);
// 2. instanceof
console.log("instanceof", a instanceof Array);
// 3. 利用Object.prototype中的toString方法; 因为自身的toString方法会打印数组中的元素
var str = Object.prototype.toString.call(a);
console.log("toString", str);
if(str === '[object Array]') console.log("是数组");
else console.log("不是数组");