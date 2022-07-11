/**
 * call & apply
 * 每个函数都包含两个非继承而来的方法: call()和apply()
 *   作用: 修改this指向
 *        设置函数体内this对象的值，以扩充函数赖以运行的作用域
 */

// 唯一不同 - 接受参数的方式不一样
function add(c,d){
    return this.a + this.b + c + d;
}

var s = {a:1, b:2};
console.log(add.call(s,3,4)); // 1+2+3+4 = 10
console.log(add.apply(s,[5,6])); // 1+2+5+6 = 14 
