import React from 'react';
// import Popup from 'reactjs-popup';
import 'antd/dist/antd.css';
import '../../index.css';
import { createEmployee, employeeInformation } from '../../actions/EmployeeAction'
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox, Space, Card } from 'antd';
// import {
//     IdcardOutlined, BankOutlined, HomeOutlined, MailOutlined
//     , CloudUploadOutlined, RedoOutlined, ReloadOutlined
// } from '@ant-design/icons';
import EmployeeTable from '../Table/EmployeeTable'
import axios from 'axios'
import "../Column.css"
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
        console.log(values);
        axios({
            url: '/api/Account/register',
            method: "POST",
            data: values
        })
            .then( (response)=> {
               
                return response.data.data;
            })
            .then( (data)=> {
                console.log(data)
                // let loginInfo = {
                //     username: "Tri",
                //     email: "triphan@gmail.com",
                //     password: "123Pa$$word!",
                //     signPermission: true,
                //     contractManagePermision: true,
                //     customerManagePermission: true,
                //     contractTypeManagePermission: true,
                //     employeeManagePermission: true,
                //     signatureManagePermission: true,
                //     editCompanyInformationPermission: true,
                //     loginCode: true,
                // }
    
                this.props.onSubmit(data)

            })
            .catch(error => {
                console.log(error)
            });

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
        if (this.state.finish) {
            return (<Router>
                <Redirect push to={"/capstone/employee"} />
                <Route exact path="/capstone/employee" component={EmployeeTable} /></Router>);
        } else {

            return (
                <Card>
                    <br />
                    <Button style={{ width: '80px' }} type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>
                    <h2 style={{ textAlign: 'center' }}>Tạo nhân viên</h2>

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
                            <Input placeholder="Họ và tên" />
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
                            <Input placeholder="cmnd/cmt" />
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
                            <Input placeholder="tên người dùng" />
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
                            <Input placeholder="Điện thoại" />
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
                            <Input placeholder="Địa chỉ" />
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
                            <Input placeholder="Email" />
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
                            <Input placeholder="Chức vụ" />
                        </Form.Item>
                        <Form.Item {...tailLayout} name="signPermission" valuePropName="checked" >
                            
                            <Checkbox checked={true} >Quyền ký</Checkbox>

                        </Form.Item>
                        <Form.Item {...tailLayout} name="employeePermission" valuePropName="checked" >
                            <Checkbox>Quyền quản lý nhân viên</Checkbox>

                        </Form.Item>
                        <Form.Item {...tailLayout} name="contractPermission" valuePropName="checked" >
                            <Checkbox>Quyền quản lý hợp đồng(Bao gồm quyền quản lý loại hợp đồng)</Checkbox>

                        </Form.Item>
                        <Form.Item {...tailLayout} name="customerPermission" valuePropName="checked" >
                            <Checkbox>Quyền quản lý khách hàng</Checkbox>

                        </Form.Item>
                        <Form.Item {...tailLayout} name="companyInfoPermission" valuePropName="checked" >
                            <Checkbox>Quyền chỉnh sửa thông tin doanh nghiệp</Checkbox>

                        </Form.Item>



                        <Form.Item {...tailLayout}>
                            <Space size="large">
                                <Button type="primary" htmlType="submit" >
                                    Nộp
                                </Button>
                                <Button type="primary" htmlType="reset" >
                                    Reset
                                </Button>


                            </Space>
                        </Form.Item>
                       




                    </Form>




                </Card >
            );
        }
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