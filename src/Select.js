import react from 'react'
import { Select } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;
function TestSelect() {
  const children = [
    {
      id: '1',
      value: '1',
      label: '星期日'
    },
    {
      id: '2',
      value: '2',
      label: '星期一'
    },
    {
      id: '3',
      value: '3',
      label: '星期二'
    }
  ]



  function handleChange(value) {
    console.log('selected', value);
  }
  return(
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      labelInValue={true}
      defaultValue={children}
      onChange={handleChange}
    >
      {children.map(item => (
        <Option key={item.key} title={item.label}>{item.label}</Option>
      ))}
    </Select>
  )
}

export default TestSelect;