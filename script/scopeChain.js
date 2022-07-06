/**
 * 对象有一些JS引擎内部固有的隐式属性
 * 
 * scope - function对象的一个隐式属性
 * 1. 函数定义时,生成[[scope]]属性来保存该函数的作用域链
 * 2. 函数储存作用域链的容器
 *      a.作用域链存储:
 *         GO(全局的执行期上下文)
 *         AO(函数的执行期上下文) - 函数开始执行,AO生成;函数执行完,AO被销毁;因此每次执行一个函数都会有个新的AO,AO是一个即时存储的容器
 * 
 *      b.作用域链:将AO GO从上到下排列起来形成链条;
 *        如果在当前作用域中没有查到值，就会向上级作用域去查，直到查到全局作用域，这么一个查找过程形成的链条就叫做作用域链
 */

/**
 * !!! 上层代码预编译时 -> 函数被定义 -> 生成作用域链
 * !!! 函数被调用时 -> 前一刻 -> 函数预编译 -> 生成AO
 * !!! 函数预编译完成 -> 函数执行 -> 变量赋值存入AO
 */

function a(){
    function b(){
        var b = 2;
    }
    var a = 1;
    b();
}
var c = 3;

/**
 * 1. 函数定义时,生成[[scope]]属性来保存该函数的作用域链
 * function a = {
 *      ...,
 *      [[scope]]: Scope Chain,
 *      ...
 * }
 * 
 * Scope Chain = {
 *      // 此时函数还没有执行,因此也没有被预编译,没有AO
 *      0: GO(全局执行期上下文) // 在第0位储存GO!!!
 * }
 * 
 * GO = {
 *      this: window,
 *      window: object,
 *      document: object,
 *      a: function a(){},
 *      c: 3
 * }
 */

a();

/**
 * 2. 函数执行的前一刻,进行函数预编译: 生成AO并添加到作用域链顶部
 * function a = {
 *      ...,
 *      [[scope]]: Scope Chain,
 *      ...
 * }
 * 
 * Scope Chain = {
 *      0: AO(函数执行期上下文) // 在第0位储存AO,在第1位储存GO!!!查找变量是从顶端往下查找
 *      1: GO(全局执行期上下文)
 * }
 * 
 * AO_a = {
 *      this: window,
 *      arguments: [],
 *      a: undefined,
 *      b: function b(){}
 * }
 * 
 * GO = {
 *      this: window,
 *      window: object,
 *      document: object,
 *      a: function a(){},
 *      c: 3
 * }
 * 
 * !!! 此时b函数被定义,生成b函数的作用域链,和以上a的作用域链一模一样!!!
 */

/**
 * 3. a函数执行,a的AO中变量被赋值,其他不变
 * AO_a = {
 *      this: window,
 *      arguments: [],
 *      a: 1,
 *      b: function b(){}
 * }
 * 
 * 
 * 4. 执行到最后一行 b(); 函数b执行的前一刻,进行函数预编译: 生成AO并添加到作用域链顶部; 函数b执行,b的AO中变量被赋值
 * function b = {
 *      ...,
 *      [[scope]]: Scope Chain,
 *      ...
 * }
 * Scope Chain = {
 *      0: AO_b
 *      1: AO_a
 *      2: GO
 * }
 * 
 * AO_b = {
 *      this: window,
 *      arguments: [],
 *      b: 2
 * }
 * GO = {
 *      this: window,
 *      window: object,
 *      document: object,
 *      a: function a(){},
 *      c: 3
 * }
 */

/**
 * 5. 函数b被执行完, 作用域链上删除AO_b, b的[[scope]]仍存在,恢复到步骤2 b被定义时的状态
 * 6. 紧接着函数a被执行完, 作用域链上删除AO_a, a的[[scope]]恢复到步骤1 a被定义时的状态; 并且随着AO_a在作用域链上消失, AO_a中的function b(){}也销毁, 因此b的[[scope]],即整个b的作用域都不存在了
 */


function test1(){
    function test2(){
        var c = 2;
    }
    var a = 1;
    return test2; // !!!这里将test2返回,此时test2仅被定义过,scope和test1的scope一样,包含AO_test1和GO
} // test1执行结束AO_test1从作用域链上消失, 但该对象本身仍然储存在heap堆内存中, 因为test2的scope中仍有引用了AO_test1
var test3 = test1(); //实际上接收了test2函数
test3(); // 等于执行test2函数,因此当执行test2时,生成AO_test2并加入作用域链,同时通过链上的AO_test1地址仍可以在堆内存中找到对象

// 执行结束后, test2的scope上的AO_test2销毁, 保留AO_test1和GO

/**
 * 闭包
 *   1. 当内部函数被返回到外部并保存时, 将产生闭包, 导致原来的作用域链不释放
 *   2. 过多的闭包会导致内存泄漏或加载过慢
 */

// 闭包可用于数据缓存
function assignment(){
    var n = 100;
    function add(){
        n++;
        console.log("After add:", n);
    }

    function reduce(){
        n--;
        console.log("After reduce:", n);
    }
    return [add, reduce];
}
var arr = assignment();
arr[0]();
arr[1]();

function breadMgr(num){
    var breadNum = num || 10;

    function supply(){
        breadNum += 10;
        console.log("After supple:", breadNum);
    }

    function sale(){
        breadNum--;
        console.log("After sale:", breadNum);
    }
    return [supply, sale];
}
var breadMgr = breadMgr(50);
breadMgr[0]();
breadMgr[1]();

function sunSched(thing){
    var plan = '';
    var operation = {
        setSched: function(){
            plan = thing;
        },
        showSched: function(){
            console.log("My schedule on Sunday is", thing);
        }
    }
    return operation;
}
var sunSched = sunSched("studying");
sunSched.setSched();
sunSched.showSched();