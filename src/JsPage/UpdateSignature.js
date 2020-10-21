import React from 'react';

import 'antd/dist/antd.css';
import '../index.css';
import {
    IdcardOutlined, BankOutlined, HomeOutlined, MailOutlined
    , CloudUploadOutlined, RedoOutlined
} from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
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


        
            return (
                <div style={{
                    margin: "auto",
                    width: "1000px",
                    paddingLeft:"50px",
                    border:"solid"
                }
                }>
                    <h2 style={{ textAlign: 'center' }}>Thông tin chữ ký</h2>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        labelAlign="left"
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    ><br />
                        <Form.Item
                            label={(<b><IdcardOutlined />{"Tên doanh nghiệp"} </b>)}
                            name="companyname"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên doanh nghiệp',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
    
                        <Form.Item
                            label={(<b><MailOutlined /> {"Địa chỉ Email"} </b>)}
                            name="email"
                            requiredMark="false"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Địa chỉ email',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={(<b><BankOutlined /> {"Mã số thuế"} </b>)}
                            name="taxcode"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Mã số thuế',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={(<b><HomeOutlined /> {"Địa chỉ"} </b>)}
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
    
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                <CloudUploadOutlined /> Nộp
                                </Button>
                            <Button type="primary" style={{
                                margin: '0 8px',
                            }} htmlType="button">
                                <RedoOutlined />    Reset
                                </Button>
                        </Form.Item>
                    </Form>
                </div >
            );
    }

}


export default UpdateSignature;