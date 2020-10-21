import React from 'react';
import Popup from 'reactjs-popup';
import 'antd/dist/antd.css';
import '../index.css';
import { createEmployee, employeeInformation } from '../actions/EmployeeAction'
import { connect } from 'react-redux'
import { Space, Card, Button, Row, Col } from 'antd';
import {
    IdcardOutlined, BankOutlined, HomeOutlined, MailOutlined
    , CloudUploadOutlined, RedoOutlined, ReloadOutlined
} from '@ant-design/icons';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import "./Column.css"
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
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

class UpdateProfile extends React.Component {
    constructor() {
        super();

        this.state = {

        };

        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        console.log(values);




    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    render() {
        var i = 0;
        function onChange(e) {
            if (e.target == "checked") { i--; }
            else { i++ }
            console.log(`checked = ${e.target.checked}`);
        }
        function requirement() { if (i == 0) { } }
        return (

            <React.Fragment>
                <br />
                <h2 style={{ textAlign: 'center' }}>Thông tin cá nhân</h2>
                <Space direction="horizontal" align="start"  >


                    <Card style={{width:400, height:300}}>
                        <Grid item xs={12}>

                            <TextField
                                id="name"
                                name="tên"
                                label="tên"
                                fullWidth
                                autoComplete="shipping address-level2"
                            />
                        </Grid>
                        <Grid item xs={12}>

                            <TextField
                                id="username"
                                name="tên đăng nhập"
                                label="tên đăng nhập"
                                fullWidth
                                autoComplete="shipping address-level2"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="company"
                                name="doanh nghiệp"
                                label="doanh nghiệp"
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
                                autoComplete="shipping postal-code"
                            />
                        </Grid>
                    </Card>
                    <Card style={{width:600, height:600}}>
                        <Grid item xs={12}>

                            <TextField
                                id="password"
                                name="mật khẩu"
                                label="mật khẩu"
                                fullWidth
                                autoComplete="shipping address-level2"
                            />
                        </Grid>
                        <Grid item xs={12}>

                            <TextField
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
                        <Space size="large">
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
                            <Button type="primary" value="cancel" onClick={this.Cancel}>
                                Trở về
              </Button>
                        </Space>
                    </Card>









                </Space>
            </React.Fragment >
        );
    }

}


export default UpdateProfile;