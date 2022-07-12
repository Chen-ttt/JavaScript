// JS笔试题

// 1.
var a = {},
    b = {key: 'b'},
    c = {key: 'c'};

a[b] = 123;
a[c] = 456;
console.log("第一题", a[b]);

// 2.
var name = "world";
;(function (){
    // console.log(name);
    if(typeof name === 'undefined'){
        var name = 'J';
        console.log(name);
    } else {
        console.log("hello");
    }
})();

// 3. 如何给string加一个方法
var s = new String("hhh");
s.__proto__.add = function(){
    s += "p";
}
console.log(s.__proto__);
s.add();
console.log(s);

// 4.
function foo(){
    bar.apply(null, arguments);
}
function bar(){
    console.log(arguments);
}
foo(1, 2, 3);

// 5. 
// JS的typeof可能返回的值有哪些?
// object/function/ boolean/number/string/undefined
// !!! typeof(null) - object

// 6.
function test(x, y, a){
    a = 10;
    console.log("第六题", a);
}
test(1, 2, 3);

// 注. 形参实参一一对应

// 7. 
var f = (
    function f(){
        return 1;
    },
    function g(){
        return '2';
    }
);
console.log("第七题", typeof(f));

// 注. 考察,运算

// 8. 
var f = (
    function f(){
        return 1;
    },
    function g(){
        return '2';
    }
)();
console.log("第八题", typeof(f));

// 注. 考察,运算和立即执行函数

// 9. 
console.log("第九题:");
console.log(undefined == null); 
console.log(undefined === null); 
console.log(isNaN('100')); 
console.log(parseInt('1a') == 1);
console.log(NaN == NaN);

// 注. 1是特殊情况; isNaN('100')先将string转为数字100, 不是NaN; parseInt遇到非数字符开头则直接返回NaN, 遇到数字开头则读到非数为止, 转换前面是数字的那一部分, 因此parseInt('1a')返回1; NaN不等于任何东西, 因此比较NaN时需要转成字符串再比较

// 10.
console.log("第十题", {} == {});

// 注. 引用值对比的是地址, 这是两个对象, 地址一定不同
// 如何能相等呢? 两变量储存的是同一个地址就行
var obj = {};
var obj1 = obj;
console.log(obj == obj1);

// 11. 
console.log("第十一题:");
var a = '1';
function test11(){
    var a = '2';
    this.a = '3';
    console.log(a);
}
test11();
new test11();
console.log(a);

// 12.
console.log("第十二题:");
var a = 5;
function test12(){
    a = 0;
    console.log(a);
    console.log(this.a);
    var a;
    console.log(a);
}
test12();
new test12();
