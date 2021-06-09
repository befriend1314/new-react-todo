import React, {Component} from 'react'

import deBounce from "../debounce"

class TodoTop extends Component {
  constructor(props) {
    super(props)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.searchTodo = this.searchTodo.bind(this)

    // 输入内容时设置防抖
    this.searchTodo = deBounce(this.searchTodo, 300)
  }

  // 按回车通过调用父组件的方法，添加数据
  handleKeyUp(e) {
    if(e.keyCode === 13) {
      let str = e.target.value.trim()
      if(str === '') return false
      this.props.addNewTodo(str)
      this.props.searchTodo('')
      e.target.value = ''
    }
  }
  searchTodo(str) {
    this.props.searchTodo(str)
  }
  handleInput(e) {
    let str = e.target.value.trim()
    this.searchTodo(str)
  }
  render() {
    return (
      <div className="todo-top">
        <input type="text" placeholder="输入一些东西。。。" onInput={this.handleInput} onKeyUp={this.handleKeyUp}/>
      </div>
    )
  }
}

export default TodoTop