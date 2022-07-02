function test(){
    // 尽量不要这么写
    var a = b = 1; // 实际上a是局部变量,而b是挂在window中的
    console.log(a,b);
}
test();
// console.log(a); // 会报错 a undefined
console.log(b);

/**
 * 函数字面量
 */
var functionTest = function test1(){
    console.log("Test function name");
} // 在赋值时自动忽略test1的名字

functionTest();
// test1(); // 会报错, 该函数名在外部不可见
console.log(functionTest.name);

// 匿名函数表达式
var functionTest2 = function(){
    console.log("Test function name");
}

/**
 * 形参和实参的数量可以不相等,不会报错
 * 形参: 通过函数名.length查看形参个数
 * 实参: 函数内可通过arguments查看传入的实参,arguments实质上是一个数组
 */
function test3(a, b, c){ // a,b,c - 形参
    console.log("实参个数 ", arguments.length);
    console.log("形参个数 ", test3.length);
    console.log(a, b, c);
}
test3(1,2); // 1,2 - 实参 // 不会报错, 1 2 undefined
test3(1,2,3,4);