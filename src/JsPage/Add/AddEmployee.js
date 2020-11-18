import React from 'react';
// import Popup from 'reactjs-popup';
import 'antd/dist/antd.css';
import '../../index.css';
import { createEmployee, employeeInformation } from '../../actions/EmployeeAction'
import { connect } from 'react-redux'
import { Form, Input, Button, Switch, Space, Card,Popover,Col,Row } from 'antd';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
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
class AddEmployee extends React.Component {
    constructor() {
        super();
        this.state = {
            finish: false,
            signPermission:false,
            employeePermission:false,
            contractPermission:false,
            customerPermission:false,
            companyInfoPermission:false,
        };
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        
        let employeeInfo = {
            firstname:values.name,
            lastname :values.name,
            email:values.Email,
            signPermission:this.state.signPermission,
            employeePermission:this.state.employeePermission,
            contractPermission:this.state.contractPermission,
            customerPermission:this.state.customerPermission,
            companyInfoPermission:this.state.companyInfoPermission,
            password:"123",
            confirmPassword:"123"
        }
        axios({
            url: '/api/Account/register',
            method: "POST",
            data: employeeInfo
        })
            .then( (response)=> {
               
                return response.data.data;
            })
            .then( (data)=> {
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
                            <Input placeholder="Họ và tên" />
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
                            <Input placeholder="cmnd/cmt" />
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
                            <Input placeholder="tên người dùng" />
                        </Form.Item>


                        <Form.Item
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
                            <Input prefix="+84" placeholder="số điện thoại" />
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
                            <Input placeholder="Địa chỉ" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="Email"
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
                            <Input placeholder="Email" />
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
                            <Input placeholder="Chức vụ" />
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
                                            label="Quản lý hợp đồng"
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
}
var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (employee) => {
            dispatch(createEmployee(employee))
        }
    }
}
export default connect(null, mapDispatchToProps)(AddEmployee);