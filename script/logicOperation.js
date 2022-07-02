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