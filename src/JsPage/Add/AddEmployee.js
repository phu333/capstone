import React from 'react';

import 'antd/dist/antd.css';
import '../../index.css';
import { createEmployee, employeeInformation } from '../../actions/EmployeeAction'
import { connect } from 'react-redux'
import { Form, Input, Button, Switch, Space, Card, Select, Col, Row, Popover, message } from 'antd';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { CloseOutlined, CheckOutlined, QuestionCircleOutlined } from '@ant-design/icons';

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
        offset: 10,
        span: 10,
    },
};
const middleLayout = {
    wrapperCol: {
        offset: 6,
        span: 10,
    },
};
const names = (

    <p>Nhập Username khoảng 8 đến 10 ký tự</p>

);
const ValidationFName = (

    <p>Họ nhân viên</p>

);
const ValidationLName = (

    <p>Tên nhân viên</p>

);
const ValidationAdd = (

    <p>Số địa chỉ công ty</p>

); const ValidationPhone = (

    <p>Số điện thoại </p>

); const ValidationEmail = (

    <p>Địa chỉ email</p>

); const ValidationTax = (

    <p>Mã số thuế của công ty khách hàng</p>

); const ValidationRole = (

    <p>Chức vụ trong công ty có thể để trống</p>

);

class AddEmployee extends React.Component {
    constructor() {
        super();
        this.state = {
            current: [],
            finish: false,
            Sign: false,
            GetContractList: false,
            ActiveDeactiveContract: false,
            UpdateContract: false,
            CreateContract: false,
            GetAllCompanyTemplate: false,
            ActiveDeactiveTemplate: false,
            UpdateTemplate: false,
            UpdateCustomer: false,
            CreateTemplate: false,
            GetCompanyAdminList: false,
            ActiveDeactiveAccount: false,
            GetCompanyAccountListByCompanyId: false,
            UpdateAccountPermission: false,
            CreateAccount: false,
            ActiveDeactiveSignature: false,
            UpdateSignature: false,
            CreateSignature: false,
            GetAllCompanyList: false,
            GetAllCompanyAccount: false,
            ActiveDeactiveCustomer: false,


            permission: [],
        };
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {

        let employeeInfo = {
            firstname: values.firstName,
            lastname: values.lastName,
            email: values.email,
            password: "123Pa$$word!",
            confirmPassword: "123Pa$$word!",
            username: values.username,
            role: values.role,
            permissions: [
                { userId: "", permissionId: 3, permissionName: "Sign", enabled: this.state.Sign },
                { userId: "", permissionId: 4, permissionName: "GetContractList", enabled: this.state.GetContractList },
                { userId: "", permissionId: 5, permissionName: "ActiveDeactiveContract", enabled: this.state.ActiveDeactiveContract },
                { userId: "", permissionId: 6, permissionName: "UpdateContract", enabled: this.state.UpdateContract },
                { userId: "", permissionId: 7, permissionName: "CreateContract", enabled: this.state.CreateContract },
                { userId: "", permissionId: 8, permissionName: "GetAllCompanyTemplate", enabled: this.state.GetAllCompanyTemplate },
                { userId: "", permissionId: 9, permissionName: "ActiveDeactiveTemplate", enabled: this.state.ActiveDeactiveTemplate },
                { userId: "", permissionId: 10, permissionName: "UpdateTemplate", enabled: this.state.UpdateTemplate },
                { userId: "", permissionId: 11, permissionName: "UpdateCustomer", enabled: this.state.UpdateCustomer },
                { userId: "", permissionId: 12, permissionName: "CreateTemplate", enabled: this.state.CreateTemplate },
                { userId: "", permissionId: 13, permissionName: "GetCompanyAdminList", enabled: this.state.GetCompanyAdminList },
                { userId: "", permissionId: 14, permissionName: "ActiveDeactiveAccount", enabled: this.state.ActiveDeactiveAccount },
                { userId: "", permissionId: 15, permissionName: "GetCompanyAccountListByCompanyId", enabled: this.state.GetCompanyAccountListByCompanyId },
                { userId: "", permissionId: 16, permissionName: "UpdateAccountPermission", enabled: this.state.UpdateAccountPermission },
                { userId: "", permissionId: 17, permissionName: "CreateAccount", enabled: this.state.CreateAccount },
                { userId: "", permissionId: 18, permissionName: "ActiveDeactiveSignature", enabled: this.state.ActiveDeactiveSignature },
                { userId: "", permissionId: 19, permissionName: "UpdateSignature", enabled: this.state.UpdateSignature },
                { userId: "", permissionId: 20, permissionName: "CreateSignature", enabled: this.state.CreateSignature },
                { userId: "", permissionId: 21, permissionName: "GetAllCompanyList", enabled: this.state.GetAllCompanyList },
                { userId: "", permissionId: 22, permissionName: "GetAllCompanyAccount", enabled: this.state.GetAllCompanyAccount },
                { userId: "", permissionId: 23, permissionName: "ActiveDeactiveCustomer", enabled: this.state.ActiveDeactiveCustomer },
            ]
        }
        axios({
            url: '/api/Account/register-employee',
            method: "POST",
            data: employeeInfo,
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            }
        })
            .then((response) => {

                return response.data.data;
            })
            .then((data) => {
                console.log(data)
                axios({
                    url: '/api/Account/employee',
                    method: "GET",
                    headers: {
                        Authorization: 'Bearer ' + this.props.token,

                    }
                })
                    .then((response) => {

                        return response.data;
                    })
                    .then((data) => {


                        this.setState({
                            current: data.data.filter(values => values.email === employeeInfo.email)
                        })
                        
                        let permissionList = [

                        ]

                        for (let i = 0; i < permissionList.length; i++) {
                            
                            axios({
                                url: '/api/Account/permission',
                                method: "PUT",
                                data: permissionList[i],
                                headers: {
                                    Authorization: 'Bearer ' + this.props.token,

                                }
                            })
                                .then((response) => {

                                    return response.data;
                                })
                                .then((data) => {

                                    message.success("taọ thành công")



                                })
                                .catch(error => {

                                    message.error("Đã có lỗi xảy ra vui lòng kiểm tra thông tin đã nhập và thử lại sau")

                                });
                        }
                        setTimeout(function () {
                            this.setState({
                                finish: true
                            })
                        }.bind(this), 5000)

                    })
                    .catch(error => {

                        message.error("Đã có lỗi xảy ra vui lòng kiểm tra thông tin đã nhập và thử lại sau")

                    });

                    message.success("taọ thành công")

            })
            .catch(error => {
                message.error("Đã có lỗi xảy ra vui lòng kiểm tra thông tin đã nhập và thử lại sau")
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
        
        if (this.state.finish) {
            return (<Router>
                <Redirect push to={"/capstone/employee"} />
                <Route exact path="/capstone/employee" render={() => <EmployeeTable token={this.props.token} role={this.props.role} />
                } /></Router>);
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
                        hideRequiredMark
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}

                    >
                        <Form.Item
                            label="Tên"
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
                            <Row gutter={8}> <Col span={20}><Input placeholder="Tên" /> </Col>    <Popover content={ValidationLName} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined style={{ verticalAlign: 'baseline' }} />} />
                            </Popover></Row>
                        </Form.Item>
                        <Form.Item
                            label="Họ "
                            name="lastName"
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
                            <Row gutter={8}> <Col span={20}><Input placeholder="Họ" /> </Col>    <Popover content={ValidationFName} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined style={{ verticalAlign: 'baseline' }} />} />
                            </Popover></Row>
                        </Form.Item>
                        {/* <Form.Item
                            label="Chứng minh nhân dân"
                            name="id"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Chứng minh nhân dân ',
                                },
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}><Input placeholder="Chứng minh nhân dân" /> </Col>    <Popover content={names} trigger="hover">
                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined  style={{verticalAlign:'baseline'}} />} />
                    </Popover></Row>
                        </Form.Item> */}
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
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined style={{ verticalAlign: 'baseline' }} />} />
                            </Popover></Row>
                        </Form.Item>


