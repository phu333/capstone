import React, { Component, useCallback } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { PageHeader, Space, Row, Col } from 'antd';
import { GoogleLogin } from 'react-google-login';
import { Form, Input, Button, Checkbox,message } from 'antd';
import EmployeeSideMenu from './EmployeeSideMenu';

import axios from 'axios'

import AddComAd from '../Login/AddComAd'
import ForgetPassword from './ForgetPassword'
import { GoogleOutlined } from "@ant-design/icons"
import { createFromIconfontCN } from '@ant-design/icons';
import { connect } from 'react-redux'
import { addLogin, login } from '../../actions/loginAction'

const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart (overrided)
        '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
    ],
});
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


const initialState = {
    role: "",
    othersPage: "",
    user: "",
    password: "",
    userInfo: {},
    remember: false,
}

class LoginPage extends React.Component {
    constructor() {
        super();

        this.state = { ...initialState }

        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);

    }

    onFinish = (values) => {

       


        let loginInformation = {
            email: values.username,
            password: "123Pa$$word!",
            // signPermission: true,
            // contractManagePermision: true,
            // customerManagePermission: true,
            // contractTypeManagePermission: true,
            // employeeManagePermission: true,
            // signatureManagePermission: true,
            // editCompanyInformationPermission: true,
            // loginCode:true,
        }

        axios({
            url: '/api/Account/authenticate',
            method: "POST",
            data: loginInformation
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                
                let loginInfo = {
                    id:data.data.id,
                    username: data.data.userName,
                    email: "triphan@gmail.com",
                    password: "123Pa$$word!",
                    companyId:3,
                    companyName:"HiSign",
                    role: data.data.roles[0],
                    signPermission: true,
                    contractManagePermision: true,
                    customerManagePermission: true,
                    contractTypeManagePermission: true,
                    employeeManagePermission: true,
                    signatureManagePermission: true,
                    editCompanyInformationPermission: true,
                    isVerified:data.data.isVerified,
                    jwToken:data.data.jwToken,
                    loginCode: true,
                }
                console.log(data.data.jwToken)

                this.props.onSubmit(loginInfo)
                message.success("welcome "+ data.data.userName);
            })
            .catch(error => {
                
                if(error.response.status === 500){
                    message.error(error.response.status + ' Server under maintainence');
                }else if(error.response.status === 404){
                    message.error(error.response.status + ' Server not found');
                }
                
            });




        // this.props.onSubmit(loginInfo)

    };

    onFinishFailed = (errorInfo) => {

    };
    ForgetPassword = () => {
        this.setState({
            othersPage: "ForgetPassword"
        })
    };
    SendJoinRequest = () => {
        this.setState({
            othersPage: "AddComAd"
        })
    };

    responseGoogle = (response) => {

    }
    render() {

        var information = this.props.myLoginReducer.map((login, index) => {

            return (
                <Router>
                    <Redirect push to="/capstone/SideMenu" />

                    <Route exact path="/capstone/SideMenu" component={EmployeeSideMenu} />
                </Router>
            );

        })

        if (information.length > 0) {
            return (<div> { information}</div >);
        } else {
            if (this.state.othersPage === "ForgetPassword") {
                return (
                    <ForgetPassword />);

            } else if (this.state.othersPage === "AddComAd") {
                return (
                    <AddComAd />);
            } else {
                return (
                    <Row type="flex" justify="center" align="middle" style={{ height: "100vh" }}>

                        <Redirect push to="/capstone/Login" />



                        <Col span={16} >
                            <Form
                                {...layout}
                                name="basic"
                                className="login-form"
                                initialValues={{
                                    remember: true,
                                }}
                                hideRequiredMark
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}

                            >
                                <IconFont type="icon-javascript" style={{ fontSize: '60px', color: '#08c', marginLeft: "40%" }} />
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
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Mật khẩu',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item {...middleLayout} name="remember" valuePropName="unchecked" >
                              <Row gutter="2">    <Col>  <Checkbox style={{fontSize:'20px'}}
                                        onChange={() => {
                                            this.setState({
                                                remember: !this.state.remember
                                            })
                                        }}
                                    >Ghi nhớ</Checkbox></Col>
                                <Col>    <Button  type="link" htmlType="button"
                                        onClick={this.ForgetPassword}
                                    >
                                        Quên mật khẩu
                                </Button></Col>
                            <Col>  <Button type="link" htmlType="button"
                                            onClick={this.SendJoinRequest}>
                                            Đăng ký
                                </Button></Col> </Row>
                                </Form.Item>




                                <Form.Item {...tailLayout}>
                                    <Space size="large">
                                        <Button type="primary" htmlType="submit" >
                                            Đăng nhập
                                </Button>
                                        <GoogleLogin
                                            clientId="390380026430-evq67duag44ce10ro7o7vp3adal9q7bc.apps.googleusercontent.com"
                                            buttonText="Login"
                                            render={renderProps => (


                                             ( <button style={{border:'none',backgroundColor:'deepskyblue',color:'white',height:'20 px',width:'20 px'}}>  <GoogleOutlined style={{ fontSize: '30px', color: '#08c' }} >
                                                   
                                                </GoogleOutlined>  Đăng nhập với google</button>)
                                            )}
                                            onSuccess={this.responseGoogle}
                                            onFailure={this.responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                        />

                                        
                                    </Space>
                                </Form.Item>
                                <Form.Item>

                                </Form.Item>




                            </Form>

                        </Col></Row>

                );
            }


        }

    }
}

var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (login) => {
            dispatch(addLogin(login))
        }
    }
}
var mapStateToProps = state => {
    return {
        myLoginReducer: state.myLoginReducer,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);