<<<<<<< HEAD
import { CheckOutlined, CloseOutlined, CloudUploadOutlined, ReloadOutlined } from '@ant-design/icons';
import Checkbox from '@material-ui/core/Checkbox';
=======
import React from 'react';
// import Popup from 'reactjs-popup';
import 'antd/dist/antd.css';
import '../../index.css';
import { createEmployee, employeeInformation } from '../../actions/EmployeeAction'
import { connect } from 'react-redux'
import { Form, Input, Button, Switch, Space, Card,Select,Col,Row } from 'antd';
>>>>>>> main
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { Button, Col, Form, Input, Row, Switch } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { createEmployee } from '../../actions/EmployeeAction';
import '../../index.css';
import "../Column.css";
import EmployeeTable from '../Table/EmployeeTable';

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
            finish: false,
            signPermission:false,
            employeePermission:false,
            contractPermission:false,
            customerPermission:false,
            companyInfoPermission:false,
            permission:[],
        };
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
<<<<<<< HEAD
        const contract1 = {
            name: 'Mike',
            email: "some email",
            address: '10 Downing Street',
            status: "active",
            role: "secretery"
        }
=======
        
        let employeeInfo = {
            firstname:values.firstName,
            lastname :values.lastName,
            email:values.email,
            password:"123Pa$$word!",
            confirmPassword:"123Pa$$word!",
            username:values.username,
            role:values.role
        }
        axios({
            url: '/api/Account/register-employee',
            method: "POST",
            data: employeeInfo,
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            }
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
>>>>>>> main

        this.props.onSubmit(contract1)
        this.setState({
            finish: true
        })

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
                <Route exact path="/capstone/employee" render={() => <EmployeeTable token={this.props.token} role={this.props.role} />
                    } /></Router>);
        } else {

        var i = 0;
        function onChange(e) {
            if (e.target == "checked") { i--; }
            else { i++ }
            console.log('checked = ${e.target.checked}');
        }
        function requirement() { if (i == 0) { } }
        return (
            <React.Fragment>
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
                            label=" tên"
                            name="firstName"
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
                            label="Họ "
                            name="lastName"
                            rules={[
               
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên ',
                                },
                            ]}
                        >
                            <Input placeholder="Họ và tên" />
                        </Form.Item>
                        {/* <Form.Item
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
                        </Form.Item> */}
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
                            <Input prefix="+84" placeholder="số điện thoại" />
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
                            <Input placeholder="Địa chỉ" />
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
                                            control={<Switch onChange={onChange} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />}
                                            label="Ký"
                                        />
                                        <p></p>
                                    </Col>
                                    <Col span={8}>
                                        <FormControlLabel
                                            control={<Switch onChange={onChange} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />}
                                            label="Thêm hợp đồng"
                                        />
                                        <p></p>
                                    </Col>
                                    <Col span={8}>
                                        <FormControlLabel
                                            control={<Switch onChange={onChange} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />}
                                            label="Sửa hợp đồng"
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
                                            control={<Checkbox onChange={onChange} ></Checkbox>}
                                            label="Coi nội dung hợp đồng"
                                        />
                                        <p></p>
                                    </Col>
                                    <Col span={8}>
                                        <FormControlLabel
                                            control={<Checkbox onChange={onChange} >Quản lý nhân viên</Checkbox>}
                                            label="Thêm nhân viên"
                                        />
                                        <p></p>
                                    </Col>
                                    <Col span={8}>
                                        <FormControlLabel
                                            control={<Checkbox onChange={onChange} >Quản lý nhân viên</Checkbox>}
                                            label="Chỉnh sửa quyền nhân viên"
                                        />
                                        <p></p>
                                    </Col>

                                    <Col span={8}>
                                        <FormControlLabel
                                            control={<Checkbox onChange={onChange} ></Checkbox>}
                                            label="Coi loại hợp đồng"
                                        />

                                        <p></p>
                                    </Col>
                                    <Col span={8}>
                                        <FormControlLabel
                                            control={<Checkbox onChange={onChange} ></Checkbox>}
                                            label="Quản lý loại hợp đồng"
                                        />

                                        <p></p>
                                    </Col>
                                    <Col span={8}>
                                        <FormControlLabel
                                            control={<Checkbox onChange={onChange} ></Checkbox>}
                                            label="Coi chữ ký"
                                        />
                                        <p></p>
                                    </Col>
                                    <Col span={8}>
                                        <FormControlLabel
                                            control={<Checkbox onChange={onChange} ></Checkbox>}
                                            label="Quản lý chữ ký"
                                        />
                                        <p></p>
                                    </Col>
                                    <Col span={8}>
                                        <FormControlLabel
                                            control={<Checkbox onChange={onChange} ></Checkbox>}
                                            label="Coi khách hàng"
                                        />
                                        <p></p>
                                    </Col>
                                    <Col span={8}>
                                        <FormControlLabel
                                            control={<Checkbox onChange={onChange} ></Checkbox>}
                                            label="Quản lý khách hàng"
                                        />
                                        <p></p>
                                    </Col>
                                </Row>
                            </Grid>
                        <br />
                        <Grid item xs={12} sm={6}>
                            <Popup trigger={<Button type="primary" >
                                <CloudUploadOutlined />  Nộp
                            </Button>} position="right center">
                                <div>The sytem admin will contact you within 3 days</div>
                                <Button onClick={this.onFinish} type="primary" >
                                    Xác nhận
                            </Button>
                            </Popup>
                            <Button type="primary" style={{
                                margin: '0 8px',
                            }} htmlType="button">
                                <ReloadOutlined />   Reset
                            </Button>
                        </Grid>
                        </Form>

<<<<<<< HEAD
            </React.Fragment>
        );
=======


                        <Form.Item {...tailLayout}>
                            <Space size="large">
                                <Button type="primary" htmlType="submit" htmlType="submit" >
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
>>>>>>> main
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