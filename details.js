/**
 * 一些重点
 */

// 1. 变量提升和函数提升的优先级
/** 结论
 * 同作用域中, 如果函数声明和var声明同名, 只提升函数声明, 忽略var声明; 但在执行阶段, 如果变量赋值早于函数调用, 则变量将覆盖函数
 */
console.log("结果1:");
console.log(f1);

var f1;
var z = 'def';
		
function f1 (){
    console.log(z);
    var z = 'abc'; 
    console.log(z);
} 
f1();

console.log(f2);
		
var f2 = 5;
var z = 'def'

function f2 (){
    console.log(z);
    var z = 'abc'; 
    console.log(z);
} 
//f2();

// 2. let和const的暂时性死区
/**
 * 在let声明之前的执行瞬间都被称为暂时性死区TDZ, 在此阶段引用的任何后面才声明的变量都会抛出ReferenceError错误
 */
console.log("结果2:");

// 情况一: let和const声明的变量的作用域将被限制在代码块内, 即块级作用域 (Note.并且这些变量在各自的作用域内也存在变量提升, 但由于暂时性死区的存在, 他们的变量提升无法体现)
// 如下, 在预编译时, 变量tmp也有类似提升的行为, 块级作用域内已存在该变量, 不会再继续去外部作用域查找, 但在该变量声明之前访问该变量, 都会报错
if(true){
    // 死区开始--------------------------
    // tmp = 1; 
    // console.log(tmp);
    // 这里必须注释掉, 否则报错ReferenceError: Cannot access 'a' before initialization
    // 死区结束--------------------------
    let tmp;
    console.log(tmp);
}

// 情况二
var tmp = 3;
if(true){
    // 死区开始--------------------------
    // tmp = 1; 
    // console.log(tmp);
    // 死区结束--------------------------
    let tmp;
    console.log(tmp);
}

// 情况三
// let a = a;
// 在变量a还没有声明完成前就访问a, 也是会报错, 是暂时性死区

// 3. 全局下声明的let和const属于全局作用域, 但不通过window属性
let t1 = 1;
const t3 = 3;
console.log("结果3", window.t1, window.t3);

// 4. for循环中的let
// 迭代变量i的作用域仅限于循环体内部的块级作用域中
// 如果使用var, 将导致迭代变量外渗透: 执行超时逻辑时, 所有的i都是同一个变量，所以输出的都是5
// 在使用let之后, JS引擎在后台会为每个迭代循环声明一个新的迭代变量; 每个定时器引用的都是不同的变量实例, 所以输出的值是12345
console.log("结果4:");
for(let i = 0;i < 5; i++){
    setTimeout(()=>{console.log(i)},0);
}
// console.log(i) // 报错ReferenceError: i is not defined

// 5. const
// const行为和let基本一致, 最大的区别是, 1.声明时必须初始化, 2. 不可以在之后修改变量值, 除非修改对象属性
// const ye; // SyntaxError: Missing initializer in const declaration
console.log("结果5:");
const msg = 'hello';
// msg = 'hi'; // TypeError: Assignment to constant variable

// 如果const变量引用的是一个对象, 那么可以修改对象内部的属性
const obj = {
    name: 'tong',
    age: 18
}
obj.gender = 'Female';
console.log(obj);


// 6. 关于undefined和null的比较
var b;
b = undefined == undefined;
console.log("undefined==undefined: ", b); // true
b = null == null;
console.log("null==null: ", b); // true
b = undefined == null;
console.log("undefined == null: ", b); // true!!! 特殊情况
b = undefined === null;
console.log("undefined === null: ", b); // false

var a;
a = null;
console.log("null convert to Number: "+typeof(Number(a)),Number(a)); // 0
a = undefined;
console.log("undefined convert to Number: "+typeof(Number(a)),Number(a)); // NaN

a = null;
console.log("parseInt(null) " + typeof(parseInt(a)) + ": " + parseInt(a)); // NaN
a = undefined;
console.log("parseInt(undefined) " + typeof(parseInt(a)) + ": " + parseInt(a)); // NaN

console.log("undefined is NaN? ", isNaN(undefined));
console.log("null is NaN? ", isNaN(null));

console.log("1 + undefined", 1 + undefined);
console.log("1 + null", 1 + null);



