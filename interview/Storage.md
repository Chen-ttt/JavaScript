<!--
 * @Description:
 * @Author: Tong Chen
 * @Date: 2022-09-30 07:10:22
 * @LastEditTime: 2022-09-30 09:14:50
 * @LastEditors:
-->

# 前端存储技术

## Cookie

是服务器发送到用户浏览器并保存在本地的一小块数据, 它会在浏览器下一次对同一服务器发起请求时被携带在 header 中。主要用于三个方面

> 状态管理 (登录状态, 购物车等等)
> <br>
> 个性化设置 (自定义主题等等)
> <br>
> 浏览器行为跟踪

- 第一次建立连接时, 服务器验证登录信息, 生成 Token(为了短时间内不需要重复登录), 并在响应头里添加 Set-Cookie 选项
- 浏览器收到响应, 取出 cookie
- 之后每一次建立连接, 都将 cookie 附加在 header 中发送给服务器

- 使用方面

> - 时效性: 通过 Expires、Max-Age 设置; 如果不手动设置, 时效性和 sessionStorage 一样, 关闭浏览器则被删除
> - 作用域: domain 属性设置了 cookie 的作用域, domain 本身及其子域名可以拿到相关 cookie
> - 安全性: cookie 是明文传输, 安全性较低, 建议通过 HTTPS 协议传输; 为了避免跨域脚本攻击(XSS), 带有 HttpOnly 标记的 cookie 无法通过 JS 的 Document.cookie 访问, 只能被发给服务器

- 弊端

> - 会被附加在每次请求, 无形中增加流量
> - 涉及隐私, 可能会被用户设置仅用
> - 明文传输, 可能被篡改
> - 有数量和长度的限制, 且每个 cookie 不能超过 4k

## Web Storage

### sessionStorage

- 为每一个给定的源维持一个独立的储存空间, 会话级别的存储
- 将在页面打开期间一直维持, 并且重新加载或恢复页面仍会保持原来的 sessionStorage, 关闭会话即被清除
- 对同一个网站打开两个窗口, sessionStorage 也是不一样的
- 数据类型: 只能存储字符串, 对于其他类型, 需要用 JSON 做处理再存
- 作用域:

> - 会话窗口
> - 通过 a 标签或 window.open 打开的同源页面, 将复制之前页面的 sessionStorage, 但这之后两者互不影响

### localStorage

- 与 sessionStorage 相似, 但 localStorage 是持久化存储
- 数据类型: 只能存储字符串, 对于其他类型, 需要用 JSON 做处理再存
- 作用域: 储存的数据在同一域中(协议、域名、端口号)是共享的

## Cookie 和 Web Storage 的区别

- 作用不同, Web Storage 用于大容量本地存储(5MB), Cookie 用于客户端和服务器之间的信息传递(4k)
- Web Storage 有 setItem、getItem、removeItem、clear 等方法, 而 Cookie 需要我们自己封装 setCookie、getCookie、removeCookie
- Cookie 每次都会被携带到 header 中, 对请求性能有影响, Web Storage 则不会参与
- 生命周期不同:
  - Cookie 可以设置过期时间, 默认时和 sessionStorage 一样
  - sessionStorage 在页面关闭时就被清理
  - localStorage 将一直存在, 除非手动清除

## IndexedDB

前端存储方案

- 允许存储大量且不同类型的数据, 不需要再转成字符串
- 提供读写、查找 API, 更快更方便
- 允许建立自定义索引, 更接近后端数据库, 不同于缓存
- 非关系型数据库, 更接近于 NoSQL 数据库, 以键值对的形式进行储存
