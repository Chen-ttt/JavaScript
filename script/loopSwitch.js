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

// 倒叙输出1-10; 要求()中只有一个语句且不能写比较,{}中不能出现i++ i--
var i = 10;
for(;i--;){ // i减到0时为false 退出循环
    // console.log(i);
}

var n = 5;
var result = 1;
for(var i=1; i <= n; i++){
    result *= i;
}
console.log("阶乘结果为 ", result);

// 100以内的质数
console.log("100以内的质数:");
var flag;
for(var i=2; i<100; i++){
    flag = true;
    for(var j=1; j<i; j++){
        if(j!=1 && j!=i && i%j==0){
            // i可以被除了1和自己整除,非质数
            flag = false;
            break;
        }
    }
    if(flag) console.log(i); // 未被标记,确认为质数,打印
}