                        {/* <Form.Item
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
                            <Input prefix="+84" placeholder="số điện thoại" /> </Col>    <Popover content={names} trigger="hover">
                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined  style={{verticalAlign:'baseline'}} />} />
                    </Popover></Row>
                        </Form.Item> */}
                        {/* <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Địa chỉ',
                                },
                            ]}
                        >
                            <Row gutter={8}> <Col span={20}><Input placeholder="Địa chỉ" /> </Col>    <Popover content={names} trigger="hover">
                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined  style={{verticalAlign:'baseline'}} />} />
                    </Popover></Row>
                        </Form.Item> */}
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
                            <Row gutter={8}> <Col span={20}><Input placeholder="Email" /> </Col>    <Popover content={ValidationEmail} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined style={{ verticalAlign: 'baseline' }} />} />
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
                            <Select>
                                <Select.Option value={2}>giám đốc</Select.Option>
                                <Select.Option value={3}>nhân viên</Select.Option>
                            </Select>
                        </Form.Item>
                        <Grid item xs={12}>
                            <b>Quyền Hạn</b>
                            <br />
                            <Row>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={() => {
                                            this.setState({
                                                Sign: !this.state.Sign
                                            })
                                            console.log(this.state.Sign)
                                        }} checkedChildren={<CheckOutlined style={{ verticalAlign: 'baseline' }} />} unCheckedChildren={<CloseOutlined style={{ verticalAlign: 'baseline' }} />} />}
                                        label="Ký hợp đồng"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={() => {
                                            this.setState({
                                                GetContractList: !this.state.GetContractList
                                            })
                                        }} checkedChildren={<CheckOutlined style={{ verticalAlign: 'baseline' }} />} unCheckedChildren={<CloseOutlined style={{ verticalAlign: 'baseline' }} />} />}
                                        label="Quản lý danh sách hợp đồng"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={() => {
                                            this.setState({
                                                ActiveDeactiveContract: !this.state.ActiveDeactiveContract
                                            })
                                        }} checkedChildren={<CheckOutlined style={{ verticalAlign: 'baseline' }} />} unCheckedChildren={<CloseOutlined style={{ verticalAlign: 'baseline' }} />} />}
                                        label="Kích hoạt/vô hiệu hóa hợp đồng"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={() => {
                                            this.setState({
                                                UpdateContract: !this.state.UpdateContract
                                            })
                                        }} checkedChildren={<CheckOutlined style={{ verticalAlign: 'baseline' }} />} unCheckedChildren={<CloseOutlined style={{ verticalAlign: 'baseline' }} />} />}
                                        label="Chỉnh sửa hợp đồng"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={() => {
                                            this.setState({
                                                CreateContract: !this.state.CreateContract
                                            })
                                        }} checkedChildren={<CheckOutlined style={{ verticalAlign: 'baseline' }} />} unCheckedChildren={<CloseOutlined style={{ verticalAlign: 'baseline' }} />} />}
                                        label="Tạo hợp đồng"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={() => {
                                            this.setState({
                                                GetAllCompanyTemplate: !this.state.GetAllCompanyTemplate
                                            })
                                        }} checkedChildren={<CheckOutlined style={{ verticalAlign: 'baseline' }} />} unCheckedChildren={<CloseOutlined style={{ verticalAlign: 'baseline' }} />} />}
                                        label="Quản lý danh sách mẫu hợp đồng"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={() => {
                                            this.setState({
                                                ActiveDeactiveTemplate: !this.state.ActiveDeactiveTemplate
                                            })
                                        }} checkedChildren={<CheckOutlined style={{ verticalAlign: 'baseline' }} />} unCheckedChildren={<CloseOutlined style={{ verticalAlign: 'baseline' }} />} />}
                                        label="Kích hoạt/vô hiệu hóa mẫu hợp đồng"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={() => {
                                            this.setState({
                                                UpdateTemplate: !this.state.UpdateTemplate
                                            })
                                        }} checkedChildren={<CheckOutlined style={{ verticalAlign: 'baseline' }} />} unCheckedChildren={<CloseOutlined style={{ verticalAlign: 'baseline' }} />} />}
                                        label="Chỉnh sửa mẫu hợp đồng"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={() => {
                                            this.setState({
                                                CreateTemplate: !this.state.CreateTemplate
                                            })
                                        }} checkedChildren={<CheckOutlined style={{ verticalAlign: 'baseline' }} />} unCheckedChildren={<CloseOutlined style={{ verticalAlign: 'baseline' }} />} />}
                                        label="Tạo mẫu hợp đồng"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={() => {
                                            this.setState({
                                                UpdateCustomer: !this.state.UpdateCustomer
                                            })
                                        }} checkedChildren={<CheckOutlined style={{ verticalAlign: 'baseline' }} />} unCheckedChildren={<CloseOutlined style={{ verticalAlign: 'baseline' }} />} />}
                                        label="Chỉnh sửa thông tin khách hàng"
                                    />
                                    <p></p>
                                </Col>
                                {/* <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={()=>{
                                            this.setState({
                                                GetCompanyAdminList:!this.state.GetCompanyAdminList
                                            })
                                        }} checkedChildren={<CheckOutlined  style={{verticalAlign:'baseline'}} />} unCheckedChildren={<CloseOutlined  style={{verticalAlign:'baseline'}} />} />}
                                        label="Ký"
                                    />
                                    <p></p>
                                </Col> */}
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={() => {
                                            this.setState({
                                                ActiveDeactiveAccount: !this.state.ActiveDeactiveAccount
                                            })
                                        }} checkedChildren={<CheckOutlined style={{ verticalAlign: 'baseline' }} />} unCheckedChildren={<CloseOutlined style={{ verticalAlign: 'baseline' }} />} />}
                                        label="Kích hoạt/vô hiệu hóa thông tin nhân viên"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={() => {
                                            this.setState({
                                                GetCompanyAccountListByCompanyId: !this.state.GetCompanyAccountListByCompanyId
                                            })
                                        }} checkedChildren={<CheckOutlined style={{ verticalAlign: 'baseline' }} />} unCheckedChildren={<CloseOutlined style={{ verticalAlign: 'baseline' }} />} />}
                                        label="Quản lý danh sách nhân viên"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={() => {
                                            this.setState({
                                                UpdateAccountPermission: !this.state.UpdateAccountPermission
                                            })
                                        }} checkedChildren={<CheckOutlined style={{ verticalAlign: 'baseline' }} />} unCheckedChildren={<CloseOutlined style={{ verticalAlign: 'baseline' }} />} />}
                                        label="Chỉnh sửa quyền nhân viên"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={() => {
                                            this.setState({
                                                CreateAccount: !this.state.CreateAccount
                                            })
                                        }} checkedChildren={<CheckOutlined style={{ verticalAlign: 'baseline' }} />} unCheckedChildren={<CloseOutlined style={{ verticalAlign: 'baseline' }} />} />}
                                        label="Tạo tài khoản nhân viên"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={() => {
                                            this.setState({
                                                ActiveDeactiveSignature: !this.state.ActiveDeactiveSignature
                                            })
                                        }} checkedChildren={<CheckOutlined style={{ verticalAlign: 'baseline' }} />} unCheckedChildren={<CloseOutlined style={{ verticalAlign: 'baseline' }} />} />}
                                        label="Kích hoạt/vô hiệu hóa chữ ký"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={() => {
                                            this.setState({
                                                UpdateSignature: !this.state.UpdateSignature
                                            })
                                        }} checkedChildren={<CheckOutlined style={{ verticalAlign: 'baseline' }} />} unCheckedChildren={<CloseOutlined style={{ verticalAlign: 'baseline' }} />} />}
                                        label="Chỉnh sửa thông tin chữ ký"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={() => {
                                            this.setState({
                                                CreateSignature: !this.state.CreateSignature
                                            })
                                        }} checkedChildren={<CheckOutlined style={{ verticalAlign: 'baseline' }} />} unCheckedChildren={<CloseOutlined style={{ verticalAlign: 'baseline' }} />} />}
                                        label="Thêm chữ ký vào công ty"
                                    />
                                    <p></p>
                                </Col>
                                {/* <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={()=>{
                                            this.setState({
                                                GetAllCompanyList:!this.state.GetAllCompanyList
                                            })
                                        }} checkedChildren={<CheckOutlined  style={{verticalAlign:'baseline'}} />} unCheckedChildren={<CloseOutlined  style={{verticalAlign:'baseline'}} />} />}
                                        label="Ký"
                                    />
                                    <p></p>
                                </Col> */}
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={() => {
                                            this.setState({
                                                GetAllCompanyAccount: !this.state.GetAllCompanyAccount
                                            })
                                        }} checkedChildren={<CheckOutlined style={{ verticalAlign: 'baseline' }} />} unCheckedChildren={<CloseOutlined style={{ verticalAlign: 'baseline' }} />} />}
                                        label="Quản lý danh sách nhân viên công ty"
                                    />
                                    <p></p>
                                </Col>
                                <Col span={8}>
                                    <FormControlLabel
                                        control={<Switch onChange={() => {
                                            this.setState({
                                                ActiveDeactiveCustomer: !this.state.ActiveDeactiveCustomer
                                            })
                                        }} checkedChildren={<CheckOutlined style={{ verticalAlign: 'baseline' }} />} unCheckedChildren={<CloseOutlined style={{ verticalAlign: 'baseline' }} />} />}
                                        label="Kích hoạt/vô hiệu hóa khách hàng"
                                    />
                                    <p></p>
                                </Col>
                            </Row>
                        </Grid>



                        <Form.Item {...tailLayout}>
                            <Space size="large">
                                <Button type="primary" htmlType="submit" htmlType="submit" >
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
            dispatch(createEmployee(employee))
        }
    }
}
export default connect(null, mapDispatchToProps)(AddEmployee);