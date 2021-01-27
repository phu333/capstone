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
                    <div style={{backgroundColor:'whitesmoke'}}>
                                            <Button style={{ width: '80px' }} type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>
                        <h2 style={{ textAlign: 'center', color: '#0099ff' }}>Tạo thông tin Admin</h2>

                        <Form
                            {...layout}
                            name="basic"
                            className="employee-form"
                            hideRequiredMark
                            
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                        >
                            <Row gutter={2}>
                                <Col span={12} >
                                    <Form.Item
                                        label={<label style={{ color: "#0099ff" }}>Tên</label>}
                                        name="firstName"
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
                                        <Row gutter={8}> <Col span={22}><Input placeholder="Họ" /></Col>    <Popover content={ValidationLPresentor} trigger="hover">
                                            <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white' }} />} />
                                        </Popover></Row>                    </Form.Item>
                                </Col><Col span={12}>
                                    <Form.Item
                                        label={<label style={{ color: "#0099ff" }}>Họ </label>}
                                        name="lastName"
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
                                        <Row gutter={8}> <Col span={22}><Input placeholder="Tên" /></Col>    <Popover content={ValidationFPresentor} trigger="hover">
                                            <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white' }} />} />
                                        </Popover></Row>


                                    </Form.Item>
                                </Col></Row>
                            <Row gutter={2}>
                                <Col span={12} >
                                    <Form.Item
                                        label={<label style={{ color: "#0099ff" }}>Email</label>}
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
                                            <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white' }} />} />
                                        </Popover></Row>

                                    </Form.Item>
                                </Col><Col span={12}>
                                    <Form.Item
                                        label={<label style={{ color: "#0099ff" }}>Chứng minh nhân dân</label>}
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
                                            <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white' }} />} />
                                        </Popover></Row>

                                    </Form.Item>
                                </Col></Row>
                            {/* <Form.Item
                        label={<label style={{ color: "#0099ff" }}>Tên người dùng</label>}
                        name="userName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên người dùng',
                                min: 6,
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input placeholder="Tên người dùng" /> </Col>    <Popover content={Validation} trigger="hover">
                            <Button shape="circle" style={{ border: "none",backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{color:'white'}} />} />
                        </Popover></Row>

                    </Form.Item> */}
                            <Row gutter={2}>
                                <Col span={12} >
                                    <Form.Item
                                        label={<label style={{ color: "#0099ff" }}>Mật khẩu</label>}
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
                                        <Row gutter={8}> <Col span={22}><Input.Password /></Col>    <Popover content={ValidationPass} trigger="hover">
                                            <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white' }} />} />
                                        </Popover></Row>
                                    </Form.Item>
                                </Col><Col span={12}>
                                    <Form.Item
                                        label={<label style={{ color: "#0099ff" }}>Xác nhận mật khẩu</label>}
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
                                            <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white' }} />} />
                                        </Popover></Row>

                                    </Form.Item>
                                </Col></Row>
                            <Row gutter={2}>
                                <Col span={12} >
                                    <Form.Item
                                        label={<label style={{ color: "#0099ff" }}>Chức vụ</label>}
                                        name="userRole"
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
                                    </Form.Item></Col><Col span={12}>
                                    <Form.Item
                                        label={<label style={{ color: "#0099ff" }}>Điện thoại</label>}
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
                                            <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white' }} />} />
                                        </Popover></Row>
                                    </Form.Item></Col></Row>
                            <h2 style={{ textAlign: 'center', color: 'white' }}>Tạo thông tin công ty</h2>

                            <Form.Item
                                label={<label style={{ color: "#0099ff" }}>Tên doanh nghiệp</label>}
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
                                        <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white' }} />} />
                                    </Popover></Row>
                            </Form.Item>
                            <Form.Item
                                label={<label style={{ color: "#0099ff" }}>Mã số thuế</label>}
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
                                <Row gutter={8}> <Col span={20}><Input type="number" /></Col>    <Popover content={ValidationTax} trigger="hover">
                                    <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white' }} />} />
                                </Popover></Row>
                            </Form.Item>
                            <Form.Item
                                label={<label style={{ color: "#0099ff" }}>Giấy phép kinh doanh</label>}
                                name="businessLicense"
                                required
                            >
                                <Row gutter={8}> <Col span={20}><Input type="number" /></Col>    <Popover content={ValidationCertificate} trigger="hover">
                                    <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white' }} />} />
                                </Popover></Row>
                            </Form.Item>
                            <Form.Item
                                label={<label style={{ color: "#0099ff" }}>Tài khoản ngân hàng</label>}
                                name="bankAccount"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Số tài khoản',

                                    }, {

                                        message: 'Vui lòng nhập 8 ký tự',
                                        min: 8,
                                        max: 8,
                                    },
                                ]}
                            >
                                <Row gutter={8}> <Col span={20}><Input type="number" /></Col>    <Popover content={ValidationBank} trigger="hover">
                                    <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white' }} />} />
                                </Popover></Row>
                            </Form.Item>

                            <Form.Item
                                label={<label style={{ color: "#0099ff" }}>Địa chỉ</label>}
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Địa chỉ',
                                    },
                                ]}
                            >
                                <Row gutter={8}> <Col span={20}><TextArea autoSize placeholder="Địa chỉ" /></Col>    <Popover content={ValidationAdd} trigger="hover">
                                    <Button shape="circle" style={{ border: "none", backgroundColor: 'rgb(8, 59, 102)' }} size="small" icon={<QuestionCircleOutlined style={{ color: 'white' }} />} />
                                </Popover></Row>
                            </Form.Item>

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

                    </div>

                </Card >
            );
        }
    }
}

export default AddUserAdmin;