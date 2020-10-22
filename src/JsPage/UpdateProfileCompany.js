import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {
    IdcardOutlined, BankOutlined, HomeOutlined, MailOutlined
    , CloudUploadOutlined, RedoOutlined
} from '@ant-design/icons';
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


        return (
            <div style={{
                margin: "auto",
                width: "1000px",
                paddingLeft: "50px",
                border: "solid"
            }
            }>
                <React.Fragment>
                    <Button type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>
                    <h2 style={{ textAlign: 'center' }}>Thông tin doanh nghiệp</h2>
                    <Row type="flex" justify="center" align="middle" style={{ height: "100vh" }}>
                        <Col span={10} >
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="company"
                                        name="company"
                                        label="tên doanh nghiệp"
                                        fullWidth
                                        autoComplete=""
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="taxcode"
                                        name="taxcode"
                                        label="mã số thuế"
                                        fullWidth
                                        autoComplete=""
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="faxcode"
                                        name="faxcode"
                                        label="số fax"
                                        fullWidth
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="telePhone"
                                        name="số điện thoại"
                                        label="điện thoại"
                                        fullWidth
                                        autoComplete="shipping address-line1"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="email"
                                        name="địa chỉ mail"
                                        label="địa chỉ mail"
                                        fullWidth
                                        autoComplete="shipping address-level2"
                                    />
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
                                        name="presentor"
                                        label="người đại diện"
                                        fullWidth
                                        autoComplete=""
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="role"
                                        name="chức vụ"
                                        label="chức vụ"
                                        fullWidth
                                        autoComplete=""
                                    />
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
                            </Grid>
                        </Col>
                    </Row>
                </React.Fragment>
            </div >
        );
    }

}


export default UpdateProfileCompany;