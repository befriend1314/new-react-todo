import React, {Component} from 'react'

import LabelWrap from "./LabelWrap"

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.handleChecked = this.handleChecked.bind(this)
    this.labelEdit = this.labelEdit.bind(this)
  }
  handleDelete(id) {
    this.props.delete(id)
  }
  handleChecked(e) {
    this.props.changeStatus(e.target.id)
  }
  labelEdit(id, str) {
    this.props.editTodo(id, str)
  }

  render() {
    const listItems = this.props.todoList.map(list => {
      return(
        <li key={list.id}>
          <span id={list.id} className={list.completed? "inputBg checked": "inputBg"} onClick={this.handleChecked}></span>
          <LabelWrap list={list} labelEdit={this.labelEdit}></LabelWrap>
          <span className="deletedBtn" onClick={() => this.handleDelete(list.id)}>删除</span>
        </li>
      )
    })
    return (
      <ul className="todo-list">{listItems}</ul>
    )
  }
}

export default TodoList