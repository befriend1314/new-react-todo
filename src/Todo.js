import react, {useState, useEffect, useCallback} from 'react'
import React from 'react'

function TodoTop() {
  return (
    <div>
      <input type="text" placeholder="输入一些东西。。。" />
    </div>
  )
}

function TodoList() {
  return (
    <ul>
      <li >
        <span></span>
        <span>床前明月光</span>
        <span className="deletedBtn">删除</span>
      </li>
    </ul>
  )
}

function TodoBottom() {
  return (
    <div>
      <span>已完成</span>
      <span>未开始</span>
      <span>全部</span>
    </div>
  )
}


function Todo() {
  return (
    <div className="App">
      <header>Todo</header>
      <TodoTop />
      <TodoList />
      <TodoBottom/>
    </div>
  )
}

export default Todo