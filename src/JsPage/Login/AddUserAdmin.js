import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';

import LoginPage from './LoginPage'
import { Form, Input, Button, Row, Space, Card, Popover, Col, message, Select } from 'antd';
import {
    QuestionCircleOutlined
} from '@ant-design/icons';

import axios from 'axios'
import "../Column.css"
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import FadeIn from 'react-fade-in'
const { TextArea } = Input;

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
const ValidationCompany = (

    <p>Tên công ty được in trên hợp đồng nên để tên dưới 250 ký tự</p>

);
const ValidationAdd = (

    <p>Số địa chỉ công ty</p>

); const ValidationFPresentor = (

    <p>Tên người đại diện cho công ty </p>

);
const ValidationLPresentor = (

    <p>Họ người đại diện cho công ty </p>

); const ValidationCertificate = (

    <p>Mã giấy phép kinh doanh do nhà nước cấp</p>

); const ValidationCmt = (

    <p>Số chứng minh thư của người đại diện do nhà nước cấp</p>

); const ValidationEmail = (

    <p>Địa chỉ email của google</p>

); const ValidationTax = (

    <p>Mã số thuế của công ty nhập dưới 10 ký tự</p>

); const ValidationRole = (

    <p>Chức vụ trong công ty có thể để trống</p>

); const ValidationPhone = (

    <p>Số điện thoại công ty dưới 10 ký tự</p>

); const ValidationPass = (

    <p>Vui lòng nhập password với 6 ký tự</p>

); const ValidationBank = (

    <p>8 số cuối của mã số ngân hàng trên thẻ của công ty</p>

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
        values["permissions"] = [
            { userId: "", permissionId: 1, permissionName: "UpdateCompany", enabled: true },
            { userId: "", permissionId: 2, permissionName: "AddCustomer", enabled: true },
            { userId: "", permissionId: 3, permissionName: "Sign", enabled: true },
            { userId: "", permissionId: 4, permissionName: "GetContractList", enabled: true },
            { userId: "", permissionId: 5, permissionName: "ActiveDeactiveContract", enabled: true },
            { userId: "", permissionId: 6, permissionName: "UpdateContract", enabled: true },
            { userId: "", permissionId: 7, permissionName: "CreateContract", enabled: true },
            { userId: "", permissionId: 8, permissionName: "GetAllCompanyTemplate", enabled: true },
            { userId: "", permissionId: 9, permissionName: "ActiveDeactiveTemplate", enabled: true },
            { userId: "", permissionId: 10, permissionName: "UpdateTemplate", enabled: true },
            { userId: "", permissionId: 11, permissionName: "UpdateCustomer", enabled: true },
            { userId: "", permissionId: 12, permissionName: "CreateTemplate", enabled: true },
            { userId: "", permissionId: 13, permissionName: "GetCompanyAdminList", enabled: true },
            { userId: "", permissionId: 14, permissionName: "ActiveDeactiveAccount", enabled: true },
            { userId: "", permissionId: 15, permissionName: "GetCompanyAccountListByCompanyId", enabled: true },
            { userId: "", permissionId: 16, permissionName: "UpdateAccountPermission", enabled: true },
            { userId: "", permissionId: 17, permissionName: "CreateAccount", enabled: true },
            { userId: "", permissionId: 18, permissionName: "ActiveDeactiveSignature", enabled: true },
            { userId: "", permissionId: 19, permissionName: "UpdateSignature", enabled: true },
            { userId: "", permissionId: 20, permissionName: "CreateSignature", enabled: true },
            { userId: "", permissionId: 21, permissionName: "GetAllCompanyList", enabled: true },
            { userId: "", permissionId: 22, permissionName: "GetAllCompanyAccount", enabled: true },
            { userId: "", permissionId: 23, permissionName: "ActiveDeactiveCustomer", enabled: true },
        ];
        console.log(values)
        axios({
            url: '/api/Account/register',
            method: "POST",
            data: values
        })
            .then((response) => {

                return response.data.data;
            })
            .then((data) => {
                this.setState({
                    finish: true
                })
                message.success("Đăng ký thành công")


            })
            .catch(error => {
                console.log(error)
                message.error("Đã có lỗi xảy ra vui lòng kiểm tra thông tin đã nhập và thử lại sau")
            });


    };
    Cancel = () => {
        this.setState({
            finish: true
        })
    }
    render() {
        if (this.state.finish) {
            return (<FadeIn>
                <Router>
                    <Redirect push to={"/capstone/Login"} />

                    <Route exact path="/capstone/Login" component={LoginPage} />
                </Router></FadeIn>
            );
        } else {
            return (
                <Card style={{ backgroundColor: 'rgb(8, 59, 102)' }}>
                    <br />

                    <Button style={{ width: '80px' }} type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>
                    <h2 style={{ textAlign: 'center', color: 'white' }}>Tạo thông tin Admin</h2>

                    <Form
                        {...layout}
                        name="basic"
                        className="employee-form"
                        

                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <div style={{ backgroundColor: 'white' }}>
                            <br />
                            <Row gutter={2}>
                                <Col span={12} >
                                    <Form.Item
                                        label="Họ "
                                        name="lastName"

                                    >
                                        <Row gutter={8}> <Col span={22}><Input placeholder="Họ" /></Col>    <Popover content={ValidationLPresentor} trigger="hover">
                                            <Button shape="circle" style={{ border: "none", backgroundColor: 'white' }} size="small" icon={<QuestionCircleOutlined style={{ verticalAlign: 'center' }} />} />
                                        </Popover></Row>


                                    </Form.Item>
                                </Col><Col span={12}>
                                <Form.Item
                                        label="Tên "
                                        name="firstName"

                                    >
                                        <Row gutter={8}> <Col span={22}><Input placeholder="Tên" /></Col>    <Popover content={ValidationLPresentor} trigger="hover">
                                            <Button shape="circle" style={{ border: "none", backgroundColor: 'white' }} size="small" icon={<QuestionCircleOutlined style={{ verticalAlign: 'center' }} />} />
                                        </Popover></Row>


                                    </Form.Item>

                                </Col></Row>
                            <Row gutter={2}>
                                <Col span={12} >
                                    <Form.Item
                                        label={"Chứng minh nhân dân "}
                                        name="userId"
                                        rules={[

                                            {
                                                required: true,
                                                message: 'Vui lòng nhập Chứng minh nhân dân ',
                                                min: 10,
                                                max: 10,
                                            },
                                        ]}
                                    >
                                        <Row gutter={8}> <Col span={22}><Input type="number" placeholder="Chứng minh nhân dân" /> </Col>    <Popover content={ValidationCmt} trigger="hover">
                                            <Button shape="circle" style={{ border: "none", backgroundColor: 'white' }} size="small" icon={<QuestionCircleOutlined style={{ verticalAlign: 'center' }} />} />
                                        </Popover></Row>

                                    </Form.Item>

                                </Col><Col span={12}>
                                    <Form.Item
                                        label={"username "}
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng tên user',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="text" />
                                    </Form.Item>
                                </Col></Row>

                            <Row gutter={2}>
                                <Col span={12} >
                                    <Form.Item
                                        label={"Mật khẩu "}
                                        name="password"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập Mật khẩu',

                                            },
                                            {

                                                message: 'Vui lòng nhập dưới 6 kí tự',
                                                min: 6,
                                            }, {
                                                pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!#$%\-_=+<>])([a-zA-Z0-9!#$%\-_=+<>]+)$/,
                                                message: "Xin hãy nhập có ít nhất 1 ký tự hoa,1 ký tự thường,1 số, 1 dấu đặc biệt"
                                            }
                                        ]}
                                    >
                                        <Row gutter={8}> <Col span={22}><Input.Password /></Col>    <Popover content={ValidationPass} trigger="hover">
                                            <Button shape="circle" style={{ border: "none", backgroundColor: 'white' }} size="small" icon={<QuestionCircleOutlined style={{ verticalAlign: 'center' }} />} />
                                        </Popover></Row>
                                    </Form.Item>
                                </Col><Col span={12}>
                                    <Form.Item
                                        label={"Xác nhận mật khẩu "}
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
                                        <Row gutter={8}> <Col span={22}><Input.Password /></Col>    <Popover content={ValidationPass} trigger="hover">
                                            <Button shape="circle" style={{ border: "none", backgroundColor: 'white' }} size="small" icon={<QuestionCircleOutlined style={{ verticalAlign: 'center' }} />} />
                                        </Popover></Row>

                                    </Form.Item>
                                </Col></Row>
                            <Row gutter={2}>
                                <Col span={12} >
                                    <Form.Item
                                        label={"Email "}
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
                                        <Row gutter={8}> <Col span={22}><Input placeholder="Email" /></Col>    <Popover content={ValidationEmail} trigger="hover">
                                            <Button shape="circle" style={{ border: "none", backgroundColor: 'white' }} size="small" icon={<QuestionCircleOutlined style={{ verticalAlign: 'center' }} />} />
                                        </Popover></Row>

                                    </Form.Item>
                                </Col><Col span={12}>
                                    <Form.Item
                                        label={"Điện thoại "}
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
                                        <Row gutter={8}> <Col span={22}><Input type="number" prefix="+84" placeholder="Điện thoại" /></Col>    <Popover content={ValidationPhone} trigger="hover">
                                            <Button shape="circle" style={{ border: "none", backgroundColor: 'white' }} size="small" icon={<QuestionCircleOutlined style={{ verticalAlign: 'center' }} />} />
                                        </Popover></Row>
                                    </Form.Item></Col></Row>
                        </div>
                        <br />
                        <h2 style={{ textAlign: 'center', color: 'white' }}>Tạo thông tin công ty</h2>
                        <div style={{ backgroundColor: 'white' }} >

                            <br />
                            <Form.Item
                                label={"Tên doanh nghiệp "}
                                name="companyName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên ',
                                    },
                                    {
                                        max: 50,
                                        message: 'Vui lòng không nhập quá 50 ký tự'
                                    }
                                ]}
                            >
                                <Row gutter={8}> <Col span={20}><TextArea autoSize /></Col>
                                    <Popover content={ValidationCompany} trigger="hover">
                                        <Button shape="circle" style={{ border: "none", backgroundColor: 'white' }} size="small" icon={<QuestionCircleOutlined style={{ verticalAlign: 'center' }} />} />
                                    </Popover></Row>
                            </Form.Item>
                            <Form.Item
                                label={"Mã số thuế "}
                                name="taxCode"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mst ',

                                    },

                                ]}
                            >
                                <Row gutter={8}> <Col span={20}><Input type="text" /></Col>    <Popover content={ValidationTax} trigger="hover">
                                    <Button shape="circle" style={{ border: "none", backgroundColor: 'white' }} size="small" icon={<QuestionCircleOutlined style={{ verticalAlign: 'center' }} />} />
                                </Popover></Row>
                            </Form.Item>
                            <Form.Item
                                label={"Giấy phép kinh doanh "}
                                name="businessLicense"
                                required
                            >
                                <Row gutter={8}> <Col span={20}><Input type="text" /></Col>    <Popover content={ValidationCertificate} trigger="hover">
                                    <Button shape="circle" style={{ border: "none", backgroundColor: 'white' }} size="small" icon={<QuestionCircleOutlined style={{ verticalAlign: 'center' }} />} />
                                </Popover></Row>
                            </Form.Item>
                            <Form.Item
                                label={"Tài khoản ngân hàng "}
                                name="bankAccount"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Số tài khoản',

                                    },
                                ]}
                            >
                                <Row gutter={8}> <Col span={20}><Input type="text" /></Col>    <Popover content={ValidationBank} trigger="hover">
                                    <Button shape="circle" style={{ border: "none", backgroundColor: 'white' }} size="small" icon={<QuestionCircleOutlined style={{ verticalAlign: 'center' }} />} />
                                </Popover></Row>
                            </Form.Item>

                            <Form.Item
                                label={"Địa chỉ "}
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Địa chỉ',
                                    },
                                ]}
                            >
                                <Row gutter={8}> <Col span={20}><TextArea autoSize placeholder="Địa chỉ" /></Col>    <Popover content={ValidationAdd} trigger="hover">
                                    <Button shape="circle" style={{ border: "none", backgroundColor: 'white' }} size="small" icon={<QuestionCircleOutlined style={{ verticalAlign: 'center' }} />} />
                                </Popover></Row>
                            </Form.Item>
                            <p></p>
                        </div>
                        <Form.Item {...tailLayout}>
                            <Space size="large">
                                <Button type="primary" htmlType="submit" >
                                    Tạo
                            </Button>
                                <Button type="primary" htmlType="reset" >
                                    Xóa dữ liệu đã nhập                                </Button>


                            </Space>
                        </Form.Item>


                    </Form>

                </Card >
            );
        }
    }
}

export default AddUserAdmin;