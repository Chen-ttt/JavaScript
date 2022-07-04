/**
 * 预编译
 * 1. 语法分析 - 先检查通篇的语法错误,若存在低级语法错误,则不编译执行
 * 2. 预编译(全局预编译) - 包括变量声明提前 & 函数声明提前
 * 3. 解释执行 - 解释一行, 执行一行
 *              当执行到函数调用那一行时,先进行函数预编译,再往下执行
 */

/**
 * 变量声明提前 - 只提升声明
 * 若变量不声明, 则console会报错
 * 若变量声明, 则无论是否赋值, 都输出undefined
 * 因此对于变量, 预编译过程只会提升该变量的声明语句, 而不提升赋值语句
 */
console.log("noValue:", noValue, "hasValue:", hasValue);
var noValue;
var hasValue = 10;
// 1. 声明变量hasValue - 提升
// 2. 将10赋值给hasValue - 不提升
console.log("After assignment, hasValue:", hasValue);

/**
 * 函数声明提前 - 提升整个函数代码
 */
test();
function test(){
    console.log("test函数被提升啦!");
}

/**
 * Imply global 暗示全局变量
 * 1. 无论声明再赋值,还是直接赋值,变量都是存在window对象中的
 * 2. window是全局域,一切全局变量都属于window
 * Eg:
 * window = {
 *      a: 1,
 *      b: 2,
 * }
 */

var b = 2; // 函数体外声明的变量, 是全局变量
a = 1; // 无论函数体外或函数体内,未声明 直接赋值的变量,将会被提升到全局,是暗示全局变量;属于window

function fn(){
    var c = 3; // 局部变量
    d = 4; // 被提升到全局,是暗示全局变量

    var e = f = 5; // 该例子之后有更详细的解释
    // 1. 定义了一个变量e
    // 2. 将5赋值给f
    // 3. 将f的变量值赋值给e
    // 因此e是局部变量,f被提升到全局,是暗示全局变量
}

// 访问全局变量时, window.a = a, 两种表达没有区别
console.log("Variables in window: a:", window.a, "b:", window.b);

fn(); // 若不执行函数,则不会进行函数预编译,d就不会提升为全局变量
console.log("Variables in window: c:", window.c, "d:", window.d, "e:", window.e, "f:", window.f);
// 直接访问不存在的变量c e将报错, 而使用window.c访问对象不存在的某个属性, 不会报错, 输出undefined
// console.log(c, e);

/**
 * 函数预编译
 *  1. 创建AO对象
 *      (Activation Object, 活跃对象, 即函数上下文)
 *  2. 寻找形参和变量声明, 存进AO属性, 值为undefined(即变量声明的提升)
 *      Eg. AO = {
 *            a: undefined,
 *            b: undefined
 *          }
 *  3. 将实参的参数值赋值给形参
 *      Eg. AO = {
 *            a: 2,
 *            b: undefined
 *          }
 *  4. 在函数体里找函数声明, 值为函数体(b的值不会改变,因为这一步只找函数声明语句,var b = funciton属于赋值语句)
 *      Eg. AO = {
 *            a: function a(){},
 *            b: undefined,
 *            d: function d(){}
 *          }
 * 函数执行(只看赋值, 不需要再看函数声明, 即预编译做过的事情不要做)
 *      Eg. AO = {
 *            a: 1,
 *            b: function(){},
 *            d: 3
 *          }
 */
function testLocalCompile(a1){
    console.log(a);

    var a = 1;
    console.log("a:", a);

    function a(){};
    console.log("a:", a);

    var b = function(){};
    console.log("b:", b);

    var d = 3;
    function d(){};
    console.log("d:", d);
}
testLocalCompile(2);

/**
 * 全局预编译
 *  1. 创建GO对象
 *      (Global Object, 全局上下文, 即window)
 *  2. 寻找全局变量
 *  3. 寻找函数声明
 * 执行
 * 
 * Eg.
 *  1.预编译:
 *     变量声明 a: undefined
 *     函数声明 a: function a(){}
 *  2.执行:
 *     赋值 a: 1
 *     打印 a
 */
var testGlobalCompile = 1;
function testGlobalCompile(){
    console.log("执行testGlobalCompile函数啦!");
}
console.log("testGlobalCompile:", testGlobalCompile);

/**
 * 预编译
 *    1. GO = {
 *          i: undefined,
 *          fn2: function fn2(){}
 *       }
 *    2. AO = {
 *          g: undefined,
 *          i: undefined
 *       }
 * 
 * 执行
 *    1. h为全局变量,存入GO,并将2赋值给h
 *       GO = {
 *          i: undefined,
 *          fn2: function fn2(){},
 *          h: 2
 *       }
 *    2. 将h的值赋值给g,先在AO中找h的值,找不到,向上找;
 *       在GO中找到h的值为1,赋值给g
 *       AO = {
 *          g: 2,
 *          i: undefined
 *       }
 *    3. 将g的值赋值给i,先在AO中找g的值,找到了,不需要向上找
 *       AO = {
 *          g: 2,
 *          i: 2
 *       }
 */
var i = 1;
function fn2(){
    var g = h = 2;
    var i = g;
    console.log("执行fn2函数啦! h:", h, "i:", i);
    // !!! 此处打印的一定是AO中i的值
    // 不管GO中i的值如何变化,只要AO中能找到变量i,都不会再向上找
}
fn2();

/**
 * 预编译
 *    1. GO = {
 *          j: undefined,
 *          fn3: function fn3(){},
 *          l: undefined
 *       }
 *    2. AO = {
 *          k: undefined, // 预编译时不管if(j)语句,也不管是否进入if代码块,只看声明!
 *       }
 * 
 * 执行
 *    1. GO = {
 *          j: undefined,
 *          fn3: function fn3(){},
 *          l: 3
 *       }
 *    2. AO = {
 *          k: undefined // 向上找到j,j为undefined,不进if,不执行赋值
 *       }
 */
function fn3(){
    if(j){
        var k = 2;
    }
    l = 3;
    console.log("执行fn3函数啦！k:", k, "l:", l);
}
var j;
fn3();

/**
 * 执行
 *    1. GO = {
 *          j: 1,
 *          fn3: function fn3(){},
 *          l: 3
 *       }
 *    2. AO = {
 *          k: 2 // 向上找到j为1,不进if,不执行赋值
 *       }
 */
j = 1;
fn3();

/**
 * 预编译
 *    1. GO = {
 *          assignment1: function assignment1(){},
 *          m: undefined
 *       }
 *    2. AO = {
 *          m = function m(){}
 *       }
 * 
 * 执行
 *    AO中找到m,直接返回
 */
function assignment1(){
    return m;
    m = 1;
    function m(){}
    var m = 2;
}
console.log(assignment1());


/**
 * 预编译
 *    1. GO = {
 *          assignment2: function assignment2(){},
 *          n: function n(){}
 *       }
 *    2. AO = {
 *          n = undefined
 *       }
 * 
 * 执行
 *    1. AO = {
 *          n = 1 // AO中找到n变量,赋值1
 *       }
 *    2. AO = {
 *          n = 2 // AO中找到n变量,赋值2
 *       }
 */
function assignment2(){
    n = 1;
    function n(){}
    var n = 2;
    return n;
}
console.log(assignment2());


o = 1;
function assignment3(p){
    function p(){};
    arguments[0] = 2;
    console.log("执行assignment3函数啦！p:", p);
    if(o){
        var q = 3;
    }
    var r;
    o = 4;
    var o;
    console.log("q:", q);
    s = 5;
    console.log(r);
    console.log(o);
}
var o;
assignment3(1);