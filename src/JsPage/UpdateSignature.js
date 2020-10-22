import React from 'react';

import 'antd/dist/antd.css';
import '../index.css';
import { createSignature, signatureInformation } from '../actions/SignatureAction'
import { connect } from 'react-redux'
import { Form, Input, Button,Card,Space,DatePicker } from 'antd';
import {
    IdcardOutlined, BankOutlined, HomeOutlined, MailOutlined
    , CloudUploadOutlined, RedoOutlined
} from '@ant-design/icons';

import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
const { RangePicker } = DatePicker;
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

class UpdateSignature extends React.Component {
    constructor() {
        super();

        this.state = {

        };

        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        console.log(values);




    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    render() {
        console.log("Here")

        return (
            <div >

                <Button type="primary" value="cancel" onClick={this.Cancel}>
                    Trở về
              </Button>
                <h2 style={{ textAlign: 'center' }}>Thông tin chữ ký</h2>
                <Card>
                <Form
                    {...layout}
                    name="basic"
                    className="employee-form"

                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}

                >

                    <Form.Item
                        label="Số serial"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Số serial ',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Nhà cung cấp"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Nhà cung cấp ',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Thời hạn"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Thời hạn',
                            },
                        ]}
                    >
                        <RangePicker
                            showTime={{ format: 'HH:mm' }}
                            format="YYYY-MM-DD HH:mm"
                            onChange={this.onChange}
                            onOk={this.onOk}
                        />
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
            </div >
        );
    }

}


export default UpdateSignature;