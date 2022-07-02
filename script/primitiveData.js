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