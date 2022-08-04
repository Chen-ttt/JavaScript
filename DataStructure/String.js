/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-07-07 16:59:08
 * @LastEditTime: 2022-08-04 22:26:00
 * @LastEditors:  
 */
/**
 * String
 * 
 * ASCII码: 全部1字节
 *     表1 - 0-127
 *     表2 - 128-255
 * UNICODE码
 *     前255个字符 - 涵盖ASCII码,1字节
 *     255之后的字符 - 2字节
 */

/**
 * charCodeAt()
 *   返回指定位置的字符的Unicode编码
 */
var str = 'a'
var pos = str.charCodeAt(0) // 返回第0位字符的UNICODE
console.log(pos)

// 面试题
// 写一个函数,接收任意一个字符串,返回这个字符串的总字节数
function calByte (s) {
  var result = 0
  for (var i of s) {
    if (i.charCodeAt(0) <= 255) result += 1
    else result += 2
  }
  return result
}
console.log("总字节数", calByte("abc"))

/**
 * 切割字符串
 *  !!! 以下方法都必须以string实例调用
 * 1. splice() - 将字符串分割成字符串数组
 * 2. slice(start*, end) - 提取字符串的某个部分 slice(start, end), 结果包括start, 但不包括end那个字符
 *              start参数必填, end选填, 没有end则默认截取剩余所有
 * 3. substring(from*, to) - 和slice一样规则, 但两参数必须非负, 否则返回空字符
 * 4. charAt(index) - 返回第index位字符
 */

var str1 = "123-456-789"
console.log(str1.split(''))
console.log(str1.split('-'))

// -1指倒数第一个字符
console.log(str1.slice(2, 6))	 // 3-45
console.log(str1.slice(-6, -2))   // 56-7
console.log(str1.slice(2)) 		 // 3-456-789
console.log(str1.slice(-6)) 	 // 56-789 

var str = "123,456,789"
console.log(str.substring(2, 6)) 	// 3,45
console.log(str.substring(2)) 		// 3,456,789
console.log(str.substring(6, 2)) 	// 3,45
console.log(str.substring(-6, -2))  //  
console.log(typeof (str.substring(6, 6))) 	//  string
console.log(str.substring(6, 6)) 	//  

console.log(str.charAt(0))

/**
 * join() - 将所有元素拼接成一个字符串, 以参数连接
 */
var str = [123, 456, 789]
console.log(str.join('')) // 123456789
console.log(str.join(',')) // 123,456,789



