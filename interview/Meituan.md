<!--
 * @Description:
 * @Author: Tong Chen
 * @Date: 2022-09-27 21:46:55
 * @LastEditTime: 2022-09-30 06:54:04
 * @LastEditors:
-->

# 美团

## 一面

1. 介绍项目, 项目里有什么优化的地方 (useMemo, 图片懒加载)

2. 为什么用 Redux, Redux 和 Mobx 区别
   https://github.com/Chen-ttt/JavaScript/blob/master/interview/t.md

3. Commonjs

- 每个脚本文件就是一个模块, 有自己的作用域
- 每个模块内部, module 变量代表当前模块, 是一个对象; module.exports 属性表示当前模块对外输出的接口, 其他文件加载该模块, 实际上是读取 module.exports 变量
- 另外, Node 为每个模块提供一个 exports 变量, 指向 module.exports

```
const a = 0

// 1. 依次导出
module.exports.a = a
exports.a = a // exports默认指向module.exports

// 2. 整体导出
module.exports = { a }
```

- require 命令用于加载模块文件, 第一次加载脚本文件时就会执行整个脚本, 并在内存中生成一个该模块的说明对象, 引用该模块的其他文件都会到 exports 属性中取值; 且即使再次用 require 加载该模块, 它的脚本文件也不会再次执行, 而是到缓存中去取值

```
{
  id: '',
  exports: { // 模块输出的各个接口
    ...
  },
  filename: './path/subpath/file.js', // 当前模块的绝对路径
  loaded: true, // 脚本是否执行完毕
  children: [], // 被该模块引用的模块
  parent: '', // 第一个引用该模块的模块
  paths: [ // 模块的搜索路径
    '/path/a/node_modules',
    '/path/b/node_modules',
    '/path/node_modules',
    '/node_modules',
    ...
  ]
}
```

4. ES6 Module

- 使用静态语法, 且 export 和 import 只能出现在代码顶层
- 只会在第一次加载时运行, 之后的重复加载都不会运行
- 数据是动态绑定的

```
const a = 0

// 1
export { a }

// 2
export const a = 0

// 3. 默认导出 - 实际上是设置一个名为default的接口
export default a
```

```
// 导出
import { a } from ...
import { a as A} from ...
import * as A from ...

// 导入默认接口
import A from ...
```

5. Commonjs 和 ES6 导入模块区别

- Commonjs 的 require 命令是同步执行的, 因此只有加载完成才执行后面的操作 (因此 Commonjs 服务端, 如果用于前端的话, 加载过程会造成一段时间的白屏)
  而 ES6 是异步的, 可以用于客户端或服务端, 且在 node 中使用 ES6 时, 需要将遵循 ES6 Module 的文件写为以.mjs 为后缀的文件

- Commonjs 输出的是值的拷贝, 即原来模块中的值 和 已经加载完毕的值不会相互影响
  ES6 Module 是静态分析, 动态引用, 加载的是值的引用, 即原来模块中的值 和 已经加载完毕的值指向同一块内存, 会相互影响, 一方改变, 另一方也改变

- Commonjs 的模块是运行时加载, 因此不存在 require 提升
  ES6 模块是静态编译时就确定了模块的依赖, 存在 import 提升

- Commonjs 加载的是整个模块, 所有的接口全部加载
  ES6 可以只加载其中的某个接口(方法)

- Commonjs 中顶层的 this 指向当前模块
  ES6 模块中的顶层 this 指向 undefined

6. 为什么用 indexedDB ? 和前端其他储存相比, 有什么区别 (cookie / sessionStorage / localStorage)

7. 解释进程线程, 进程之间如何通信

8. Node 和其他后端语言(C/Java/Python)相比有什么区别

9. JS 是多线程还是单线程 ? JS 引擎解析 JS 代码的过程

10. JS 代码快还是 C 更快, 为什么

11. 介绍 TCP IP 协议, TCP 拥塞控制

12. HTTP 劫持 & HTTPS 如何保证安全通信 & 为什么要先非对称加密再对称加密, 为什么只使用一种

13. 看代码说输出
    https://github.com/Chen-ttt/JavaScript/blob/master/interview/console.js

14. 代码: 写一个防抖函数

15. 说一下数组和链表的区别

16. 代码: 旋转链表
    https://github.com/Chen-ttt/JavaScript/blob/master/interview/rotateLinkedList.js
