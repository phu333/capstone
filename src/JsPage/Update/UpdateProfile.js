import React from 'react';
import Popup from 'reactjs-popup';
import 'antd/dist/antd.css';
import '../../index.css';
import { createEmployee, employeeInformation } from '../../actions/EmployeeAction'
import axios from 'axios'
import { Space, Card, Button, Descriptions, Avatar, Form, Input, Popover, Row, Col, message } from 'antd';
import {
    QuestionCircleOutlined, UserOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux'

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
const name = (

    <p>Nên để họ tên thật</p>

);
class UpdateProfile extends React.Component {
    constructor() {
        super();

        this.state = {
            isEdit: false,
            company: {},
        };

        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        this.setState({
            isEdit: false
        })




    };
    onEdit = (values) => {
        this.setState({
            isEdit: true
        })




    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    componentWillMount(){
        axios({
            url: '/api/v1/Company/info',
            method: "PUT",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            }
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                console.log(data.data)
                this.setState({
                    company: data.data
                })
                console.log(this.state.company)
            })
            .catch(error => {
                console.log(error)
                if (error.response.status === 500) {
                    message.error(error.response.status + ' Server under maintainence');
                } else if (error.response.status === 404) {
                    message.error(error.response.status + ' Server not found');
                }

            });
    }
    render() {
        console.log(this.props.myLoginReducer)
        var information = this.props.myLoginReducer.map((login, index) => {
            return (

                <React.Fragment>

                    <h2 style={{ textAlign: 'center' }}>Thông tin cá nhân</h2>
                    <Space direction="horizontal" align="start"  >


                        <Card style={{ width: 400, minHeight: 300 }}>
                            <Descriptions size="small" column={1}   >

                                <Descriptions.Item><Avatar size={100} icon={<UserOutlined />} /> </Descriptions.Item>



                                <Descriptions.Item><br />
                                    <b >{login.username}</b><br />

                                    <b >{this.state.company.name}</b>
                                </Descriptions.Item>

                            </Descriptions>
                        </Card>
                        <Card style={{ width: 600, height: 600 }}>
                            <Form
                                {...layout}
                                name="basic"
                                className="employee-form"

                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}

                            >

                                <Form.Item
                                    label="tên"
                                    name="name"

                                >
                                    {this.state.isEdit === false ?
                                        <Row gutter={8}> <Col span={10}><Input disabled defaultValue="Nguyen " /></Col><Col span={10}> <Input disabled defaultValue="Van A" /></Col>

                                            <Col span={4}>    <Popover content={name} trigger="hover">
                                                <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                            </Popover></Col></Row> :
                                        <Row gutter={8}> <Col span={10}><Input defaultValue="Nguyen " /></Col><Col span={10}> <Input defaultValue="Van A" /></Col>

                                            <Col span={4}>    <Popover content={name} trigger="hover">
                                                <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                            </Popover></Col></Row>}
                                </Form.Item>
                                <Form.Item
                                    label="Họ"
                                    name="name"

                                >
                                    {this.state.isEdit === false ?
                                        <Row gutter={8}> <Col span={10}><Input disabled defaultValue="Nguyen " /></Col><Col span={10}> <Input disabled defaultValue="Van A" /></Col>

                                            <Col span={4}>    <Popover content={name} trigger="hover">
                                                <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                            </Popover></Col></Row> :
                                        <Row gutter={8}> <Col span={10}><Input defaultValue="Nguyen " /></Col><Col span={10}> <Input defaultValue="Van A" /></Col>

                                            <Col span={4}>    <Popover content={name} trigger="hover">
                                                <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                            </Popover></Col></Row>}
                                </Form.Item>
                                {/* <Form.Item
                                    label="Tên người dùng"
                                    name="username"
                                    required
                                ><Row gutter={8}> <Col span={20}><Input disabled defaultValue="Ak95" /></Col>    <Popover content={name} trigger="hover">
                                    <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                </Popover></Row>
                                </Form.Item> */}

                                <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    required
                                >
                                    {this.state.isEdit === false ?
                                        <Row gutter={8}> <Col span={20}>  <Input.Password disabled defaultValue="123" /> </Col>    <Popover content={name} trigger="hover">
                                            <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row> :
                                        <Row gutter={8}> <Col span={20}>  <Input.Password defaultValue="123" /></Col>    <Popover content={name} trigger="hover">
                                            <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row>}

                                </Form.Item>
                                <Form.Item
                                    label="Điện thoại"
                                    name="phone"

                                >
                                    {this.state.isEdit === false ?
                                        <Row gutter={8}> <Col span={20}><Input disabled defaultValue="123123" /></Col>    <Popover content={name} trigger="hover">
                                            <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row> :
                                        <Row gutter={8}> <Col span={20}><Input defaultValue="123123" /></Col>    <Popover content={name} trigger="hover">
                                            <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row>}
                                </Form.Item>


                                {/* <Form.Item
                                    label="Địa chỉ"
                                    name="address"

                                >
                                    {this.state.isEdit === false ?
                                        <Row gutter={8}> <Col span={20}><Input disabled defaultValue="12/3/4" /></Col>    <Popover content={name} trigger="hover">
                                            <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row> :
                                        <Row gutter={8}> <Col span={20}><Input defaultValue="12/3/4" /></Col>    <Popover content={name} trigger="hover">
                                            <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row>}
                                </Form.Item> */}
                                <Form.Item
                                    label="Email"
                                    name="email"

                                >
                                    {this.state.isEdit === false ?
                                        <Row gutter={8}> <Col span={20}><Input disabled defaultValue={login.email} /></Col>    <Popover content={name} trigger="hover">
                                            <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row> :
                                        <Row gutter={8}> <Col span={20}><Input defaultValue={login.email} /></Col>    <Popover content={name} trigger="hover">
                                            <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row>}
                                </Form.Item>
                                <Form.Item
                                    label="Chức vụ"
                                    name="role"
                                    required
                                >
                                    <Row gutter={8}> <Col span={20}> <Input disabled defaultValue={login.role} /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>
                                </Form.Item>



                                <Form.Item {...tailLayout}>
                                    <Space size="large">
                                        {this.state.isEdit === true ? <Button type="primary" htmlType="submit" className="login-form-button">
                                            Nộp
                            </Button> : null}
                                        {this.state.isEdit === true ? <Button type="primary" htmlType="reset" className="login-form-button">
                                            Reset
                            </Button> : null}

                                        {this.state.isEdit === false ? <Button type="primary" onClick={this.onEdit} className="login-form-button">
                                            Sửa
                            </Button> : null}


                                    </Space>
                                </Form.Item>
               -                 <Form.Item>

                                </Form.Item>




                            </Form>

                        </Card>









                    </Space>
                </React.Fragment >
            );
        })
        if (this.props.myLoginReducer === "Logout") {


        } else {
            return (<div style={{ height: "100vh" }}> {information}</div >);
        }
    }
}
var mapStateToProps = state => {
    console.log(state.myLoginReducer)
    return {
        myLoginReducer: state.myLoginReducer
    }
}
export default connect(mapStateToProps, null)(UpdateProfile);