/**
 * function
 * 1. 若函数内没有写返回,js默认在最后加上return;
 * 2. 在函数外, 对函数内部声明的局部变量或形参进行操作, 将报错; 只能通过return 变量; 将变量传回.
 */

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
 * Tips: 1. 可以利用arguments和for循环做实参的累加,累乘
 *       2. 尝试给为传入实参的形参赋值或打印,不会报错,会显示undefined
 *       3. 形参储存在stack内存中,实参数组arguments储存在heap内存中.两* 者之间存在映射关系,因此当给形参a赋值时,arguments[0]的值也会相应改变;而* 给c赋值时,若arguments[2]没有相应的实参传入,则赋值无法完成,但不会报错
 */
function test3(a, b, c){ // a,b,c - 形参
    console.log("实参个数 ", arguments.length);
    console.log("形参个数 ", test3.length);
    console.log(a, b, c);
}
test3(1,2); // 1,2 - 实参
test3(1,2,3,4);


/**
 * 嵌套函数
 * 函数内可以输出/修改全局变量的值
 * 函数外不可以输出/修改局部变量,不可以调用inner函数
 */
function testOuter(){
    var outer = 0;
    global++;
    console.log("Outer can change outer and global:", outer, global);

    function testInner(){
        var inner = 9;
        outer = 1;
        global++;
        console.log("Inner can change outer and global:", outer, global);
    }
    testInner();
    // 输出inner会报错
    console.log("Outer can not see inner.");
}
var global = 0;
testOuter();
// testInner(); // 调用inner函数会报错
// console.log(outer); // 输出局部变量会报错
console.log("After run, global is ", global);
