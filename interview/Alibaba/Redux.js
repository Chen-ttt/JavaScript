/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-10-17 21:56:42
 * @LastEditTime: 2022-10-17 22:02:27
 * @LastEditors:  
 */

// 阿里二面

function createStore (reducer, initialState) {
  let state = initialState
  let listeners = []

  // 获取当前状态
  function getState () {
    return state
  }

  // 派发指令给reducer
  function dispatch (action) {
    // reducer修改后返回新的state
    state = reducer(state, action)
    // 执行所有监听
    listeners.forEach(listener => listener())
  }

  // 订阅 - state更新后将执行的函数
  function subscribe (listener) {
    listeners.push(listener) // 注册监听函数
    // 返回一个将来可以取消该监听的函数
    return function () {
      let index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  // 创建store时, 首先派发一次action, 以初始化state
  dispatch({ type: 'REDUX_INIT' })

  return {
    getState,
    dispatch,
    subscribe
  }
}