import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Popover, Row, Space } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import React from 'react';
import '../../index.css';
import "../Column.css";

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
const ValidationName = (

    <p>Vui lòng không để trống</p>

);
const ValidationAddR = (

    <p>Số địa chỉ nhà riêng</p>

); const ValidationPhone = (

    <p>Số điện thoại </p>

); const ValidationEmail = (

    <p>Địa chỉ email không được để trống</p>

);
const ValidationCompany = (

    <p>Tên công ty nên để tên dưới 250 ký tự</p>

);
const ValidationAdd = (

    <p>Số địa chỉ công ty</p>

); const ValidationPresentor = (

    <p>Người đại diện cho công ty </p>

); const ValidationCertificate = (

    <p>Mã giấy phép kinh doanh do nhà nước cấp</p>

);
const ValidationTax = (

    <p>Mã số thuế của công ty nhập dưới 10 ký tự</p>

); const ValidationRole = (

    <p>Chức vụ trong công ty có thể để trống</p>

);

const ValidationBank = (

    <p>Mã số Ngân hàng của công ty có thể để trắng</p>

); const ValidationCmnd = (

    <p>Mã số chứng minh nhân dân với 10 chữ số</p>

);
class AddComAd extends React.Component {
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
            <Card>
                <br />
                <Button style={{ width: '80px' }} type="primary" value="cancel" onClick={this.Cancel}>
                    Trở về
              </Button>
                <h2 style={{ textAlign: 'center' }}>Tạo thông tin Người dùng</h2>

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
                                message: 'Vui lòng nhập họ ',
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input placeholder="Họ" /></Col>
                            <Popover content={ValidationName} trigger="hover">
                                <Button shape="circle" size="small" style={{border:'none'}}  icon={<QuestionCircleOutlined />} />
                            </Popover></Row>                    </Form.Item>
                    <Form.Item
                        label="Họ "
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên ',
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input placeholder="Tên" /></Col>
                            <Popover content={ValidationCompany} trigger="hover">
                                <Button shape="circle" size="small" style={{border:'none'}} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label="cmnd/cmt"
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
                        <Row gutter={8}> <Col span={20}><Input placeholder="Chứng minh nhân dân" /></Col>
                            <Popover content={ValidationCmnd} trigger="hover">
                                <Button shape="circle" size="small" style={{border:'none'}} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
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
                        <Row gutter={8}> <Col span={20}><Input.Password placeholder="Password"/></Col>
                            <Popover content={ValidationCompany} trigger="hover">
                                <Button shape="circle" size="small" style={{border:'none'}} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label="xác nhận mật khẩu"
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
                        <Row gutter={8}> <Col span={20}><Input.Password /></Col>
                            <Popover content={ValidationCompany} trigger="hover">
                                <Button shape="circle" size="small" style={{border:'none'}} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label="Điện thoại"
                        name="userPhone"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập sdt',
                                min: 10,
                                max: 10,
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input prefix="+84" placeholder="Điện thoại" /></Col>
                            <Popover content={ValidationPhone} trigger="hover">
                                <Button shape="circle" size="small" style={{border:'none'}} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ nhà riêng"
                        name="userAddress"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Địa chỉ',
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input placeholder="Địa chỉ  công ty" /></Col>
                            <Popover content={ValidationAddR} trigger="hover">
                                <Button shape="circle" size="small" style={{border:'none'}} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>

                    </Form.Item>
                    <Form.Item
                        label="Email riêng"
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
                        <Row gutter={8}> <Col span={20}><Input placeholder="Email" /></Col>
                            <Popover content={ValidationEmail} trigger="hover">
                                <Button shape="circle" size="small" style={{border:'none'}} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label="Chức vụ"
                        name="userRole"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Chức vụ',
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input placeholder="Chức vụ" /></Col>
                            <Popover content={ValidationRole} trigger="hover">
                                <Button shape="circle" size="small" style={{border:'none'}} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>

                    </Form.Item>
                </Form>
                <br />
                <h2 style={{ textAlign: 'center' }}>Thông tin doanh nghiệp</h2>
                <Form
                    {...layout}
                    name="basic"
                    className="employee-form"
                    hideRequiredMark
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}

                >

                    <Form.Item
                        label="Tên doanh nghiệp"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên ',
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input /></Col>
                            <Popover content={ValidationCompany} trigger="hover">
                                <Button shape="circle" size="small" style={{border:'none'}} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label="Mã số thuế"
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
                        <Row gutter={8}> <Col span={20}><Input /></Col>    <Popover content={ValidationTax} trigger="hover">
                            <Button shape="circle" size="small" style={{border:'none'}} icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label="Điện thoại"
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập sdt',

                            },
                            {

                                message: 'Vui lòng nhập 10 ký tự',
                                min: 10,
                                max: 10,
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input prefix="+84" /></Col>    <Popover content={ValidationPhone} trigger="hover">
                            <Button shape="circle" size="small" style={{border:'none'}} icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        required
                    >
                        <Row gutter={8}> <Col span={20}><Input /></Col>    <Popover content={ValidationAdd} trigger="hover">
                            <Button shape="circle" size="small" style={{border:'none'}} icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label="Email công ty"
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
                        <Row gutter={8}> <Col span={20}><Input /></Col>    <Popover content={ValidationEmail} trigger="hover">
                            <Button shape="circle" size="small" style={{border:'none'}} icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label="Giấy phép kinh doanh"
                        name="businessLicense"
                        required
                    >
                        <Row gutter={8}> <Col span={20}><Input /></Col>    <Popover content={ValidationCertificate} trigger="hover">
                            <Button shape="circle" size="small" style={{border:'none'}} icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label="Tài khoản ngân hàng"
                        name="bankAccount"

                    >
                        <Row gutter={8}> <Col span={20}><Input /></Col>    <Popover content={ValidationBank} trigger="hover">
                            <Button shape="circle" size="small" style={{border:'none'}} icon={<QuestionCircleOutlined />} />
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
                    <Form.Item>

                    </Form.Item>






                </Form>

            </Card >

        );
    }
}


export default AddComAd;