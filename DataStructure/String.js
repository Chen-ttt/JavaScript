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
var str = 'a';
var pos = str.charCodeAt(0); // 返回第0位字符的UNICODE
console.log(pos);

// 面试题
// 写一个函数,接收任意一个字符串,返回这个字符串的总字节数
function calByte(s){
    var result = 0;
    for(var i of s){
        if(i.charCodeAt(0) <= 255) result += 1;
        else result += 2;
    }
    return result;
}
console.log("总字节数", calByte("abc"));
