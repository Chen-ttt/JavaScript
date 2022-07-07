/**
 * 包装类
 */

// 数字不一定是原始类型
var a = 1;
var b = new Number(a);
b.len = 1;
b.add = function(){
    b++;
}
console.log("b是一个对象", b); // 返回的b是一个对象
console.log("b+1是一个数字", b+1); // 经过运算后返回的变量是一个数字

/**
 * 原始类型没有属性和方法
 * 尝试给原始类型number添加属性时,程序执行如下:
 *  1. 执行c.len的赋值时,JS会尝试将123转为Number类型的对象(i.e. new Number(123))
 *  2. 向其中添加len属性并赋值为3
 *  3. 发现该对象没地方返回,无法保存,因此delete
 *  4. 打印不存在的变量,输出undefined
 */
var c = 123;
c.len = 3;
console.log("c.len未定义", c.len);

/**
 * 尝试 直接输出 原始类型string的长度时,程序执行如下:
 * 1. str变量是原始类型,没有方法和属性
 * 2. 因此转换为String包装类,而String包装类中有length属性
 * 3. 相当于打印new String(str).length
 */
var str = '123';
console.log("输出字符串长度:", str.length);
/**
 * 尝试 修改 原始类型string的长度时,程序执行如下:
 * 1. str变量是原始类型,没有方法和属性
 * 2. JS尝试将str转为String类型的对象(i.e. new String(str))
 * 3. 将该对象中的length属性赋值为1
 * 4. 发现该对象没地方返回,无法保存,因此delete
 * 5. 打印str.length: 重复上一个例子的步骤,最后打印的是new String(str).length
 */
str.length = 1;
console.log("尝试修改字符串长度:", str.length);
// !!!结论: 通过赋值length属性来直接实现字符串截断是不可行的

// 数组截断 - array的length属性
var arr = [1, 2, 3, 4, 5];
arr.length = 3;
console.log("设arr长度为3:", arr);
arr.length = 6;
console.log("设arr长度为6:", arr);

// 面试题1
var str2 = 'Tong';
str2 += 10; // 'Tong10'

var type = typeof(str2); // 'string'
if(type.length === 6){ // true
    type.hint = 'string'; 
    // new String(type).hint = 'string'
    // delete
}
console.log("例子1 type.hint:", type.hint);
// new String(type)
// 该对象没有hint属性,返回undefined
// String包装类只有length,constructor,protoType属性

// 解决方案
// var type = new String(typeof(str2));

// 面试题2
function Test(e, f, g){
    var d = 1;
    this.e = e;
    this.f = f;
    this.g = g;

    function h(){
        d++;
        console.log(d);
    }
    this.i = h;
}
var test1 = new Test();
test1.i();
test1.i();
var test2 = new Test();
test2.i();

// 答案: 2 3 2

// 面试题3
var x = 1,
    y = z = 0;

function add(n){
    return n = n + 1;
}

y = add(x);

function add(n){
    return n = n + 3;
}

z = add(x);

console.log("x, y, z", x, y, z);

// 答案: 1 4 4
// !!! 预编译时GO中的第二个add函数将第一个add覆盖,因此执行时都用的是第二个add函数

// 面试4 - 哪个选项能输出1,2,3,4,5
function foo(x){
    console.log(arguments);
    return x;
}

foo(1, 2, 3, 4, 5);

function foo(x){
    console.log(arguments);
    return x;
}(1, 2, 3, 4, 5);


(function foo(x){
    console.log(arguments);
    return x;
})(1, 2, 3, 4, 5);

// 答案: 1和3; 2什么都不输出


// 面试题5
function test5(x, y, a){
    a = 10;
    console.log("实参:", arguments[2]);

    arguments[2] = 66;
    console.log("形参a:", a);
}

test5(1, 2, 3);

/**
 * 答案: 10 66
 * 1. 函数预编译时,将形参a写入AO,并将实参赋值,此时a=3
 * 2. 函数执行,AO中有a,且a=10
 * 3. arguments代表实参列表,与形参有对应关系,任何一方变化都会影响参数值,因此arguments[2]输出为10
 * 4. 改变arguments[2],a的值相应改变
 */