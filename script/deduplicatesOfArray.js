/**
 * 数组去重
 */

// 1. ES6 Set
var arr = [1, 2, 2, 2, 3, 3, 6, 9, 9, 9];
var set = [...new Set(arr)];
console.log("方法1", set);

var arr1 = [1, 2, 2, 2, 3, 3, {}, {}];
var set = [...new Set(arr1)];
console.log("方法1存在漏洞", set);

// 2. splice + 双循环 (ES5常用)
function f2(arr){
    for(var i=0; i<arr.length; i++){
        for(var j=i+1; j<arr.length; j++){
            if(arr[i] === arr[j]){
                arr.splice(j, 1);
                j--; // 必须要把j减1, 防止三个及三个以上相邻的重复值
            }
        }
    }
    return arr;
}
console.log("方法2", f2(arr));

// 3. indexOf
arr = [1, 2, 2, 2, 3, 3, 6, 9, 9, 9];
function f3(arr){
    var result = [];
    for(var i=0; i<arr.length; i++){
        if(result.indexOf(arr[i])  === -1){
            result.push(arr[i]);
        }
    }
    return result;
}
console.log("方法3", f3(arr));

// 4. sort
arr = [1, 2, 2, 2, 3, 3, 6, 9, 9, 9];
function f4(arr){
    arr = arr.sort();
    var result = [arr[0]];
    for(var i=1; i<arr.length; i++){
        if(arr[i] !== arr[i-1]){
            result.push(arr[i]);
        }
    }
    return result;
}
console.log("方法4", f4(arr));

// 5. includes
arr = [1, 2, 2, 2, 3, 3, 6, 9, 9, 9];
function f5(arr){
    var result = [];
    for(var i=0; i<arr.length; i++){
        if(!result.includes(arr[i])){
            result.push(arr[i]);
        }
    }
    return result;
}
console.log("方法5", f5(arr));

// 6. hasOwnProperty
arr = [1, 2, 2, 2, 3, 3, 6, 9, 9, 9];
function f6(arr){
    var obj = {};
    return arr.filter((value, index, arr) => {
        // 注意!!! 这个箭头函数 必须要return一个值; false表示不要这个元素, true表示保留这个元素
        return obj.hasOwnProperty(typeof(value)+value)? false : (obj[typeof(value)+value] = true);
    });
}
console.log("方法6", f6(arr));

// 7. filter
function f7(arr){
    return arr.filter((value, index, arr) => {
        if(arr.indexOf(value, 0) !== index){
            return false;
        } else return true;
    })
    
}
console.log("方法7", f7(arr));

// 8. Map
function f8(arr){
    var map  = new Map();
    for(var i=0; i<arr.length; i++){
        if(!map.has(arr[i])){
            map.set(arr[i], true);
        }
    }
    return [...map.keys()];
}
console.log("方法8", f8(arr));

// 9.递归

