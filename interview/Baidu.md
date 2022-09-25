<!--
 * @Description:
 * @Author: Tong Chen
 * @Date: 2022-09-26 00:06:28
 * @LastEditTime: 2022-09-26 01:11:58
 * @LastEditors:
-->

# 百度

## 一面

1. css 实现居中的几种方式
2. 响应式布局，rem，em，vw
3. chrome 支持的最小的 font-size
   Solu: 12px
4. 如何实现 10px 大小的文字 (设置盒子的宽高没用)
   Solu: https://github.com/Chen-ttt/CSS_basic/blob/main/template/10pxFontSize.html
5. js 判断数据类型的方式
6. es6 新特性
   注意: Generator 是 es6 新特性, 但 async/await 是 es7 出的
7. promise 相关 api
8. Promise.all 和 Promise.race 分别返回什么
9. 看 promise 代码, 判断输出顺序
10. cookie，sessionStorage，localStrorage 区别
11. 两个不同窗口的 sessionStorage 能否共享，什么情况下能共享
    Solu: 通过 a 标签或 window.open 打开的同源页面, 将复制之前页面的 seesionStorage
    但并不是完全的共享, 打开新页面之后, 两边的 sessionStorage 互不影响

12. 代码：处理字符串
    https://github.com/Chen-ttt/JavaScript/blob/master/Handwritting/strToArray.js

13. 代码：写一个生成唯一 id 的函数, 要求不使用 Symbol 或者时间戳
    Solu: 闭包
    扩展: 闭包导致的问题, 如何解决, 更具体的, 在这道题里如何解决

14. 代码：数组扁平化 + 去重 (1 种方法就行)
15. 代码：使用 setTimeout 实现 setInterval (注意最后需要销毁定时器)

!!! css 基础问题

## 二面

1. 如何学习前端
2. Redux 和 Mobx 区别
3. 路由的两种模式, 分别如何更换路由, 如何监听到路由变化
4. 三栏布局，左右各 100px，中间填满剩余宽度（方法越多越好）
   Solu:
   使用 float 实现
   使用 position 实现
   使用 flex 布局实现
   使用 grid 布局实现 (但这个需要计算比例, 面试官说这种不太灵活, 不好)

5. process.nexttick, setimmediate, settimeout 分别是宏任务还是微任务
6. 扩展: 事件循环中, 它们的执行顺序
7. 质疑了简历里 indexedDB 是不是真的用了, 我说老师上课重点讲的, 然后延伸问到前端储存方式
   为什么用 indexedDB，有什么好处
8. 两种缓存机制，和对应的 header 字段

9. 代码：promise 控制并发
   https://github.com/Chen-ttt/JavaScript/blob/master/Handwritting/schedulePromise.js
10. 代码：动态规划 Leetcode 62

## 三面

1. 项目难点
2. Redux，Mobx 区别
3. indexedDB 好处
4. 看了 git 上写的代码，问为啥要自己手写深拷贝，不用 api
5. 项目中觉得最让自己成长，有收获的地方, 技术方面或者非技术方面都行
6. 当 leader 的时候干了什么
7. 如果组员们一直有 bug 需要你解决，你会怎么办
8. 能不能提前实习巴拉巴拉巴拉....
