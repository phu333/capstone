import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import {
    IdcardOutlined, BankOutlined, HomeOutlined, MailOutlined
    , CloudUploadOutlined, RedoOutlined
} from '@ant-design/icons';
import { createCustomer, customerInformation } from '../actions/CustomerAction'
import { connect } from 'react-redux'
import { Form, Input, Button, Row, Col, Card, Space } from 'antd';
import CustomerTable from './CustomerTable'

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
class UpdateProfileCompany extends React.Component {
    constructor() {
        super();
        this.state = {
            finish: false,
            isEdit: false,
        };
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {


        this.setState({
            finish: true
        })

    };
    Cancel = () => {
        this.setState({
            finish: true
        })
    }
    onEdit = (values) => {
        this.setState({
            isEdit: true
        })




    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        if (this.state.finish) {
            return (<Router>
                <Redirect push to={"/capstone/customerList"} />
                <Route exact path="/capstone/customerList" component={CustomerTable} />
            </Router>);
        } else {


            return (


                <React.Fragment>
                    <Card>
                        <h2 style={{ textAlign: 'center' }}>Thông tin doanh nghiệp</h2>
                        <Form
                            {...layout}
                            name="basic"
                            className="employee-form"

                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}

                        >
                            <Form.Item
                                label="Tên doanh nghiệp"
                                name="company"
                                
                            >
                                {this.state.isEdit === false ?
                                    <Input disabled defaultValue="HiSign" /> :
                                    <Input defaultValue="HiSign" />}
                            </Form.Item>
                            <Form.Item
                                label="Mã số thuế"
                                name="name"
                                
                            >
                                {this.state.isEdit === false ?
                                    <Input disabled defaultValue="1231231" /> :
                                    <Input defaultValue="1231231" />}
                            </Form.Item>
                            <Form.Item
                                label="Điện thoại"
                                name="phone"
                                
                            >
                               {this.state.isEdit === false ?
                                    <Input disabled defaultValue="123123123" /> :
                                    <Input defaultValue="123123123" />}
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                
                            >
                                {this.state.isEdit === false ?
                                    <Input disabled defaultValue="12/10/4/8" /> :
                                    <Input defaultValue="12/10/4/8" />}
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="Email"
                                
                            >
                                {this.state.isEdit === false ?
                                    <Input disabled defaultValue="Email" /> :
                                    <Input defaultValue="Email" />}
                            </Form.Item>
                            <Form.Item
                                label="Giấy phép kinh doanh"
                                name="certificate"
                                
                            >
                                {this.state.isEdit === false ?
                                    <Input disabled defaultValue="34534534" /> :
                                    <Input defaultValue="34534534" />}
                            </Form.Item>
                            <Form.Item
                                label="Tài khoản ngân hàng"
                                name="bankaccount"
                                
                            >
                                {this.state.isEdit === false ?
                                    <Input disabled defaultValue="34534534" /> :
                                    <Input defaultValue="34534534" />}
                            </Form.Item>
                            <Form.Item
                                label="Người đại diện"
                                name="presentor"
                                
                            >
                                {this.state.isEdit === false ?
                                    <Input disabled defaultValue="Nguyen Van A" /> :
                                    <Input defaultValue="Nguyen Van A" />}
                            </Form.Item>



                            <Form.Item
                                label="Chức vụ"
                                name="role"
                                
                            >
                                {this.state.isEdit === false ?
                                    <Input disabled defaultValue="Giám đốc" /> :
                                    <Input defaultValue="Giám đốc" />}
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
                </React.Fragment>


            );
        }
    }
}


export default UpdateProfileCompany;
