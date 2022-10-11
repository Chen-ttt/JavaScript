<!--
 * @Description:
 * @Author: Tong Chen
 * @Date: 2022-10-11 11:44:17
 * @LastEditTime: 2022-10-11 11:44:31
 * @LastEditors:
-->

# Redux 和 Mobx 区别

- Redux: 遵循 Flux 模式, Action + Reducer + Store + 异步流

- Mobx: 一个透明函数响应式编程, Action + Store + Derivation

      > Derivation - 从应用状态中派生出来, 且没有任何其他影响的数据
        + Computed Values - 使用纯函数计算/从当前可观察的状态中获取
        + Reactions - 状态变更时, 自动发生的副作用

- Redux 更多的遵循函数式编程思想, 提倡编写函数式代码, 例如 reducer 就是一个纯函数, 对于相同的输入总是有相同的输出; 而 Mobx 则更多的从面向对象的角度考虑问题, 更偏向于响应式编程, 通常将状态使用 observable 包裹, 变成可观察对象, 于是我们可以使用可观察对象的所有能力, 并且一旦状态变更, 就能自动获取更新

- Redux 将所有的共享数据放在一个大的 store 中, 而 Mobx 根据模块对数据/状态进行划分, 在多个独立的 store 中管理

- Redux 使用 JS 对象形式储存数据, 需要手动追踪所有状态的变更; 而 Mobx 使用可观察对象, 可以实现响应式更新, 当其变更的时候, 自动触发监听

- Redux 状态对象是 Immutable 的, 是不可变的, 因此不能直接操作对象中的某个属性值, 而是直接返回一个新的状态对象; 而 Mobx 可以直接修改对象

- Redux 更规范, 流程更复杂, 提供的约定和模版代码较多; 而 Mobx 提供的约定较少, 因此代码编写相对自由, 容易导致团队代码风格不一致, 需要添加一些约定和规则, 确保项目后期的可扩展性, 可维护性
