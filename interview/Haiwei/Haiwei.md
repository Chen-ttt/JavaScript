<!--
 * @Description:
 * @Author: Tong Chen
 * @Date: 2022-10-11 11:08:18
 * @LastEditTime: 2022-10-11 11:42:24
 * @LastEditors:
-->

# 华为

## 一面

- 确认奖学金, 一等学位, 研究生成绩

- 代码题

  > https://github.com/Chen-ttt/JavaScript/blob/master/interview/Haiwei/taskTime_Huawei.js

- 介绍项目和难点

  - React
  - Redux
  - Debug: Emailjs 和 Mockjs 的库文件发生冲突

- 延伸: 如何发现是库文件的问题

  - 检查自己代码
  - 将两部分的功能分别放在两个 demo 上运行, 都没问题
  - 看库文件源码
  - Debug: 打断点 & 输出数据

- 延伸: 如何调试代码, 如何具体定位到是哪一部分有 bug

  - 在库文件里放一个测试数据, 观察数据流动

- 延伸: 为什么觉得 mockjs 不规范

  - 代码编写不规范
  - 库文件 8 千多行, 耦合度过高
  - 注释有中文
  - 不是官方库, 好像是 tb 上的人写的

- 延伸: 说一说对解藕的理解, 在项目中是否有实践

  > - 将静态的、频繁修改的、未来需要维护的数据, 抽离出来, 形成配置文件
  > - 根据配置文件的规范去写对应的业务逻辑
  > - 拒绝 god class 和 god function, 类和函数都应当遵循单一职责原则

- 有没有看过什么源码 ?

  - instanceof
  - Promise, Promise.all, Promise.race
  - call, apply, bind

- 对其他编程语言熟不熟悉 ?
- Java 和 JavaScript 有什么不同 ?
  - 多线程/单线程, 事件循环机制
  - 闭包
  - 类和对象, 继承
- 是否了解 C 语言 ? 说一说对栈内存和堆内存的理解 ?
