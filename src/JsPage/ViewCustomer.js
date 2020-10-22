import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';

import { Form, Input, Button, Checkbox, Card, Space } from 'antd';
import {
    IdcardOutlined, BankOutlined, HomeOutlined, MailOutlined
    , CloudUploadOutlined, RedoOutlined
} from '@ant-design/icons';
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

class ViewCustomer extends React.Component {
    constructor() {
        super();

        this.state = {
            isEdit: false
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
                        label="Tên doanh nghiệp"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên doanh nghiệp',
                            },
                        ]}
                    >
                        {this.state.isEdit === false ?
                            <Input disabled defaultValue="Fsoft" /> :
                            <Input defaultValue="Fsoft" />}
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
                         {this.state.isEdit === false ?
                            <Input disabled defaultValue="12345" /> :
                            <Input defaultValue="12345" />}
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
                        {this.state.isEdit === false ?
                            <Input disabled defaultValue="4234234" /> :
                            <Input defaultValue="4234234" />}
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
                            <Input disabled defaultValue="12312322424" /> :
                            <Input defaultValue="12312322424" />}
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
                            <Input disabled defaultValue="12/5/6/8" /> :
                            <Input defaultValue="12/5/6/8" />}
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
                            <Input disabled defaultValue="Some email" /> :
                            <Input defaultValue="Some email" />}
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
                        {this.state.isEdit === false ?
                            <Input disabled defaultValue="34534534534534" /> :
                            <Input defaultValue="34534534534534" />}
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
                        {this.state.isEdit === false ?
                            <Input disabled defaultValue="Nguyen Van B" /> :
                            <Input defaultValue="Nguyen Van B" />}
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




            </Card >
        );
    }

}


export default ViewCustomer;