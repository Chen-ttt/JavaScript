/**
 * 递归
 * 找规律 找出口
 */

// 1.n的阶乘
// 规律: A(n) = n * (n-1)
// 出口: n = 1时, A(n) = 1
function fact(n){
    if(n === 1) return 1;
    else return n*fact(n-1);
}
console.log(fact(5));

// 2.斐波那契数列 - 1 1 2 3 5 8 13 21
// 规律: A(n) = A(n-1) * A(n-2)
// 出口: n = 1或n = 2时, A(n) = 1
function Fibonacci(n){
    if(n<=2) return 1;
    else return Fibonacci(n-1)+Fibonacci(n-2);
}
console.log("Fibonacci ", Fibonacci(6));