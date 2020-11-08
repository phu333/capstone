import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space,Popover,Row,Col } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { createCustomer } from '../../actions/CustomerAction';
import '../../index.css';
import CustomerTable from '../Table/CustomerTable';

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
const Validation = (

    <p>Nên để họ tên thật</p>

);
class AddCustomer extends React.Component {
    constructor() {
        super();
        this.state = {
            finish: false
        };
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {

        const contract1 = {

            name: 'John',
            company: "cty 369",
            address: '10 Downing Street',
            status: "active",

        }


        this.props.onSubmit(contract1)
        this.setState({
            finish: true
        })

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
                            <Row gutter={8}> <Col span={20}> <Input placeholder="tên doanh nghiệp" /></Col> <Popover content={Validation} trigger="hover">
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
                            <Row gutter={8}> <Col span={20}> <Input placeholder="Mã số thuế" /></Col> <Popover content={Validation} trigger="hover">
                                <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
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
                            <Row gutter={8}> <Col span={20}> <Input placeholder="Giấy phép kinh doanh" /></Col> <Popover content={Validation} trigger="hover">
                                <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
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
                            <Row gutter={8}> <Col span={20}> <Input placeholder="Điện thoại" /></Col> <Popover content={Validation} trigger="hover">
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
                            <Row gutter={8}> <Col span={20}> <Input placeholder="Địa chỉ" /></Col> <Popover content={Validation} trigger="hover">
                                <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
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
                            <Row gutter={8}> <Col span={20}> <Input placeholder="Email" /></Col> <Popover content={Validation} trigger="hover">
                                <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
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
                            <Row gutter={8}> <Col span={20}> <Input placeholder="Số tài khoản" /></Col> <Popover content={Validation} trigger="hover">
                                <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                            </Popover></Row>
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
                            <Row gutter={8}> <Col span={20}> <Input placeholder="Người đại diện" /></Col> <Popover content={Validation} trigger="hover">
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
                            <Row gutter={8}> <Col span={20}> <Input placeholder="Chức vụ" /></Col> <Popover content={Validation} trigger="hover">
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