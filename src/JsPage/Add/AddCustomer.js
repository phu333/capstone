import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space,Popover,Row,Col,message } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { createCustomer } from '../../actions/CustomerAction';
import '../../index.css';
import CustomerTable from '../Table/CustomerTable';
import axios from'axios'
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
const ValidationCompany = (

    <p>Tên công ty nên để tên dưới 250 ký tự</p>

);
const ValidationAdd = (

    <p>Số địa chỉ công ty</p>

);const ValidationPresentor = (

    <p>Người đại diện cho công ty khách</p>

);const ValidationCertificate = (

    <p>Mã giấy phép kinh doanh do nhà nước cấp</p>

);const ValidationEmail = (

    <p>Địa chỉ email của google</p>

);const ValidationTax = (

    <p>Mã số thuế của công ty </p>

);const ValidationRole = (

    <p>Chức vụ trong công ty có thể để trống</p>

);const ValidationPhone = (

    <p>Số điện thoại công ty trong khoảng 10 ký tự</p>

);const ValidationBank = (

    <p>Mã số Ngân hàng của công ty có thể để trắng</p>

);
class AddCustomer extends React.Component {
    constructor() {
        super();
        this.state = {
            finish: false,
        };
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        axios({
            url: '/api/v1/Company',
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            },
            params:{
                Name:values.name,
            },
            
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {

                console.log(data)

            })
            .catch(error => {

                if (error.response.status === 500) {
                    message.error(error.response.status + ' Server under maintainence');
                } else if (error.response.status === 404) {
                    message.error(error.response.status + ' Server not found');
                }

            });
        
        axios({
            url: '/api/v1/Customer',
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            },
            data: values
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {



            })
            .catch(error => {

                if (error.response.status === 500) {
                    message.error(error.response.status + ' Server under maintainence');
                } else if (error.response.status === 404) {
                    message.error(error.response.status + ' Server not found');
                }

            });

        // this.setState({
        //     finish: true
        // })

    };
    Cancel = () => {
        this.setState({
            finish: true
        })
    }
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
                <Card>
                    <br />
                    <Button style={{ width: '80px' }} type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>
                    <h2 style={{ textAlign: 'center' }}>Tạo khách hàng</h2>

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
                                    message: 'Vui lòng nhập tên doanh nghiệp',
                                },
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}> <Input placeholder="tên doanh nghiệp" /></Col> <Popover content={ValidationCompany} trigger="hover">
                                <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
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
                            <Row gutter={8}> <Col span={20}> <Input placeholder="Mã số thuế" /></Col> <Popover content={ValidationTax} trigger="hover">
                                <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                        </Form.Item>

                        <Form.Item
                            label="Giấy phép kinh doanh"
                            name="businessLicense"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giấy phép',
                                },
                            ]}
                        >
<Row gutter={8}> <Col span={20}> <Input placeholder="Giấy phép kinh doanh" /></Col> <Popover content={ValidationCertificate} trigger="hover">
                                <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
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
                            <Row gutter={8}> <Col span={20}> <Input prefix="+84" placeholder="Điện thoại" /></Col> <Popover content={ValidationPhone} trigger="hover">
                                <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
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
                            <Row gutter={8}> <Col span={20}> <Input placeholder="Địa chỉ" /></Col> <Popover content={ValidationAdd} trigger="hover">
                                <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                        </Form.Item>
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
                            <Row gutter={8}> <Col span={20}> <Input placeholder="Email" /></Col> <Popover content={ValidationEmail} trigger="hover">
                                <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                        </Form.Item>
                        <Form.Item
                            label="Số tài khoản"
                            name="bankAccount"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Số tài khoản',
                                },
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}> <Input placeholder="Số tài khoản" /></Col> <Popover content={ValidationBank} trigger="hover">
                                <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
                        </Form.Item>
                        <Form.Item
                            label="Người đại diện"
                            name="representative"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Người đại diện',
                                },
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}> <Input placeholder="Người đại diện" /></Col> <Popover content={ValidationPresentor} trigger="hover">
                                <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
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
                            <Row gutter={8}> <Col span={20}> <Input placeholder="Chức vụ" /></Col> <Popover content={ValidationRole} trigger="hover">
                                <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
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
            );
        }
    }
}
var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (customer) => {
            dispatch(createCustomer(customer))
        }
    }
}

export default connect(null, mapDispatchToProps)(AddCustomer)