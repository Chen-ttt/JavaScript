/**
 * callee & caller
 */

// callee
function test(a, b, c){
    // callee返回当前arguments对应的函数的引用
    // 即 返回当前执行的函数
    console.log("callee\n", arguments.callee);
    // arguments.callee.length等于test.length
    // 返回形参个数
    console.log("callee.length\n", arguments.callee.length);
}
test(1, 3, 4);

// 强大的用处!!!
// 在立即执行函数中做递归时, 没有函数名则无法实现递归调用, 这时可以使用callee, 直接找到整个函数体再调用该函数体
// 例子: 累加器
var sum = (function(n){
    if(n <= 1) return 1;
    return n + arguments.callee(n - 1);
})(3);
console.log("累加器结果", sum);

// caller - 返回对当前函数的引用者/调用者

// !!! 下面这句必须注释掉; arguments caller callee不能再strict模式下使用
// 'user strict '
function test1(){
    test2();
}
function test2(){
    console.log(test2.caller); // test1是调用者
}
test1();
