import './assets/todo.css'
import React, {Component} from 'react'
import TodoTop from "./components/TodoTop"
import TodoList from "./components/TodoList"
import TodoBottom from "./components/TodoBottom"
import todoInitData from "./todoInitData"


class App extends Component {
  constructor(props) {
    super(props)
    // 全局 数据保存到 state , 子组件通过props 调用父组件的方法来修改
    this.state = {
      searchStr: '', // 输入内容时的字符串，搜索用
      filter: 'all', // 'all' , 'active' , 'completed'
      id: 0, // 通过id 累加来区别每一个todo
      todoList: [] // 整个todo 的列表数组
    }
    this.addNewTodo = this.addNewTodo.bind(this)
    this.searchTodo = this.searchTodo.bind(this)
    this.delete = this.delete.bind(this)
    this.changeStatus = this.changeStatus.bind(this)
    this.filterEvent = this.filterEvent.bind(this)
    this.editTodo = this.editTodo.bind(this)
  }

  // 筛选 通过 searchStr 来匹配todo.txt ，再根据底部按钮状态返回对应的todo列表
  get todoResult() {
    const str = this.state.searchStr
    const resultList = this.state.todoList.filter(list => {
      return list.txt.indexOf(str) !== -1 || str.indexOf(list.txt) !== -1
    })
    switch (this.state.filter) {
      case 'active':
        return resultList.filter(list => {
          return list.completed === false
        })
      case 'completed':
        return resultList.filter(list => {
          return list.completed === true
        })
      default:
        return resultList
    }
  }

  // 初始化数据
  componentDidMount() {
    const state = this.getStorage()
    this.setState({
      todoList: state.todo ? state.todo : todoInitData,
      id: state.id ? state.id : 0
    })

  }

  // 输入新增todo ， 更新storage 和 state
  addNewTodo(str) {
    let oldTodo = this.state.todoList
    let newTodo = {
      id: 'id' + this.state.id,
      txt: str,
      completed: false
    }

    this.setState({
      todoList: [newTodo, ...oldTodo],
      id: this.state.id - 0 + 1
    }, ()=> {
      this.updateStorage(this.state.id, this.state.todoList)
    })
  }

  // 搜索过滤数据
  searchTodo(str) {
    this.setState({
      searchStr: str
    })
  }

  // 删除todo， 通过传入id 匹配删除对应的todo，更新storage 和 state
  delete(id) {
    let oldTodo = this.state.todoList
    let newTodo = oldTodo.filter(todo => {
      return todo.id !== id
    })
    this.updateStorage('', newTodo)
    this.setState({
      todoList: [...newTodo]
    })
  }

  // 勾选复选框，通过id 匹配，然后更新state 和 storage
  changeStatus(id) {
    let oldTodo = this.state.todoList
    let newTodo = oldTodo.map(todo => {
      if(todo.id === id) {
        todo.completed  = !todo.completed
      }
      return todo
    })
    this.updateStorage('', newTodo)
    this.setState({
      todoList: [...newTodo]
    })
  }

  // 底部切换状态
  filterEvent(filter) {
    this.setState({
      filter: filter
    })
  }

  // 双击列表的todo，可以进行编辑，通过 id 来匹配需要编辑的todo
  editTodo(id, str) {
    let oldTodo = this.state.todoList
    let newTodo = oldTodo.map(todo => {
      if(todo.id === id) {
        todo.txt = str
      }
      return todo
    })
    this.updateStorage('', newTodo)
    this.setState({
      todoList: [...newTodo],
    })

  }
  // 读取 storage
  getStorage() {
    let storage = window.localStorage
    let state = {
      id: storage.getItem('todoId'),
      todo: JSON.parse(storage.getItem('todo'))
    }
    return state
  }
  // 更新Storage, 不是新增不用传id计数
  updateStorage(id, todo) {
    let storage = window.localStorage
    if(id) {
      storage.setItem('todoId', id)
    }
    storage.setItem('todo',JSON.stringify(todo))
  }

  render() {
    return (
      <div className="App">
        <header>Todo</header>
        <div className="todo-main">
          <TodoTop addNewTodo={this.addNewTodo} searchTodo={this.searchTodo} />
          <TodoList todoList={this.todoResult} editTodo={this.editTodo} delete={this.delete} changeStatus={this.changeStatus} />
          <TodoBottom status={this.state.filter} filterEvent={this.filterEvent} />
        </div>
      </div>
    )
  }
}

export default App
