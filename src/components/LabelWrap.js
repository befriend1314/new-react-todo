import React, {Component} from 'react'

class LabelWrap extends Component {
  constructor() {
    super()
    this.state = {
      editable: false // 通过editable 来控制显示隐藏修改的输入框
    }
  }
  // 按回车的时候修改数据
  handleKeyUp(e) {
    if(e.keyCode === 13) {
      let id = e.target.name
      let str = e.target.value.trim()
      if(str === '') return false
      // 把id 和 修改值传出去父组件统一修改
      this.props.labelEdit(id, str)
      this.setState({
        editable: false
      })
    }
  }

  // 双击时候聚焦输入框
  handleDoubleClick(e) {
    const inputEle = e.target.parentNode.firstChild
    this.setState({
      editable: true
    }, () => {
      inputEle.focus()
    })
  }

  // 编辑框失去焦点时隐藏
  handleBlur() {
    this.setState({
      editable: false
    })
  }

  render() {
    return (
      <div className={this.state.editable? 'labelWrap editing' : 'labelWrap'}>
        <input type="text" name={this.props.list.id} defaultValue={this.props.list.txt} onKeyUp={this.handleKeyUp.bind(this)} onBlur={this.handleBlur.bind(this)} />
        <label className={ this.props.list.completed ? 'checked': ''} onDoubleClick={this.handleDoubleClick.bind(this)}>{this.props.list.txt}</label>
      </div>
    )
  }
}

export default LabelWrap