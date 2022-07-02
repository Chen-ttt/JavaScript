// 原始值 - 基础类型
// 存入stack栈内存, 先进后出
var a = 3;
var b = a; // 从a空间中将数值拷贝到b空间
a = 1; // 将原本a空间的命名删除, 但空间内的数值3保留, 另找一个空间命名为a并放入数值1, 原本空间的数值3将会在下一次写入时被覆盖
console.log(b); // 3

// Number
console.log(0/0); // NaN
console.log(1/0); // Infinity
console.log(-1/0); // -Infinity

// 引用值
// 值存在heap堆内存, 堆内存中的地址存在stack栈内存
// object array function date

// push不影响变量在heap中的地址, 而重新赋值将影响, 因为会开辟一个新的空间

var arr1 = [1, 2, 3]; // heap中存入[1,2,3], stack中一个空间命名为arr1, 在该空间中存入heap地址指向数组
var arr2 = arr1; // 将stack中arr1储存的地址拷贝到arr2空间中
arr1.push(5);
console.log(arr2); // [1, 2, 3, 5]

arr1 = [9, 9]; // 重新赋值, 在heap中新开辟一个空间存入数组, stack中将原本arr1空间的命名删除, 新开辟一个空间名为arr1并放入新数组在heap中的地址
console.log(arr1); // [9, 9]
console.log(arr2); // [1, 2, 3, 5]

// 交换a和b
a = a + b;
b = a - b;
a = a - b;
console.log(a, b); // 3, 1

b = a-- + --a; // 相当于(--a + a--), 先算--a, 再b=2+2=4, 最后a--
console.log(a, b); // 1, 4

a = --b + --b;
console.log(a, b); // 5, 2

b = --a + a++;
console.log(a, b); // 5, 8

// 比较运算符
var bool = 3>"2"; // 会先将string转为number再比较
console.log("3 > \"2\" ?", bool);

bool = "a"<"b"; // string和string比较, ASCII码
bool = "4.5">"11"; // 多个字符的string对比, 逐个字符进行比较, 在第一位4的ASCII码已经大于1, 则结束比较
console.log("\"4.5\" > \"11\" ?", bool);

// == 不看数据类型, 值相等即可
// === 需要数据类型也相等
bool = 1 == "1";
console.log("1 == \"1\" ?", bool);
bool = 1 === "1";
console.log("1 === \"1\" ?", bool);
// NaN与任何东西都不相等, 包括自己
bool = NaN == NaN;
console.log("NaN == NaN ?", bool);

// 每个case必须要加上break, 不然进入相应的case后, 该case之后的每个case都会执行
var score = 59;
switch(score){
    case 100:
        console.log("Good.");
        // break;
    case 59:
        console.log("Not pass.");
        // break;
    default:
        console.log("Not 59 or 100.");
}

// undefined, null, Nan, 0, "" 和 false 一定是假, 其他都是真
// &&: 遇到假就返回当前值;
//     遇到真就往后走,若全为真则走到最后并返回最后一个值(i.e.返回真)
a = 1 && 2;
console.log("1 && 2 = ", a); // 2
a = 1 && 2 && undefined && 10;
console.log("1 && 2 && undefined && 10 = ", a); // undefined

// ||: 遇到真就返回当前值;
//     遇到假就往后走,若全为假则走到最后并返回最后一个值(i.e.返回假)
a = 1 || 2;
console.log("1 || 2 = ", a); // 1
a = 0 || null || "0" || 0;
console.log("0 || null || \"0\" || 0 = ", a); // "0"

// 若name有值则打印name, 若为空string则打印未找到
var name = "";
console.log(name || "未找到name数据");

