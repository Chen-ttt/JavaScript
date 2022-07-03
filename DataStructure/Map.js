/**
 * Map - ES6新增
 */

// 创建&初始化
var map = new Map([['Anna', 99], ['Bob', 24], ['Mary', 87]]);
console.log(map);

// set() - 添加
map.set('Adam', 59);
console.log(map);

// get() - 查找
console.log(map.get('Adam'));

// delete() - 删除;返回Boolean
console.log(map.delete('Mary'));

// clear()

// size属性
console.log("剩余元素个数", map.size);

// 一个key只能对应一个value，所以多次对一个key放入value，后面的值会覆盖前面的值
map.set('Adam', 100);
console.log(map.get('Adam'));

// 无法改变数值,因为(value, key)是浅拷贝
/**
 * 浅拷贝
 * 创建一个新的对象,来接受要重新复制或引用的对象值
 * 1. 如果对象是基本的数据类型,将基本类型的值复制一份给新对象
 * 2. 但如果是引用数据类型,则复制内存中的地址;如果其中一方改变了该内存地址所存的数字,肯定会影响到另一个方
 */
map.forEach((value, key) => value++);

// .keys() .values() .entries()
console.log(map.entries());

// for-of
for(const item of map){
    console.log(item[0], item[1]);
}