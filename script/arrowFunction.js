/**
 * 箭头函数
 */

/**
 * 两种格式
 */
// 1. 只包含一个表达式, 没有{}和return
var f1 = () => 100; 
// 其实就等于
// function f1(){
//   return 100;
// }
console.log(f1());

var f2 = (x) => x+1; 
// 其实就等于
// function f2(x){
//   return x+1;
// }
console.log(f2(3));

// 2. 包含多条语句, {}不能省略, return看情况
var f3 = (x) => {
    if(x > 0) console.log("x大于0");
    else console.log("不符合条件")
}
console.log(f3()); // 可以不写return, 和普通函数一样默认返回undefined

// 3. 特殊情况: 如果要返回一个对象, 且是单表达式, 对象的{}和函数的{}可能会冲突, 因此不能像情况1一样写
var f4 = (x) => {foo: x};
console.log(f4());

var f5 = (x) => {return {foo: x}};
console.log(f5(4));

/**
 * 箭头函数中的this是静止的, 始终指向该箭头函数声明时所在作用域下的this; 且箭头函数中的this是无法通过call, apply和bind重新定向的
 */
// 例子6中, f6在全局作用域下声明, 此时的this指向window
var name = 'tong';
var f6 = () => console.log(this.name);
f6();

var obj = {
    name: 'obj'
}
f6.call(obj);

// 结论: 箭头函数只适合和this无关的回调函数


/**
 * 箭头函数无法作为构造函数
 */
var f7 = (name) => {this.name = name};
// var ff = new f7('oopp'); // TypeError: f7 is not a constructor

/**
 * 箭头函数不能通过arguments获取自己的实参列表; 但可以访问外围函数的arguments对象(如果有)
 *   解决 - 使用rest参数
 *         rest获取一个数组, 再展开
 */
 var f8 = (...rest) => {console.log(rest)};
 f8(2, 3, 'hello');
 // 注意: rest只能是最后一个
 var f9 = (a, ...rest) => {console.log(a, rest)};
 f9(1, 5, 6, 'bingo');

