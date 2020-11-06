import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { createEmployee, employeeInformation } from '../../actions/EmployeeAction'
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox, Space, Card, Popover,Row,Col } from 'antd';
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
const Validation = (

    <p>Nên để họ tên thật</p>

);
class AddUserAdmin extends React.Component {
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
            .then((response) => {

                return response.data.data;
            })
            .then((data) => {
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
                        hideRequiredMark
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
                            <Row gutter={8}><Col span={22}> <Input placeholder="Họ và tên" /></Col><Popover content={Validation} trigger="hover">
                                <Button style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
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
                            <Row gutter={8}>   <Col span={22}> <Input placeholder="cmnd/cmt" /></Col><Popover content={Validation} trigger="hover">
                                <Button style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
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
                            <Row gutter={8}>   <Col span={22}> <Input placeholder="tên người dùng" /></Col><Popover content={Validation} trigger="hover">
                                <Button style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
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
                            <Row gutter={8}>      <Col span={22}> <Input placeholder="Điện thoại" /></Col><Popover content={Validation} trigger="hover">
                                <Button style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
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
                            <Row gutter={8}>     <Col span={22}> <Input placeholder="Địa chỉ" /></Col><Popover content={Validation} trigger="hover">
                                <Button style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
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
                            <Row gutter={8}>   <Col span={22}> <Input placeholder="Email" /></Col><Popover content={Validation} trigger="hover">
                                <Button style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
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
                            <Row gutter={8}>    <Col span={22}> <Input placeholder="Chức vụ" /></Col><Popover content={Validation} trigger="hover">
                                <Button style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
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




                </Card >);
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
export default connect(null, mapDispatchToProps)(AddUserAdmin);