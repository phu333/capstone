import React from 'react';

import 'antd/dist/antd.css';
import '../index.css';
import { createEmployee, employeeInformation } from '../actions/EmployeeAction'
import { connect } from 'react-redux'
import { Form, Input, Button, Row, Col } from 'antd';
import {
    IdcardOutlined, BankOutlined, HomeOutlined, MailOutlined
    , CloudUploadOutlined, RedoOutlined
} from '@ant-design/icons';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import "./Column.css"
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

class AddEmployee extends React.Component {
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
            address: '10 Downing Street',
            status: "active",
            role: "secretery"

        }


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
            console.log(`checked = ${e.target.checked}`);
        }
        function requirement() { if (i == 0) { } }
        return (

            <React.Fragment>
                <br />
                <h2 style={{ textAlign: 'center' }}>Tạo người dùng</h2>
                <Row type="flex" justify="center" align="middle" style={{ height: "100vh" }}>
                    <Col span={10} >
                        <Grid container spacing={3}>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="company"
                                    name="Tên doanh nghiệp"
                                    label="Tên doanh nghiệp"
                                    fullWidth
                                    autoComplete="Tên doanh nghiệp"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="taxCode"
                                    name="Mã số thuế"
                                    label="Mã số thuế"
                                    fullWidth
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="faxCode"
                                    name="số fax"
                                    label="số fax"
                                    fullWidth
                                    autoComplete="shipping address-line1"
                                />
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


                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="presentor"
                                    name="Người đại diện"
                                    label="Người đại diện"
                                    fullWidth
                                    autoComplete="shipping postal-code"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <b>Quyền Hạn</b>
                                <br />
                                <Row>
                                    <Col span={8}>
                                        <Checkbox onChange={onChange}>Ký</Checkbox>
                                        <p></p>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox onChange={onChange}>Quản lý hợp đồng</Checkbox>
                                        <p></p>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox onChange={onChange}>Quản lý nhân viên</Checkbox>
                                        <p></p>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox onChange={onChange}>Quản lý loại hợp đồng</Checkbox>
                                        <p></p>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox onChange={onChange}>Quản lý chữ ký</Checkbox>
                                        <p></p>
                                    </Col>
                                </Row>
                            </Grid>

                        </Grid>
                        <div></div><br />
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
                            <Button type="primary" value="cancel" onClick={this.Cancel}>
                                Trở về
              </Button>
                        </Grid>
                    </Col>
                </Row>
            </React.Fragment >
        );
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