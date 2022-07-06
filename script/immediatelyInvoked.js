/**
 * IIFE - Immediatelt-invoked function expression
 * 立即执行函数
 *   1. 自动执行
 *   2. 执行完成后立即销毁
 */

// 写法1
(function(){})(); // (function(形参){代码块})(实参,调用);
// 写法2 - W3C规范
(function(){}()); // (function(形参){代码块}(实参,调用));

/**
 * 什么情况下 可以实现立即调用函数?
 *   1. 使用() 实现立即调用
 *   2. 只有在表达式后面才可以加()
 * 
 * 总结: 只有将函数变为表达式,才可以成为立即调用函数
 */

// 1.()括号括起来的部分不管是什么,都会变成表达式,因此该匿名函数也是表达式,加()之后立即执行
(function(){
    console.log("例子1成功啦~");
})();
// 2.使用变量来接收匿名函数,也是表达式,加()之后立即执行
var test = function(){
    console.log("例子2成功啦~");
}();
// 3.结合+-&&||等将函数转换为表达式
1 && function(){
    console.log("例子3成功啦~");
}();

// 不管是使用以上方法的哪一种,都是将函数变成表达式,此时函数的名称会被自动忽略,不管写没写函数名都是一样是匿名函数
// 如例子3,test3函数名被忽略,函数立即执行并自动销毁
(function test4(){
    console.log("例子4成功啦~");
})();
console.log("在全局没有找到例子4...", typeof(test4));

// return
var num = (function(a, b){
    return a+b;
}(2, 3));
console.log("例子5返回成功啦~", num);

// 面试题1
function test6(a){
    console.log("例子6成功啦~");
}(6);
// 不会报错,但也不会执行test6函数
// 因为该函数不是表达式,因此(6)不会让函数执行,但JS内部会将(6)看作一个单独的表达式,以以下方式解析
/**
 * function test6(a){
 *   console.log("例子6成功啦~");
 * }
 * (6);
 */

// 但如果不传实参,JS不会将()看作表达式,属于语法错误,将报错
/**
 * function test6(a){
 *   console.log("例子6成功啦~");
 * }
 * (); // 这是不允许的!!!
 */

function test7(a, b){
    console.log("例子6成功啦~");
}(5, 6);
// 传两个参数也不会报错,因为(5, 6)也是一个表达式,逗号是一种运算,返回最后一个变量,如:
console.log(",运算:", (5,6));

// 面试题2
/**
 * 解释为什么输出10个10
 *   进入循环之后,每次循环给arr的第i项赋值一个打印变量i的函数;
 *   当给10个项都赋值完成后,i的值变为10,不满足for循环条件,退出循环;
 *   此时将包含数个匿名函数的数组arr返回,形成闭包;每个函数的作用域链上都有test8的AO;
 *   因此在第二个j的循环中,逐个调用数组中的函数时,每个函数都会在test8的AO中寻找变量i,此时它们取得的i的值均为10.
 */
function test8(){
    var arr = [];
    for(var i=0; i<10; i++){
        arr[i] = function(){
            console.log("例子8, 当前函数:", i);
        }
    }
    return arr;
}
var myArr = test8();
for(var j=0; j<10; j++){
    myArr[j]();
}

// 将函数改成输出0-9
function test9(){
    var arr = [];
    for(var i=0; i<10; i++){
        (function(k){
            arr[k] = function(){
                console.log("例子9, 当前函数:", k);
            }
        })(i);
    }
    return arr;
}
var myArr = test9();
for(var j=0; j<10; j++){
    myArr[j]();
}
// 用立即执行函数将arr[k] = function()包裹起来,这样每一轮循环都立即执行这个表达式,分别将0-9传入每个函数;而不是等执行的时候再去AO中寻找i的值

// 面试题3
// 网页中点击数字并打印
var oli = document.querySelectorAll('li');
for(var i=0; i<oli.length; i++){
    (function(k){
        oli[k].onclick = function(){
            console.log(k);
        }
    })(i);
}

// 面试题4
var fn = (
    function test10(){
        return 1;
    },
    function test11(){
        return '2';
    }
)();
console.log("例子11:", typeof(fn));

// 面试题5
var a = 10;
if(function test12(){}){
    a += typeof(test12);
}
console.log("例子12:", a);
// if判断中是函数声明,判断为true,进入if
// (function test12(){})是表达式,忽略函数名,本质是匿名函数
// 因此typeof(test12)返回‘undefined’
// 10 + 'undefined' = '10undefined'

// 累加器 - 闭包函数每次加一
function test13(){
    var i = 0;
    function test14(){
        i++;
        console.log(i);
    }
    return test14;
}
var re = test13();
for(var i=0; i<5; i++){
    re();
}

/**
 * 缓存器
 *   一个班级,学生名字保存在一个数组里
 *   两个方法写在函数中的一个对象中,加入/离开班级,每次加入/离开都需要打印新的学生名单
 */
function test15(){
    var student = [];
    var operation = {
        add: function(name){
            student[student.length] = name;
            console.log("加入学生", name);
            console.log(student);
        },
        leave: function(name){
            student.splice(student.indexOf(name), 1);
            console.log("学生离开", name);
            console.log(student);
        }
    };
    return operation;
}
var op = test15();
op.add('Anna');
op.add('Bob');
op.leave('Bob');
