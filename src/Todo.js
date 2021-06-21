import './assets/todo.css'
import React, { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = "todos-react";

const Todo = () => {
  const [todos, setTodos] = useState([])
  const [filteredTodos, setFilteredTodos] = useState([])
  const [todoStorageUid, setTodoStorageUid] = useState(0)
  const [visibility, setVisibility] = useState('all')
  const [count, setCount] = useState()
  const [beforeEditCache, setBeforeEditCache] = useState('')
  const [editedTodo, seteditedTodo] = useState([])

  const addTodo = useCallback(e => {
    if(e.keyCode === 13) {
      const value = e.target.value.trim()
      console.log(value)
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
  }, [todos, todoStorageUid])

  const deleted = useCallback(todo => {
    const tempTodos = [...todos]
    tempTodos.splice(todos.indexOf(todo), 1);
    setTodos(tempTodos)
  }, [todos])

  const handleChange = useCallback(todo => {
    const tempTodos = [...todos]
    const cIndex = todos.indexOf(todo)
    tempTodos[cIndex].completed = !tempTodos[cIndex].completed
    setTodos(tempTodos)
  }, [todos])

  const handlechangeStatus = str => {
    setVisibility(str)
  }
  const clearCompleted = () => {
    const tempTodos = todos.filter(todo => !todo.completed)
    setTodos(tempTodos)
  }

  const handleEditting = useCallback((todo, e) => {
  }, [])

  const editTodo = useCallback((todo, e) => {
    setBeforeEditCache(todo.title)
    e.target.parentNode.firstChild.focus()
  }, [])

  const doneEdit = useCallback((todo, e) => {
    console.log(e.target.value.trim());
  }, [])


  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    setTodoStorageUid(todos.length)
    setTodos(todos)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    let count =  todos.filter(todo => !todo.completed).length
    setCount(count)
  }, [todos]);

  useEffect(() => {
    let tempTodos
    switch(visibility) {
      case 'active':
        tempTodos = todos.filter(todo => !todo.completed)
        setFilteredTodos(tempTodos)
        break;
      case 'completed':
        tempTodos = todos.filter(todo => todo.completed)
        setFilteredTodos(tempTodos)
        break;
      default:
        setFilteredTodos(todos)
        break;
    }
  }, [visibility, todos])

  return (
    <div className="todo">
      <div className="topTodo">
        <input type="text" onKeyDown={addTodo} />
      </div>
      <div className="todoList">
        <ul>
          {filteredTodos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed': ''}>
              <div>
                <input
                  type="text"
                  defaultValue={todo.title}
                  onChange={e => handleEditting(todo, e)}
                  onBlur={e => doneEdit(todo, e)}
                  className="edit" />
                <input type="checkbox" checked={todo.completed} onChange={() => handleChange(todo)} />
                <span className="title" onDoubleClick={e => editTodo(todo, e)}>{todo.title}</span>
                <span className="deletedBtn" onClick={() => deleted(todo)}>删除</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {!!todos.length && (
        <div className="todoBottom">
          <div className="itemLeft">{count} 个未完成</div>
          <div className="statusBtn">
            <span className={visibility === 'all' ? 'selected': ''} onClick={() => handlechangeStatus('all')}>全部</span>
            <span className={visibility === 'active' ? 'selected': ''} onClick={() => handlechangeStatus('active')}>未完成</span>
            <span className={visibility === 'completed' ? 'selected': ''} onClick={() => handlechangeStatus('completed')}>完成</span>
          </div>
          {todos.length > count && (<div className="clear" onClick={clearCompleted}>清除完成</div>)}
        </div>
      )}
    </div>
  )
}

export default Todo