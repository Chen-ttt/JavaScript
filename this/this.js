/**
 * this
 *  A - 全局
 *  B - function作为函数被调用 - 普通函数
 *                           - 构造函数
 *  C - function 作为方法被调用
 *    - 嵌套function 作为函数被调用 - 三个解决方案
 * 
 *  D - call/apply/bind
 *  E - 箭头函数
 *  
 */

// A. 全局中, this指向window
// B. 作为函数被调用
//  B1. 严格模式下, this为undefined
//  B2. 非严格模式下, this指向根据函数不同而改变
//    B2-1. 在普通函数(非构造函数)内部
function test(){
    this.a = 3; // 即window.a = 3; 即a = 3;
}

test();
console.log("验证全局是否能取到a", a);
console.log("验证全局是否能取到a", this.a);
console.log("验证全局是否能取到a", window.a);

//    B2-2. 在构造函数内部
/**
 * 1. 预编译时, 构造函数和普通函数没有区别(是真正到用new关键字调用构造函数的那一刻,该构造函数才区别于其他函数), 因此此时AO和其他普通函数的AO创建过程一样, this指向window
 * AO = {
 *   this: window,
 *   arguments: []
 * }
 * 
 * GO = {
 *    Test: function {...},
 *    test : undefined
 * }
 * 
 * 2. 执行函数: 此时用new关键字调用构造函数, 在执行期间隐式给this及this.__proto__赋值
 * AO = {
 *   this: {
 *       name: '123',
 *       __proto__: Test.prototype
 *    }
 * }
 * 
 * GO = {
 *    Test: function {...},
 *    test : {
 *       name: '123',
 *       __proto__: Test.prototype
 *    }
 * }
 */
function Test(){
    this.name = '123';
}
var test = new Test();


// C. 作为方法被调用 - this指向调用该函数的对象
var obj = {
    b: function(){
        console.log("作为方法被调用时 this为", this);
    },
    c: 'hello'
}
obj.b(); // b作为方法被obj调用

// C*. 嵌套函数中的this
// 需要特别注意的是, 在嵌套函数中, 当在外层函数里调用内层函数时, 内层函数仍是作为函数被调用的, 因此this指向window
var obj1 = {
    b: function(){
        var bb = function(){
            console.log("作为函数被调用时 this为", this);
        }
        bb();
    },
    c: 'hello'
}
obj1.b();

// 如何解决?
// 定义变量来保存this
var obj2 = {
    b: function(){
        var that = this;
        var bbb = function(){
            console.log("解决方案1", that);
        }
        bbb();
    },
    c: '1'
}
obj2.b();

// 使用call/apply/bind调用内层函数, 改变this指向
var obj3 = {
    b: function(){
        var bbbb = function(){
            console.log("解决方案2", this);
        };
        bbbb.apply(this);
    },
    c: '2'
}
obj3.b();

// 使用箭头函数, 直接继承上层作用域中的this
var obj4 = {
    b: function(){
        var bbbbb = () => {
            console.log("解决方案3", this);
        };
        bbbbb();
    },
    c: '3'
}
obj4.b();

// D. call/apply/bind, 见callApplyBind.js

// E. 箭头函数中的this, 见arrowFunction.js
