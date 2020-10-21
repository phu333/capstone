import React from 'react';

import 'antd/dist/antd.css';
import '../index.css';
import { createSignature, signatureInformation } from '../actions/SignatureAction'
import { connect } from 'react-redux'
import { Form, Input, Button, Row, Col } from 'antd';
import {
    ReloadOutlined, CloudUploadOutlined
} from '@ant-design/icons';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

class AddSignature extends React.Component {
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

            name: 'Mike',
            email: "some email",
            provider: 'Viettel',
            status: "active",
            expired: 2022

        }
        this.setState({
            finish: true
        })

        this.props.onSubmit(contract1)




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


        return (
            <div style={{
                margin: "auto",
                width: "1000px",
                paddingLeft: "50px",
                border: "solid"
            }
            }>
                <br/>
                <Button type="primary" value="cancel" onClick={this.Cancel}>
                    Trở về
              </Button>
                <h2 style={{ textAlign: 'center' }}>Thông tin chữ ký</h2>
                <React.Fragment>
                    <Row type="flex" justify="center" align="middle" style={{ height: "100vh" }}>
                        <Col span={10} >
                            <Grid container spacing={3}>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="holder"
                                        name="Tên người giữ"
                                        label="Tên người giữ"
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="serial"
                                        name="số serial"
                                        label="số serial"
                                        fullWidth
                                        autoComplete="number"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="address1"
                                        name="address1"
                                        label="Address line 1"
                                        fullWidth
                                        autoComplete="shipping address-line1"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="expiredDate"
                                        name="Ngày hết hạn"
                                        label="Ngày hết hạn"
                                        fullWidth
                                        autoComplete="date"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="provider"
                                        name="nhà cung cấp chữ ký"
                                        label="nhà cung cấp chữ ký"
                                        fullWidth
                                        autoComplete="nhà cung cấp chữ ký"
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <Button type="primary" >
                                        <CloudUploadOutlined />  Nộp
                            </Button>

                                    <Button type="primary" style={{
                                        margin: '0 8px',
                                    }} htmlType="button">
                                        <ReloadOutlined />   Reset
                            </Button>

                                </Grid>


                            </Grid>
                        </Col>
                    </Row>
                </React.Fragment>
                {/* <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    labelAlign="left"
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                ><br />
                    <Form.Item
                        label={(<b><IdcardOutlined />{"Tên doanh nghiệp"} </b>)}
                        name="companyname"
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
                        label={(<b><MailOutlined /> {"Địa chỉ Email"} </b>)}
                        name="email"
                        requiredMark="false"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Địa chỉ email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={(<b><BankOutlined /> {"Mã số thuế"} </b>)}
                        name="taxcode"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Mã số thuế',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={(<b><HomeOutlined /> {"Địa chỉ"} </b>)}
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

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            <CloudUploadOutlined /> Nộp
                            </Button>
                        <Button type="primary" style={{
                            margin: '0 8px',
                        }} htmlType="button">
                            <RedoOutlined />    Reset
                            </Button>
                    </Form.Item>
                </Form> */}
            </div >
        );
    }

}


var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (signature) => {
            dispatch(createSignature(signature))
        }
    }
}
export default connect(null, mapDispatchToProps)(AddSignature);