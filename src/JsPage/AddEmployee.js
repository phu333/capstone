import React from 'react';

import 'antd/dist/antd.css';
import '../index.css';
import { createEmployee, employeeInformation } from '../actions/EmployeeAction'
import { connect } from 'react-redux'
import { Form, Input, Button,Row,Col } from 'antd';
import {
    IdcardOutlined, BankOutlined, HomeOutlined, MailOutlined
    , CloudUploadOutlined, RedoOutlined
} from '@ant-design/icons';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

    Cancel = () =>{
        this.setState({
            finish: true
        })
    }
    render() {


        return (
            <div style={{
                margin: "auto",
                width: "1000px",
                paddingLeft:"50px",
                border:"solid"
            }
            }>
                <Button type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>
                <h2 style={{ textAlign: 'center' }}>Thông tin nhân viên</h2>
                <React.Fragment>
                <Row type="flex" justify="center" align="middle" style={{ height: "100vh" }}>
                    <Col span={10} >
                        <Grid container spacing={3}>
                            
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="firstName"
                                        name="firstName"
                                        label="First name"
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lastName"
                                        label="Last name"
                                        fullWidth
                                        autoComplete="family-name"
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
                                        id="address2"
                                        name="address2"
                                        label="Address line 2"
                                        fullWidth
                                        autoComplete="shipping address-line2"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="city"
                                        name="city"
                                        label="City"
                                        fullWidth
                                        autoComplete="shipping address-level2"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="state" name="state" label="State/Province/Region" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="zip"
                                        name="zip"
                                        label="Zip / Postal code"
                                        fullWidth
                                        autoComplete="shipping postal-code"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="country"
                                        name="country"
                                        label="Country"
                                        fullWidth
                                        autoComplete="shipping country"
                                    />
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
      onSubmit: (employee) => {
        dispatch(createEmployee(employee))
      }
    }
  }
  
  export default connect(null, mapDispatchToProps)(AddEmployee);