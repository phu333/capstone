import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import {
    IdcardOutlined, BankOutlined, HomeOutlined, MailOutlined
    , CloudUploadOutlined, RedoOutlined
} from '@ant-design/icons';
import { createCustomer, customerInformation } from '../actions/CustomerAction'
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox,Space,Card } from 'antd';
import CustomerTable from './CustomerTable'

import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 10,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 10,
    },
};
class AddCustomer extends React.Component {
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

            name: 'John',
            company: "cty 369",
            address: '10 Downing Street',
            status: "active",

        }


        this.props.onSubmit(contract1)
        this.setState({
            finish: true
        })

    };
    Cancel = () => {
        this.setState({
            finish: true
        })
    }
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        if (this.state.finish) {
            return (<Router>
                <Redirect push to={"/capstone/customerList"}  />
                <Route exact path="/capstone/customerList" component={CustomerTable} />
              </Router>);
        } else {


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
                                    label="Tên doanh nghiệp"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên doanh nghiệp',
                                        },
                                    ]}
                                >
                                    <Input placeholder="tên doanh nghiệp" />
                                </Form.Item>
                                <Form.Item
                                    label="Mã số thuế"
                                    name="taxcode"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên mst',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Mã số thuế" />
                                </Form.Item>

                                <Form.Item
                                    label="Giấy phép kinh doanh"
                                    name="certificate"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập giấy phép',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Giấy phép kinh doanh" />
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
                                    label="Số tài khoản"
                                    name="bankaccount"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Số tài khoản',
                                        },
                                    ]}
                                >
                                   <Input placeholder="Số tài khoản" />
                                </Form.Item>
                                <Form.Item
                                    label="Người đại diện"
                                    name="role"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Người đại diện',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Người đại diện" />
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
}
var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (customer) => {
            dispatch(createCustomer(customer))
        }
    }
}

export default connect(null, mapDispatchToProps)(AddCustomer)