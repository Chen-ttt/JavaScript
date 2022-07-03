// 类型转换

// 显式
console.log("显式类型转换!!!");

/**
 * typeof() - 返回一个表示参数的数据类型的字符串
 * 尝试打印一个未被定义的变量会报错
 * 但若打印该变量的typeof结果,将显示undefined,不会报错
 */

/**
 * 其他类型转number
 */
// Number()
var a = "1.23";
console.log("\"1.23\": "+typeof(Number(a)),Number(a)); // 1.23
a = true;
console.log("true: "+typeof(Number(a)),Number(a)); // 1
a = null;
console.log("null: "+typeof(Number(a)),Number(a)); // 0
a = undefined;
console.log("undefined: "+typeof(Number(a)),Number(a)); // NaN
a = "a";
console.log("\"a\": "+typeof(Number(a)),Number(a)); // NaN
a = "NaN";
console.log("\"NaN\": "+typeof(Number(a)),Number(a)); // NaN!!!

// parseInt() - 将字符串转换为整数并返回
a = "1.23";
console.log(typeof(parseInt(a)) + ": " + parseInt(a)); // 1
// 也可以通过第二个参数 以指定进制形式转换字符串, 默认为十进制
a = '1111';
console.log(typeof(parseInt(a,2)) + ": " + parseInt(a,2)); // 15
a = '0xF';
console.log(typeof(parseInt(a,16)) + ": "+parseInt(a,16)); // 15
// 如果字符串以非数字字符开头,则返回 NaN; 但如果是数值+字母,则转换前半部分
a = "a123";
console.log(typeof(parseInt(a)) + ": " + parseInt(a)); // NaN
a = "123a";
console.log(typeof(parseInt(a)) + ": " + parseInt(a)); // 123
a = true;
console.log(typeof(parseInt(a)) + ": " + parseInt(a)); // NaN
a = null;
console.log(typeof(parseInt(a)) + ": " + parseInt(a)); // NaN
a = undefined;
console.log(typeof(parseInt(a)) + ": " + parseInt(a)); // NaN
a = NaN;
console.log(typeof(parseInt(a)) + ": " + parseInt(a)); // NaN

// parseFloat() & toFixed()
a = parseFloat("3.1465926");
console.log("四舍五入: ", a.toFixed(2));

// String() & +""
a = 123;
console.log(typeof(String(a)) + ": "+String(a)); // 等效于直接+“”
a = null;
console.log(typeof(String(a)) + ": "+String(a)); // "null"
a = undefined;
console.log(typeof(String(a)) + ": "+String(a)); // "undefined"

// toString() - 和String()效果一样
// 但!!! 不可用于null和undefined, 将报错它们没有toString方法
// 且!!! 若传入参数, toString会将该数以参数规定的进制形式转为字符串
a = 5;
console.log(typeof(a.toString(2)) + ": " + a.toString(2)); //101

/**
 * 其他类型转Boolean
 */
// Boolean() - 只有0, null, undefined, Nan, "", false为false
a = 0;
console.log(typeof(Boolean(a)) + ": "+Boolean(a)); // false
a = null;
console.log(typeof(Boolean(a)) + ": "+Boolean(a)); // false
a = "";
console.log(typeof(Boolean(a)) + ": "+Boolean(a)); // false
a = undefined;
console.log(typeof(Boolean(a)) + ": "+Boolean(a)); // false
a = NaN;
console.log(typeof(Boolean(a)) + ": "+Boolean(a)); // false
// "false"有值, 不同于false
a = 'false';
console.log(typeof(Boolean(a)) + ": "+Boolean(a)); // true

// 隐式
console.log("\n隐式类型转换!!!");

/**
 * 运算符中的隐式类型转换
 */
// +运算 - 转为string
var b = 'a' + 1;
console.log("\"a\"+1: ", b); // a1
b = 1+"1";
console.log("1+\"1\": return",b,typeof(b)); // 11,string
b = "1"+"1";
console.log("\"1\"+\"1\": return",b,typeof(b)); // 11,string

// - * / % ++ --运算 - 转为number
b = 1-"1";
console.log("1-\"1\": return",b,typeof(b)); // 0,number
b = "1"-"1";
console.log("\"1\"-\"1\": return",b,typeof(b)); // 0.number

b = '123';
b++;
console.log("\"123\"++: ", b); // 124: Number('123') -> 123++

b = '3' * 2;
console.log("\"3\"*2: ", b); // 6

// 比较运算
// 1. 两string则比较ASCII
// 2. 其中有number则将所有值转为number再比较
b = 1 > "2";
console.log("1>\"2\": ", b); // false

b = "1" > 2;
console.log("\"1\">2: ", b); // false

b = "10" > "2";
console.log("\"10\">\"2\": ", b); // 逐位比较, 1小于2, false

b = "1" == 1;
console.log("\"1\"==1: ", b); // true

b = "1" === 1;
console.log("\"1\"===1: ", b); // false

b = NaN == NaN;
console.log("NaN==NaN: ", b); // false!!! NaN不等于任何东西!

b = undefined == undefined;
console.log("undefined==undefined: ", b); // true

b = 2 > 1 > 3;
console.log("2 > 1 > 3: ", b); // false

b = 2 > 1 == 1;
console.log("2 > 1 == 1: ", b); // true

// 会先将undefined转为number, 结果为NaN
b = undefined > 0;
console.log("undefined > 0: ", b); // false
b = undefined < 0;
console.log("undefined < 0: ", b); // false
b = undefined == 0;
console.log("undefined == 0: ", b); // false

b = undefined == null;
console.log("undefined == null: ", b); // true!!! 特殊情况
b = undefined === null;
console.log("undefined === null: ", b); // false

// 正负运算 - 仍将字符串转为number类型,再变为正数或负数
b = '123'
console.log("-\"123\": ", (-b), ", type:", typeof(-b)); // -123
b = 'abc'
console.log("-\"abc\": ", (-b), ", type:", typeof(-b)); // NaN

/**
 * isNaN()中的隐式类型转换
 * 当传入非number类型的参数时,将先把参数转为number再判断是否为NaN
 */
console.log("123 is NaN? ", isNaN(123));
console.log("\"123\" is NaN? ", isNaN("123"));
console.log("\"abc\" is NaN? ", isNaN("abc"));
console.log("\"NaN\" is NaN? ", isNaN("NaN"));
console.log("false is NaN? ", isNaN(false));
console.log("undefined is NaN? ", isNaN(undefined));
console.log("null is NaN? ", isNaN(null));