/**
 * this
 *  1. 全局中, this指向window
 *  2. 在普通函数(非构造函数)内部, this默认指向window
 *  3. 对于构造函数: 预编译时, this指向window; 执行时this指向实例对象
 *  4. call/apply
 */

// 在普通函数(非构造函数)内部
function test(b){
    this.d = 3; // 即window.d = 3; 即d = 3;
}

test(123);
console.log("验证全局是否能取到d", d);
console.log("验证全局是否能取到d", this.d);
console.log("验证全局是否能取到d", window.d);

// 在构造函数内部
/**
 * 1. 预编译时, AO中this指向window
 * AO = {
 *   this = window
 * }
 * 
 * GO = {
 *    Test: function {...},
 *    test : undefined
 * }
 * 
 * 2. 执行函数, 隐式给this及this.__proto__赋值
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

// call/apply, 见callApply.js
