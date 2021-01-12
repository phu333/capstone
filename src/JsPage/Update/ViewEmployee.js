import React from 'react';
import Popup from 'reactjs-popup';
import 'antd/dist/antd.css';
import '../../index.css';
import { createEmployee, employeeInformation, updateEmployee } from '../../actions/EmployeeAction'
import { connect } from 'react-redux'
import { Space, Card, Button, Form, List, Switch } from 'antd';
import {
    IdcardOutlined, BankOutlined, HomeOutlined, MailOutlined
    , CloudUploadOutlined, RedoOutlined, ReloadOutlined
} from '@ant-design/icons';
import EmployeeTable from '../Table/EmployeeTable'
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom'
import "../Column.css"
import axios from 'axios'

const layout = {
    labelCol: {
        span: 10,
    },
    wrapperCol: {
        span: 12,
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
        offset: 8,
        span: 10,
    },
};
class ViewEmployee extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            finish: false,
            EmployeeReciceve: [],
            currentPermission: this.props.employee.permissions,
            permissionsReciceve: [
                // {
                //     name: "signPermission",
                //     lable: "Quyền ký",
                // },
                // {
                //     name: "contractManagePermision",
                //     lable: "Quyền quản lý hợp đồng",
                // },
                // {
                //     name: "customerManagePermission",
                //     lable: "Quyền quản lý khách hàng",
                // },
                // {
                //     name: "contractTypeManagePermission",
                //     lable: "Quyền quản lý loại hợp đổng",
                // },
                // {
                //     name: "employeeManagePermission",
                //     lable: "Quyền quản lý nhân viên",
                // },
                // {
                //     name: "signatureManagePermission",
                //     lable: "Quyền quản lý chữ ký",
                // },
                // {
                //     name: "editCompanyInformationPermission",
                //     lable: "Quyền chỉnh sửa thông tin doanh nghiệp",
                // },

            ]
        };


        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        console.log(values);
        // this.setState({
        //     isEdit: false
        // })



    };
    handleChange(index, info) {
        if (info == false) { info = true }
        else { info = false }
        let permission = {
            userId: this.props.employee.id,

            permissionId: index,
            enabled: info
        }
        console.log(permission)
        axios({
            url: '/api/Account/permission',
            data: permission,
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


            })
            .catch(error => {
                console.log(error)


            });

    }
    onEdit = (values) => {
        this.setState({
            isEdit: true
        })




    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    Cancel = () => {
        this.setState({
            finish: true
        })




    };

    render() {
        // var currentPermissions = this.props.employee.permissionList.map((permisssion) => {
        //     return (
        //         <List.Item>{permisssion}</List.Item>
        //     )
        // })
        var permissions = this.state.currentPermission.map((permisssion) => {
            return (
                <Form.Item {...middleLayout} labelAlign='left' label={permisssion.permissionName}  >
                    {this.props.employee.permissions.some(item => permisssion.enabled === true) ?//hàm lấy permission
                        <Switch style={{ fontSize: '30px' }} onChange={() => this.handleChange(permisssion.permissionId, permisssion.enabled)} checkedChildren="Vô hiệu hóa" unCheckedChildren="kích hoạt" defaultChecked />///>
                        :
                        <Switch style={{ fontSize: '30px' }} onChange={() => this.handleChange(permisssion.permissionId, permisssion.enabled)} checkedChildren="Vô hiệu hóa" unCheckedChildren="kích hoạt" defaultunChecked />//onChange={ () => this.handleChange(index, this.state.info[index])}/>
                    }

                    {/* <Button type="primary" onClick={() => {
                        this.setState({
                            currentPermission: [...this.state.currentPermission, permisssion.name]
                        })
                        const contract2 = {
                            id: "A2",
                            name: 'John wasdzxczxc',
                            email: "some email",
                            address: '10 Downing Street',
                            status: "deactive",
                            role: "secrectery",
                            phone: 123123123,
                            permissionList: this.state.currentPermission,
                        }
                        this.props.onSubmit(contract2)
                    }} className="employee-form">
                        {permisssion.lable}
                    </Button> */}

                </Form.Item>)
        })
        var Viewpermission = this.state.currentPermission.map((permisssion) => {
            return (
                <Form.Item {...middleLayout} labelAlign='left' label={permisssion.permissionName}  >
                    {this.props.employee.permissions.some(item => permisssion.enabled === true) ?//hàm lấy permission
                        <p>Có quyền sử dụng</p>
                        :
                        <p>Không có quyền sử dụng</p>
                    }


                </Form.Item>)
        })
        var information = this.props.myLoginReducer.map((login, index) => {return(
            <div> {
                login.UpdateAccountPermission === true ? <div>{ permissions }</div>
                : <div>{ Viewpermission }</div>
            }</div>)
        })
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
                    <h2 style={{ textAlign: 'center' }}> Quyền hạn của nhân viên</h2>

                    <Form
                        {...layout}
                        name="basic"
                        className="employee-form"

                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}

                    >{information}
                        {/* <List
                            size="large"
                            header={<div>danh sách quyền hiện tại</div>}
                            footer={<div></div>}
                            bordered
                        >{currentPermissions}</List> */}

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
        onSubmit: (token) => {
            dispatch(updateEmployee(token))
        }
    }
}
var mapStateToProps = state => {

    console.log(state.myLoginReducer)
    return {
      myLoginReducer: state.myLoginReducer
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(ViewEmployee);