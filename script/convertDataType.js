// 类型转换

// 显式
// Number()
var a = "1.23";
console.log(typeof(Number(a)) + ": " + Number(a)); // 1.23
a = true;
console.log(typeof(Number(a)) + ": " + Number(a)); // 1
a = null;
console.log(typeof(Number(a)) + ": " + Number(a)); // 0
a = undefined;
console.log(typeof(Number(a)) + ": " + Number(a)); // NaN
a = "a";
console.log(typeof(Number(a)) + ": " + Number(a)); // NaN

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
console.log(typeof(1-"1")); // number
console.log(typeof("1"-"1")); // number
