import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { createEmployee, employeeInformation } from '../../actions/EmployeeAction'
import { connect } from 'react-redux'
import { Form, Input, Button, Row, Space, Card, Popover, Col } from 'antd';
import {
    QuestionCircleOutlined
} from '@ant-design/icons';
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
const name = (

    <p>Nên để họ tên thật</p>

);

class AddUserAdmin extends React.Component {
    constructor() {
        super();
        this.state = {
            finish: false
        };
        this.onFinish = this.onFinish.bind(this);

    }
    onFinish = (values) => {
        console.log(values);
        axios({
            url: '/api/Account/register',
            method: "POST",
            data: values
        })
            .then((response) => {

                return response.data.data;
            })
            .then((data) => {




            })
            .catch(error => {
                console.log(error)
            });


    };
    Cancel = () => {
        this.setState({
            finish: true
        })
    }
    render() {

        return (
            <Card style={{ backgroundColor: 'rgb(8, 59, 102)' }}>
                <br />
                <Button style={{ width: '80px' }} type="primary" value="cancel" onClick={this.Cancel}>
                    Trở về
              </Button>
                <h2 style={{ textAlign: 'center', color: 'white' }}>Tạo thông tin user</h2>

                <Form
                    {...layout}
                    name="basic"
                    className="employee-form"
                    hideRequiredMark
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >

                    <Form.Item
                        label={<label style={{ color: "white" }}> tên</label>}
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên ',
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input placeholder="Họ" /></Col>    <Popover content={name} trigger="hover">
                            <Button shape="circle" border="none" size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>                    </Form.Item>
                    <Form.Item
                        label={<label style={{ color: "white" }}>Họ </label>}
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên ',
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input placeholder="Tên" /></Col>    <Popover content={name} trigger="hover">
                            <Button shape="circle" border="none" size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>


                    </Form.Item>
                    <Form.Item
                        label={<label style={{ color: "white" }}>Email</label>}
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Vui lòng nhập Email',
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input placeholder="Email" /></Col>    <Popover content={name} trigger="hover">
                            <Button shape="circle" border="none" size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>

                    </Form.Item>
                    <Form.Item
                        label={<label style={{ color: "white" }}>cmnd/cmt</label>}
                        name="userId"
                        rules={[

                            {
                                required: true,
                                message: 'Vui lòng nhập cmnd/cmt ',
                                min: 10,
                                max: 10,
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input placeholder="cmnd/cmt" /> </Col>    <Popover content={name} trigger="hover">
                            <Button shape="circle" border="none" size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>

                    </Form.Item>
                    <Form.Item
                        label={<label style={{ color: "white" }}>Tên người dùng</label>}
                        name="userName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên người dùng',
                                min: 6,
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input placeholder="tên người dùng" /> </Col>    <Popover content={name} trigger="hover">
                            <Button shape="circle" border="none" size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>

                    </Form.Item>
                    <Form.Item
                        label={<label style={{ color: "white" }}>Mật khẩu</label>}
                        name="password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Mật khẩu',

                            },
                            {

                                message: 'Vui lòng nhập 6 kí tự',
                                min: 6,
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input.Password /></Col>    <Popover content={name} trigger="hover">
                            <Button shape="circle" border="none" size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label={<label style={{ color: "white" }}>xác nhận mật khẩu</label>}
                        name="confirmPassword"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Mật khẩu',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('Vui lòng nhập lại Mật khẩu');
                                },
                            }),
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input.Password /></Col>    <Popover content={name} trigger="hover">
                            <Button shape="circle" border="none" size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>

                    </Form.Item>
                    <Form.Item
                        label={<label style={{ color: "white" }}>Tên doanh nghiệp</label>}
                        name="companyName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên ',
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input /></Col>
                            <Popover content={name} trigger="hover">
                                <Button shape="circle" border="none" size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label={<label style={{ color: "white" }}>Mã số thuế</label>}
                        name="taxCode"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mst ',

                            },
                            {

                                message: 'Vui lòng nhập 10 ký tự',
                                min: 10,
                                max: 10,
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input /></Col>    <Popover content={name} trigger="hover">
                            <Button shape="circle" border="none" size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label={<label style={{ color: "white" }}>Giấy phép kinh doanh</label>}
                        name="businessLicense"
                        required
                    >
                        <Row gutter={8}> <Col span={20}><Input /></Col>    <Popover content={name} trigger="hover">
                            <Button shape="circle" border="none" size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label={<label style={{ color: "white" }}>Tài khoản ngân hàng</label>}
                        name="bankAccount"

                    >
                        <Row gutter={8}> <Col span={20}><Input /></Col>    <Popover content={name} trigger="hover">
                            <Button shape="circle" border="none" size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label={<label style={{ color: "white" }}>Điện thoại</label>}
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập sdt',
                                min: 10,
                                max: 10,
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input prefix="+84" placeholder="Điện thoại" /></Col>    <Popover content={name} trigger="hover">
                            <Button shape="circle" border="none" size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label={<label style={{ color: "white" }}>Địa chỉ</label>}
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Địa chỉ',
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input placeholder="Địa chỉ" /></Col>    <Popover content={name} trigger="hover">
                            <Button shape="circle" border="none" size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
                    </Form.Item>

                    <Form.Item
                        label={<label style={{ color: "white" }}>Chức vụ</label>}
                        name="userRole"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Chức vụ',
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input placeholder="Chức vụ" /></Col>    <Popover content={name} trigger="hover">
                            <Button shape="circle" border="none" size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
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


export default AddUserAdmin;