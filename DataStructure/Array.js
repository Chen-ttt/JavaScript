/**
 * Array
 */

/**
 * filter() - 对数组进行筛选,返回一个符合条件的新数组;
 * !!! 不会原地改动!
 * Array.filter(function(currentValue, index, arr), thisValue)
 * 参数为function, 对每个元素执行该function, 若返回true则保留该元素
 * currentValue是function的必要参数, 即当前元素的值
 */
var arr = [1, 1, 2, 3, 2, 4];
var newArr = arr.filter((num) => {
    return num > 2? true : false;
})
console.log(newArr);

/**
 * indexOf(item)
 * 检索item, 找到则返回item第一个出现的位置的数组下标, 没找到返回-1
 * 
 * indexOf(item, start)
 * start是可选择的整数参数, 规定了数组开始检索的位置
 * 若不传值, 则从头开始检索
 * start范围是0到length-1
 * 
 */
var score = [99, 98, 50, 99];
console.log(score.indexOf(99));
console.log(score.indexOf(2222));

console.log(score.indexOf(99, 2));
