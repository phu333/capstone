import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import {
    IdcardOutlined, BankOutlined, HomeOutlined, MailOutlined
    , CloudUploadOutlined, RedoOutlined
} from '@ant-design/icons';
import { createCustomer, customerInformation } from '../actions/CustomerAction'
import { connect } from 'react-redux'
import { Form, Input, Button, Row, Col, Card,Space } from 'antd';
import CustomerTable from './CustomerTable'

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
class UpdateProfileCompany extends React.Component {
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


                <React.Fragment>
                    <Card>
                        <h2 style={{ textAlign: 'center' }}>Thông tin doanh nghiệp</h2>
                        <Form
                                {...layout}
                                name="basic"
                                className="employee-form"
                                
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}

                            >
                                <Form.Item
                                    label="Tên doanh nghiệp"
                                    name="company"
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
                                    label="Mã số thuế"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Mã số thuế ',
                                        },
                                    ]}
                                >
                                    <Input />
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
                                    <Input />
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
                                    <Input />
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
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Giấy phép kinh doanh"
                                    name="certificate"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Giấy phép kinh doanh ',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Tài khoản ngân hàng"
                                    name="bankaccount"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Tài khoản ngân hàng ',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Người đại diện"
                                    name="presentor"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên Người đại diện',
                                        },
                                    ]}
                                >
                                    <Input />
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
                                    <Input />
                                </Form.Item>
                                {/* <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Mật khẩu',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item> */}



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
                        {/* <Row type="flex" justify="center" align="middle" style={{ backgroundColor: "white", height: "100vh" }}>
                            <Col span={10} >
                                <Grid container spacing={3}>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="company"
                                            name="Tên doanh nghiệp"
                                            label="Tên doanh nghiệp"
                                            fullWidth
                                            autoComplete="Tên doanh nghiệp"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="taxCode"
                                            name="Mã số thuế"
                                            label="Mã số thuế"
                                            fullWidth
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="phone"
                                            name="phone"
                                            label="Số điện thoại"
                                            fullWidth
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="certificate"
                                            name="certificate"
                                            label="Giấy phép kinh doanh"
                                            fullWidth
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <TextField
                                            required
                                            id="bankaccount"
                                            name="bankaccount"
                                            label="Tài khoản ngân hàng"
                                            fullWidth
                                            autoComplete="family-name"
                                        />
                                        <TextField
                                            required
                                            id="bankname"
                                            name="bankname"
                                            label="Tên ngân hàng"
                                            fullWidth
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField

                                            id="faxCode"
                                            name="số fax"
                                            label="số fax"
                                            fullWidth
                                            autoComplete="shipping address-line1"
                                        />
                                        <TextField
                                            required
                                            id="email"
                                            name="địa chỉ mail"
                                            label="địa chỉ mail"
                                            fullWidth
                                            autoComplete="shipping address-level2"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="address"
                                            name="địa chỉ"
                                            label="địa chỉ"
                                            fullWidth
                                            autoComplete="shipping address-line2"
                                        />
                                    </Grid>


                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="presentor"
                                            name="Người đại diện"
                                            label="Người đại diện"
                                            fullWidth
                                            autoComplete="shipping postal-code"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="role"
                                            name="chức vụ"
                                            label="chức vụ"
                                            fullWidth
                                            autoComplete="shipping country"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="year"
                                            name="year"
                                            label="Năm sinh"
                                            fullWidth
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                </Grid>
                                <div></div><br />
                                <Grid item xs={12} sm={6}>
                                    <Button type="primary" >
                                        <CloudUploadOutlined />    Nộp
                            </Button>
                                    <Button type="primary" style={{
                                        margin: '0 8px',
                                    }} htmlType="button">
                                        <ReloadOutlined />    Reset
                            </Button>
                                </Grid>
                            </Col>
                        </Row> */}
                    </Card>
                </React.Fragment>


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

export default connect(null, mapDispatchToProps)(UpdateProfileCompany);
