import { CloudUploadOutlined, ReloadOutlined } from '@ant-design/icons';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button, Card, Space } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import Popup from 'reactjs-popup';
import '../index.css';
import "./Column.css";

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

class UpdateProfileCompany extends React.Component {
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
                            placeholder="phu333"
                                id="name"
                                name="tên"
                                label="phu333"
                                fullWidth
                                autoComplete="shipping address-level2"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>

                            <TextField
                                id="username"
                                name="tên đăng nhập"
                                label="phu333"
                                fullWidth
                                autoComplete="shipping address-level2"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="company"
                                name="doanh nghiệp"
                                label="HiSign"
                                fullWidth
                                autoComplete="shipping postal-code"
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="role"
                                name="chức vụ"
                                label="Secretary"
                                fullWidth
                                autoComplete="shipping postal-code"
                                disabled
                            />
                        </Grid>
                    </Card>
                    <Card style={{width:800, height:600}}>
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
                        <Grid item xs={12} gutter={16}>
                            <TextField
                                id="address"
                                name="địa chỉ"
                                label="địa chỉ"
                                fullWidth
                                autoComplete="shipping address-line2"
                                
                            />
                        </Grid>
                        <div style={{marginTop:"50px", paddingLeft:"200px"}}>
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
                        </div>
                    </Card>









                </Space>
            </React.Fragment >
        );
    }

}


export default UpdateProfileCompany;