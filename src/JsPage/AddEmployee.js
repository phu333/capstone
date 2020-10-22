import React from 'react';
import Popup from 'reactjs-popup';
import 'antd/dist/antd.css';
import '../index.css';
import { createEmployee, employeeInformation } from '../actions/EmployeeAction'
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox,Space,Card } from 'antd';
import {
    IdcardOutlined, BankOutlined, HomeOutlined, MailOutlined
    , CloudUploadOutlined, RedoOutlined, ReloadOutlined
} from '@ant-design/icons';


import "./Column.css"
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
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
const middleLayout = {
    wrapperCol: {
        offset: 6,
        span: 10,
    },
};
class AddEmployee extends React.Component {
    constructor() {
        super();
        this.state = {
            finish: false
        };
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        const contract1 = {
            name: 'Mike',
            email: "some email",
            address: '10 Downing Street',
            status: "active",
            role: "secretery"
        }

        this.props.onSubmit(contract1)
        this.setState({
            finish: true
        })

    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    Cancel = () => {
        this.setState({
            finish: true
        })
    }
    render() {

        
        return (
            <Card>
                <br />
                <Button style={{width:'80px' }} type="primary" value="cancel" onClick={this.Cancel}>
                    Trở về
              </Button>
                <h2 style={{ textAlign: 'center'}}>Tạo nhân viên</h2>
                
                    <Form
                                {...layout}
                                name="basic"
                                className="employee-form"
                                
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}

                            >
                                
                                <Form.Item
                                    label="Họ và tên"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên ',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="cmnd/cmt"
                                    name="id"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập cmnd/cmt ',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Tên người dùng"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên người dùng',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                {/* <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Mật khẩu',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item> */}
                                <Form.Item
                                    label="Điện thoại"
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập sdt',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Địa chỉ"
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Địa chỉ',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="Email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Email',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Chức vụ"
                                    name="role"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Chức vụ',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item {...middleLayout} name="signPermission" valuePropName="unchecked" >
                                    <Checkbox>Quyền ký</Checkbox>
                                    
                                </Form.Item>
                                <Form.Item {...middleLayout} name="employeePermission" valuePropName="unchecked" >
                                    <Checkbox>Quyền quản lý nhân viên</Checkbox>
                                    
                                </Form.Item>
                                <Form.Item {...middleLayout} name="contractPermission" valuePropName="unchecked" >
                                    <Checkbox>Quyền quản lý hợp đồng(Bao gồm quyền quản lý loại hợp đồng)</Checkbox>
                                    
                                </Form.Item>
                                <Form.Item {...middleLayout} name="customerPermission" valuePropName="unchecked" >
                                    <Checkbox>Quyền quản lý khách hàng</Checkbox>
                                    
                                </Form.Item>
                                <Form.Item {...middleLayout} name="companyInfoPermission" valuePropName="unchecked" >
                                    <Checkbox>Quyền chỉnh sửa thông tin doanh nghiệp</Checkbox>
                                    
                                </Form.Item>



                                <Form.Item {...tailLayout}>
                                    <Space size="large">
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Nộp
                                </Button>
                                <Button type="primary" htmlType="reset" className="login-form-button">
                                            Reset
                                </Button>
                               
                                        
                                    </Space>
                                </Form.Item>
                                <Form.Item>

                                </Form.Item>




                            </Form>
                        
                        
                        
                   
            </Card >
        );
    }
}

var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (employee) => {
            dispatch(createEmployee(employee))
        }
    }
}
export default connect(null, mapDispatchToProps)(AddEmployee);