import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../index.css';
import { Steps, Form, Button,Space } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import AddUserAdmin from './AddUserAdmin';
import AddCompany from './AddCompany';
import axios from 'axios'
const { Step } = Steps;
const layout = {
    labelCol: {
        span: 6,

    },
    wrapperCol: {
        span: 14,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 10,
    },
};

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            finish: false,
            isEdit: false,
            current: 0,
        };
        
        this.onChange = this.onChange.bind(this);
    }
    
    onChange = (current) => {
        console.log('onChange:', current);
        this.setState({ current });
    };
    render() {

        return (
            <div>
                

                    <Steps type="navigation"
                        current={this.state.current}
                        onChange={this.onChange}
                        className="site-navigation-steps">
                        <Step title="Đăng ký công ty" icon={<UserOutlined />} ></Step>
                        <Step title="Đăng ký Account chủ" icon={<SolutionOutlined />} ></Step>
                        

                    </Steps>
            
                    {this.state.current === 0 ? <AddCompany /> : <AddUserAdmin />}
                    
                

            </div>
        );
    }


}
export default Register