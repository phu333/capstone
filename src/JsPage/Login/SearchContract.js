import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
const { Search } = Input;
class SearchContractByCode extends React.Component{
    render(){
        const onSearch = value => console.log(value);
        return(<Search placeholder="input search text" onSearch={onSearch} enterButton />);
    }
}
export default SearchContractByCode;