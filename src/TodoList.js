import React from 'react'

function TodoList(props) {
  const handleClick = () => {
    props.finishedTodo()
  }
  return (
    <ul className="todo-list">
      {props.todos.length > 0 && props.todos.map(todo => (
        <li key={todo.id}>
          <span
            className={todo.finished ? 'inputBg finished': 'inputBg'}
            onClick={handleClick}
          ></span>
          <span className="labelWrap">{todo.val}</span>
          <span className="deletedBtn">删除</span>
        </li>
      ))}
    </ul>
  )
}

export default TodoList