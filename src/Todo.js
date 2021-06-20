import './assets/todo.css'
import React, { useState, useEffect, useCallback } from 'react'


// visibility filters
const filters = {
  all: function(todos) {
    return todos;
  },
  active: function(todos) {
    return todos.filter(function(todo) {
      return !todo.completed;
    });
  },
  completed: function(todos) {
    return todos.filter(function(todo) {
      return todo.completed;
    });
  }
};



function Todo() {
  const STORAGE_KEY = "todos-react";
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [todoStorageUid, setTodoStorageUid] = useState(0)
  const [editedTodo, setEditedTodo] = useState(null)
  const [visibility, setVisibility] = useState('all')



  const addTodo = useCallback(str => {
    setTodos([...todos, {
      id: 't' + todos.length,
      val: str,
      finished: false
    }])
  }, [todos])

  const handleKeyUp = useCallback(e => {
    if(e.keyCode === 13) {
      let value = e.target.value.trim()
      if (!value) {
        return
      }
      setTodoStorageUid(todoStorageUid + 1)
      setTodos([...todos, {
        id: todoStorageUid,
        title: value,
        completed: false
      }])
      e.target.value = ''
    }
  }, [todoStorageUid, todos])

  const removeTodo = useCallback(todo => {
    console.log('todo', todo)
    const tempTodos = [...todos]
    tempTodos.splice(todos.indexOf(todo), 1);
    setTodos(tempTodos)
  }, [todos])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    todos.forEach(function(todo, index) {
      todo.id = index;
    });
    setTodoStorageUid(todos.length)
    setTodos(todos)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos])


  return (
    <div className="App">
      <header>Todo</header>
      <div className="todo-main">
        <div className="todo-top">
          <input
            type="text"
            placeholder="输入一些东西。。。"
            onKeyUp={handleKeyUp}
          />
        </div>
        <ul className="todo-list">
          {todos.length > 0 && todos.map(todo => (
            <li key={todo.id}>
          <span
            className={todo.completed ? 'inputBg finished': 'inputBg'}
          ></span>
              <span className="labelWrap">{todo.title}</span>
              <span className="deletedBtn" onClick={() => removeTodo(todo)}>删除</span>
            </li>
          ))}
        </ul>
        <div className="todo-bottom">
          <span>已完成</span>
          <span>未开始</span>
          <span>全部</span>
        </div>
      </div>
    </div>
  )
}

export default Todo