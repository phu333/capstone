import React from 'react';
import Popup from 'reactjs-popup';
import 'antd/dist/antd.css';
import '../index.css';
import { createEmployee, employeeInformation } from '../actions/EmployeeAction'

import { Space, Card, Button, Descriptions, Avatar,Form,Input } from 'antd';
import {
    IdcardOutlined, BankOutlined, HomeOutlined, UserOutlined
    , CloudUploadOutlined, RedoOutlined, ReloadOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux'

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

class UpdateProfile extends React.Component {
    constructor() {
        super();

        this.state = {
            isEdit: false,
        };

        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        console.log(values);




    };
    onEdit = (values) => {
        this.setState({
            isEdit: true
        })




    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    render() {
       
        var information = this.props.myLoginReducer.map((login, index) => {
            return (

                <React.Fragment>

                    <h2 style={{ textAlign: 'center' }}>Thông tin cá nhân</h2>
                    <Space direction="horizontal" align="start"  >


                        <Card style={{ width: 400, height: 300 }}>
                            <Descriptions size="small" column={1}   >

                                <Descriptions.Item><Avatar size={100} icon={<UserOutlined />} /> </Descriptions.Item>



                                <Descriptions.Item><br />
                                    <b >{login.username}</b><br />

                                    <b >Company ABC</b>
                                </Descriptions.Item>

                            </Descriptions>
                        </Card>
                        <Card style={{ width: 600, height: 600 }}>
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
                                    {this.state.isEdit === false ?
                                    <Input disabled defaultValue="Nguyen Van D" /> :
                                    <Input defaultValue="Nguyen Van D" />}
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
                                    {this.state.isEdit === false ?
                                    <Input disabled defaultValue="324242342342" /> :
                                    <Input defaultValue="324242342342" />}
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
                                    <Input disabled defaultValue="Ak95" />
                                </Form.Item>

                                <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Mật khẩu',
                                        },
                                    ]}
                                >
                                    {this.state.isEdit === false ?
                                    <Input.Password disabled defaultValue="123" /> :
                                    <Input.Password defaultValue="123" />}
                                   
                                </Form.Item>
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
                                    {this.state.isEdit === false ?
                                    <Input disabled defaultValue="123123" /> :
                                    <Input defaultValue="123123" />}
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
                                   {this.state.isEdit === false ?
                                    <Input disabled defaultValue="12/3/4" /> :
                                    <Input defaultValue="12/3/4" />}
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
                                    {this.state.isEdit === false ?
                                    <Input disabled defaultValue="Email" /> :
                                    <Input defaultValue="Email" />}
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
                                   <Input disabled defaultValue="Giám đốc" />
                                </Form.Item>
                               



                                <Form.Item {...tailLayout}>
                                    <Space size="large">
                                    {this.state.isEdit === true ? <Button type="primary" htmlType="submit" className="login-form-button">
                                        Nộp
                            </Button> : null}
                                    {this.state.isEdit === true ? <Button type="primary" htmlType="reset" className="login-form-button">
                                        Reset
                            </Button> : null}

                                    {this.state.isEdit === false ? <Button type="primary" onClick={this.onEdit} className="login-form-button">
                                        Sửa
                            </Button> : null}
                               
                                        
                                    </Space>
                                </Form.Item>
                                <Form.Item>

                                </Form.Item>




                            </Form>
                            
                        </Card>









                    </Space>
                </React.Fragment >
            );
        })
        if (this.props.myLoginReducer === "Logout") {


        } else {
            return (<div style={{ height: "100vh" }}> {information}</div >);
        }
    }
}
var mapStateToProps = state => {
    console.log(state.myLoginReducer)
    return {
        myLoginReducer: state.myLoginReducer
    }
}
export default connect(mapStateToProps, null)(UpdateProfile);