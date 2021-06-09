import React, {Component} from 'react'

class TodoBottom extends Component {
  // 通过切换不同类型来筛选数据
  filterEvent(str) {
    this.props.filterEvent(str)
  }

  render() {
    return (
      <div className="todo-bottom">
        <span className={this.props.status === 'completed' ? 'active' : ''} onClick={() => this.filterEvent('completed')}>已完成</span>
        <span className={this.props.status === 'active' ? 'active' : ''} onClick={() => this.filterEvent('active')}>未开始</span>
        <span className={this.props.status === 'all' ? 'active' : ''} onClick={() => this.filterEvent('all')}>全部</span>
      </div>
    )
  }
}

export default TodoBottom