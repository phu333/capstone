import React from 'react';
// import Popup from 'reactjs-popup';
import 'antd/dist/antd.css';
import '../../index.css';
import { updateEmployee, employeeInformation } from '../../actions/EmployeeAction'
import { connect } from 'react-redux'
import { Form, Input, Button, Row, Space, Card,Col,Popover } from 'antd';
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
const names = (

    <p>Tên công ty đối tác nên để tên dưới 250 ký tự</p>

);
const middleLayout = {
    wrapperCol: {
        offset: 6,
        span: 10,
    },
};
class EmployeeDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            finish: false,

        };
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        
        let employeeInfo = {
            firstname:values.name,
            lastname :values.name,
            email:values.Email,
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
                    <h2 style={{ textAlign: 'center' }}>Thông tin nhân viên</h2>

                    <Form
                        {...layout}
                        name="basic"
                        className="employee-form"
                        
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}

                    >

                        <Form.Item
                            label="Họ "
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập họ ',
                                },
                                {
                                    max: 50,
                                    message: 'Vui lòng không nhập quá 50 ký tự'
                                }
                            ]}
                        >
                             <Row gutter={8}> <Col span={20}><Input placeholder="Họ và tên" /> </Col>    <Popover content={names} trigger="hover">
                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
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
                                {
                                    max: 50,
                                    message: 'Vui lòng không nhập quá 50 ký tự'
                                }
                            ]}
                        >
                             <Row gutter={8}> <Col span={20}><Input placeholder="Tên người dùng" /> </Col>    <Popover content={names} trigger="hover">
                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                    </Popover></Row>
                        </Form.Item>
                        <Form.Item
                            label="Chứng minh nhân dân"
                            name="id"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Chứng minh nhân dân ',
                                },                                {
                                    max: 9,
                                    min:9,
                                    message: 'Vui lòng nhập đúng 9 ký tự'
                                }
                            ]}
                        >
                             <Row gutter={8}> <Col span={20}><Input type="number" placeholder="Chứng minh nhân dân" /> </Col>    <Popover content={names} trigger="hover">
                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                    </Popover></Row>
                        </Form.Item>
                        


                        <Form.Item
                            label="Điện thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập sdt',
                                    min: 6,
                                    max: 10,
                                },
                                {
                                    
                                    message: 'Vui lòng nhập 10 ký tự',
                                    min: 10,
                                    max: 10,
                                },
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}><Input prefix="+84" placeholder="số điện thoại" /> </Col>    <Popover content={names} trigger="hover">
                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                    </Popover></Row>
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập địa chỉ',
                                    
                                },{
    
                                    message: 'Vui lòng nhập dưới 250 ký tự',
                                    max: 250,
                                },
                            ]}
                        >
                             <Row gutter={8}> <Col span={20}><Input placeholder="Địa chỉ" /> </Col>    <Popover content={names} trigger="hover">
                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                    </Popover></Row>
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
                             <Row gutter={8}> <Col span={20}><Input placeholder="Email" /> </Col>    <Popover content={names} trigger="hover">
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
                             <Row gutter={8}> <Col span={20}><Input placeholder="Chức vụ" /> </Col>    <Popover content={names} trigger="hover">
                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                    </Popover></Row>
                        </Form.Item>
                        {/* <Form.Item {...tailLayout} name="signPermission" valuePropName="checked" >
                            
                            <Checkbox onChange={()=>{
                                this.setState({
                                    signPermission:!this.state.signPermission
                                })
                            }} >Quyền ký</Checkbox>

                        </Form.Item>
                        <Form.Item {...tailLayout} name="employeePermission" valuePropName="checked" >
                            <Checkbox
                            onChange={()=>{
                                this.setState({
                                    employeePermission:!this.state.employeePermission
                                })
                            }}
                            >Quyền quản lý nhân viên</Checkbox>

                        </Form.Item>
                        <Form.Item {...tailLayout} name="contractPermission" valuePropName="checked" >
                        <Checkbox
                            onChange={()=>{
                                this.setState({
                                    contractPermission:!this.state.contractPermission
                                })
                            }}
                            >Quyền quản lý hợp đồng(Bao gồm quyền quản lý loại hợp đồng)</Checkbox>

                        </Form.Item>
                        <Form.Item {...tailLayout} name="customerPermission" valuePropName="checked" >
                        <Checkbox
                            onChange={()=>{
                                this.setState({
                                    customerPermission:!this.state.customerPermission
                                })
                            }}
                            >Quyền quản lý khách hàng</Checkbox>

                        </Form.Item>
                        <Form.Item {...tailLayout} name="companyInfoPermission" valuePropName="checked" >
                        <Checkbox
                            onChange={()=>{
                                this.setState({
                                    companyInfoPermission:!this.state.companyInfoPermission
                                })
                            }}
                            >Quyền chỉnh sửa thông tin doanh nghiệp</Checkbox>

                        </Form.Item> */}



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
var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (employee) => {
            dispatch(updateEmployee(employee))
        }
    }
}
export default connect(null, mapDispatchToProps)(EmployeeDetail);