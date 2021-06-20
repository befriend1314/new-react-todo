import react from 'react'
import deBounce from './debounce'

function TodoTop(props) {
  const handleKeyUp = e => {
    if(e.keyCode === 13) {
      let str = e.target.value.trim()
      if(str === '') return false
      // this.props.searchTodo('')
      props.addTodo(str)
      e.target.value = ''
    }
  }
  return (
    <div className="todo-top">
      <input
        type="text"
        placeholder="输入一些东西。。。"
        onKeyUp={handleKeyUp}
      />
    </div>
  )
}

export default TodoTop