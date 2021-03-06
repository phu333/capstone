import React, { Component, useCallback } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { PageHeader, Space, Row, Col } from 'antd';
import { GoogleLogin } from 'react-google-login';
import { Form, Input, Button, Checkbox, message } from 'antd';
import EmployeeSideMenu from './EmployeeSideMenu';
import FadeIn from 'react-fade-in'
import axios from 'axios'

import GoogleOutlined from '../../logo/Google.png'

import logo from '../../logo/Capture.PNG'
import AddUserAdmin from '../Login/AddUserAdmin'
import ForgetPassword from './ForgetPassword'
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
        span: 8,

    },
    wrapperCol: {
        span: 14,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 12,
    },
};
const middleLayout = {
    wrapperCol: {
        offset: 8,
        span: 12,
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
    componentDidMount() {
        let loginInfo = JSON.parse(localStorage.getItem("loginInfo")) 
        
        if (loginInfo != undefined && loginInfo != null) {
            this.props.onSubmit(loginInfo)
        } else {
            return( <Router>
                <Redirect push to={"/capstone/Login"} />

                <Route exact path="/capstone/Login" component={LoginPage} />
            </Router>)
           
        }

    }
    onFinish = (values) => {




        let loginInformation = {
            email: values.username,
            password: "123Pa$$word!",

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
                        id: data.data.id,
                        username: data.data.userName,
                        email: data.data.email,

                        role: data.data.roles[0],
                      
                        isVerified: data.data.isVerified,
                        jwToken: data.data.jwToken,
                        loginCode: true,
                    }
                    axios({
                        url: '/api/Account/permission/'+data.data.id,
                        method: "GET",
                        headers: {
                            Authorization: 'Bearer ' + data.data.jwToken,
                  
                        }
                    })
                        .then((response) => {
                  
                            return response.data;
                        })
                        .then((data) => {
                            
                            for(let i = 0; i < data.length; i++){
                                
                                
                                loginInfo[data[i].permissionName]=data[i].enabled
                            }
                            this.setState({
                                othersPage: ""
                            })
                           
                            this.props.onSubmit(loginInfo)
                        })
                  
                        .catch(error => {
                  
                  
                        });
                    
                    
                



                message.success("welcome " + data.data.userName);
            })
            .catch(error => {

                message.error("Đã có lỗi xảy ra vui lòng kiểm tra thông tin đã nhập và thử lại sau")

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
            othersPage: "AddUserAdmin"
        })
    };

    responseGoogle = (response) => {

    }
    render() {

        var information = this.props.myLoginReducer.map((login, index) => {

            return (<FadeIn>
                <Router>
                    <Redirect push to="/capstone/SideMenu" />

                    <Route exact path="/capstone/SideMenu" component={EmployeeSideMenu} />
                </Router></FadeIn>
            );

        })

        if (information.length > 0) {
            return (<div> { information}</div >);
        } else {
            if (this.state.othersPage === "ForgetPassword") {
                return (<FadeIn>
                    <ForgetPassword /></FadeIn>);

            } else if (this.state.othersPage === "AddUserAdmin") {
                return (<FadeIn>
                    <AddUserAdmin /></FadeIn>);
            } else {
                return (<FadeIn>
                    <Row type="flex" justify="center" align="middle" style={{ height: "100vh", backgroundColor: 'rgb(8, 59, 102)' }}>

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
                                {/* <IconFont type="icon-javascript" style={{ fontSize: '60px', color: '#08c', marginLeft: "40%" }} /> */}
                                <img src={logo} type="icon-javascript" style={{ height: '180px', width: '300px', color: '#08c', marginLeft: "32%" }} alt="Logo" />
                                <Form.Item
                                    label={<label style={{ color: "white" }}>Email người dùng</label>}
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên người dùng',
                                        },
                                    ]}
                                >
                                    <Input style={{ width: '300px' }} />
                                </Form.Item>

                                <Form.Item
                                    label={<label style={{ color: "white" }}>Mật khẩu</label>}
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Mật khẩu',
                                        },
                                    ]}
                                >
                                    <Input.Password style={{ width: '300px' }} />
                                </Form.Item>
                                <Form.Item {...middleLayout} name="remember" valuePropName="unchecked" >
                                    <Row gutter="2">    <Col>  <Checkbox style={{ fontSize: '20px', color: 'white' }}
                                        onChange={() => {
                                            this.setState({
                                                remember: !this.state.remember
                                            })
                                        }}
                                    >Ghi nhớ</Checkbox></Col>
                                        <Col>    <Button type="link" htmlType="button"
                                            onClick={this.ForgetPassword}
                                            style={{ color: "white" }}
                                        >
                                            Quên mật khẩu
                                </Button></Col>
                                        <Col>
                                            <Button type="link" htmlType="button"
                                                style={{ color: "white" }}
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


                                                (<Button type="primary" htmlType="submit" >

                                                    <img src={GoogleOutlined} style={{ width: '30px', height: '25px', color: '#08c' }} />  Đăng nhập với google</Button>)
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

                        </Col></Row></FadeIn>

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