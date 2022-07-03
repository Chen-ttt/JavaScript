/**
 * Set - ES6新增
 */

// 创建&初始化
var set = new Set();
// 在创建的同时初始化实例:给Set构造函数传入一个可迭代对象,可以包含任何JavaScript数据类型作为值
var set1 = new Set([1, 2, "value", undefined, true, {}, function(){}]);

// Set结构不会添加重复的值,因此经常用来解决去重问题
var arr = [1, 1, 2, 3, 2, 4];
var set2 = new Set(arr);
console.log(set2); // 1, 2, 3, 4

var set4 = new Set(Array.from(set2, val => val * 2));
console.log(set4); // 2, 4, 6, 8

// Set转Array - 两种方法
arr = Array.from(set2);
arr = [...set2];
console.log("Array:", arr);

// size属性
console.log(set2.size);

// add() - 添加元素
set2.add(3).add(4).add(5);
console.log(set2); // 1, 2, 3, 4, 5

// has() - 查询是否存在某元素,返回boolean
console.log(set2.has(5)); // 添加成功

// delete() - 删除某元素,返回boolean
console.log(set2.delete(5));
console.log(set2.delete(6)); // set2没有6元素,删除失败

// clear() - 清空
set1.clear();

// keys(): 返回键名,typeof返回object
// values(): 返回键值,typeof返回object
// entries(): 返回键值对,typeof返回object
console.log(set2.keys()); // {1, 2, 3, 4}
console.log(set2.values()); // {1, 2, 3, 4}
console.log(set2.entries()); // {[1,1], [2,2], [3,3], [4,4]}

// for-of
for(const i of set2){
    console.log(i);
}

// forEach
set2.forEach((value, key) => console.log(key + ":" + value));


/**
 * ... 展开语法 Spread Syntax
 * 将一个数组的元素迭代为 用逗号分隔的参数序列
 */
console.log([...set2]);

// 实现并集
var set3 = new Set([1, 2, 4, 5, 6]);
var union = new Set([...set2, ...set3]);
console.log("Union: ", union);

/**
 * filter() - 对数组进行筛选,返回一个符合条件的新数组
 * Array.filter(function(currentValue, indedx, arr), thisValue)
 * 参数为function, 对每个元素执行该function, 若返回true则保留该元素
 * currentValue是function的必要参数, 即当前元素的值
 */
 var doubleSet = new Set([...set2].filter(num => num % 2 == 0));
 console.log("doubleSet: ", doubleSet); // 2, 4

// 实现交集
var interSection = new Set([...set2].filter(num => set3.has(num)));
console.log("Intersection: ", interSection); // 1, 2, 4


