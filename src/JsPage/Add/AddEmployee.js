import React from 'react';
// import Popup from 'reactjs-popup';
import 'antd/dist/antd.css';
import '../../index.css';
import { createEmployee, employeeInformation } from '../../actions/EmployeeAction'
import { connect } from 'react-redux'
import { Form, Input, Button, Switch, Space, Card, Select, Col, Row,Popover } from 'antd';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { CloseOutlined, CheckOutlined,QuestionCircleOutlined } from '@ant-design/icons';
// import {
//     IdcardOutlined, BankOutlined, HomeOutlined, MailOutlined
//     , CloudUploadOutlined, RedoOutlined, ReloadOutlined
// } from '@ant-design/icons';
import EmployeeTable from '../Table/EmployeeTable'
import axios from 'axios'
import "../Column.css"

import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom'
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
const names = (

    <p>Nhập Username khoảng 8 đến 10 ký tự</p>

);
const ValidationFName = (

    <p>Họ nhân viên</p>

);
const ValidationLName = (

    <p>Tên nhân viên</p>

);
const ValidationAdd = (

    <p>Số địa chỉ công ty</p>

); const ValidationPhone = (

    <p>Số điện thoại </p>

); const ValidationEmail = (

    <p>Địa chỉ email</p>

); const ValidationTax = (

    <p>Mã số thuế của công ty khách hàng</p>

); const ValidationRole = (

    <p>Chức vụ trong công ty có thể để trống</p>

);

class AddEmployee extends React.Component {
    constructor() {
        super();
        this.state = {
            finish: false,
            signPermission: false,
            employeePermission: false,
            contractPermission: false,
            customerPermission: false,
            companyInfoPermission: false,
            permission: [],
        };
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {

        let employeeInfo = {
            firstname: values.firstName,
            lastname: values.lastName,
            email: values.email,
            password: "123Pa$$word!",
            confirmPassword: "123Pa$$word!",
            username: values.username,
            role: values.role
        }
        axios({
            url: '/api/Account/register-employee',
            method: "POST",
            data: employeeInfo,
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            }
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

                // this.props.onSubmit(data)

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
        var i = 0;
        function onChange(e) {
            if (e.target == "checked") { i--; }
            else { i++ }
            console.log('checked = ${e.target.checked}');
        }
        if (this.state.finish) {
            return (<Router>
                <Redirect push to={"/capstone/employee"} />
                <Route exact path="/capstone/employee" render={() => <EmployeeTable token={this.props.token} role={this.props.role} />
                } /></Router>);
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
                            label=" tên"
                            name="firstName"
                            rules={[

                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên ',
                                },
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}><Input placeholder="Tên" /> </Col>    <Popover content={ValidationLName} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                        </Form.Item>
                        <Form.Item
                            label="Họ "
                            name="lastName"
                            rules={[

                                {
                                    required: true,
                                    message: 'Vui lòng nhập họ ',
                                },
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}><Input placeholder="Họ" /> </Col>    <Popover content={ValidationFName} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                        </Form.Item>
                        {/* <Form.Item
                            label="cmnd/cmt"
                            name="id"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập cmnd/cmt ',
                                },
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}><Input placeholder="cmnd/cmt" /> </Col>    <Popover content={names} trigger="hover">
                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                    </Popover></Row>
                        </Form.Item> */}
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
                            <Row gutter={8}> <Col span={20}><Input placeholder="tên người dùng" /> </Col>    <Popover content={names} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                        </Form.Item>


                        {/* <Form.Item
                            label="Điện thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập sdt',
                                    min: 10,
                                    max: 10,
                                },
                                {
                                    
                                    message: 'Vui lòng nhập 10 ký tự',
                                    min: 10,
                                    max: 10,
                                },
                            ]}
                        >
                            <Input prefix="+84" placeholder="số điện thoại" /> </Col>    <Popover content={names} trigger="hover">
                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                    </Popover></Row>
                        </Form.Item> */}
                        {/* <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Địa chỉ',
                                },
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}><Input placeholder="Địa chỉ" /> </Col>    <Popover content={names} trigger="hover">
                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                    </Popover></Row>
                        </Form.Item> */}
                        <Form.Item
                            label="Email"
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
                            <Row gutter={8}> <Col span={20}><Input placeholder="Email" /> </Col>    <Popover content={ValidationEmail} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
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
                            <Select>
                                <Select.Option value={2}>giám đốc</Select.Option>
                                <Select.Option value={3}>nhân viên</Select.Option>
                            </Select>
                        </Form.Item>
                        <Grid item xs={12}>
                            <b>Quyền Hạn</b>
                            <br />
                            <Row>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={onChange} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />}
                                        label="Ký"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={onChange} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />}
                                        label="Thêm hợp đồng"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={onChange} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />}
                                        label="Sửa hợp đồng"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={onChange} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />}
                                        label="Quản lý nhân viên"
                                    />

                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={onChange} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />}
                                        label="Quản lý loại hợp đồng"
                                    />

                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={onChange} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />}
                                        label="Quản lý chữ ký"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={onChange} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />}
                                        label="Quản lý khách hàng"
                                    />
                                    <p></p>
                                </Col>
                            </Row>
                        </Grid>



                        <Form.Item {...tailLayout}>
                            <Space size="large">
                                <Button type="primary" htmlType="submit" htmlType="submit" >
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