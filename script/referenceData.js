// 引用值

// array
var arr = [1, 2, undefined, null];
console.log("arr length:", arr.length);

// 增
arr.push(4);
console.log("After add:", arr);
arr[arr.length] = 5;
console.log("After add:", arr);
// 删
// splice函数可以删除数组中某些元素,第一个参数表示要删除的元素下标,第二个参数表示要删除的元素的个数
arr.splice(2,1); // 删除arr[2]
console.log("After delete:", arr);
arr.splice(arr.indexOf(null),1); // 删除arr其中值为null的元素
console.log("After delete:", arr);
arr.splice(1,2); // 删除arr[1]和[2]两个元素
console.log("After delete:", arr);
// 改
arr[0] = 99;
console.log("After change:", arr);
// 查
// indexOf函数可以查找元素在数组中的下标,查找失败则返回-1
console.log("View index of \"99\":", arr.indexOf('99'));

// object: key-value pair
var person = {
    name: 'Any',
    age: 18,
    height: 175,
    job: 'student',
};
console.log(person.name, "'s job is", person.job);

// typeof - 返回一个字符串
// 该字符串的值:number/string/boolean/undefined/object/function
console.log(typeof(null)); // object(特殊情况bug,null最早是指空对象指针,因此类型为object)
console.log(typeof(undefined)); // undefined
console.log(typeof({})); // object
console.log(typeof([])); // object
console.log(typeof(function(){})); // function

// console.log(a); // 报错
console.log(typeof(a)); // undefined

/**
 * 函数也是一种对象类型 引用类型
 * 可以调用属性
 */
function test(a,b){
    console.log("执行到test函数啦!");
}
console.log(test.length);
console.log(test.name);
console.log(test.prototype);
console.log(test.arguments);