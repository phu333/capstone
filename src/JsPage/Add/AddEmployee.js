import { CloudUploadOutlined, QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button, Col, Popover, Row } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import { createEmployee } from '../../actions/EmployeeAction';
import '../../index.css';
import "../Column.css";
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
const Validation = (

    <p>Nên để họ tên thật</p>

);
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
                <Row type="flex" justify="center" align="middle" style={{ height: "100vh" }}>
                    <Col span={10} >
                        <Grid container alignItems="center" spacing={3}>
                            <Grid item style={{ display: 'inline-flex' }} direction="row" xs={12} sm={6}>
                                <TextField
                                    required
                                    id="firstname"
                                    name="Họ"
                                    label="Họ"
                                    autoComplete="Họ nhân viên"
                                /><Popover  content={Validation} trigger="hover">
                                    <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                </Popover>
                            </Grid>
                            <Grid item style={{ display: 'inline-flex' }} xs={12} sm={6}>
                                <TextField
                                    required
                                    id="lastname"
                                    name="Tên"
                                    label="Tên"
                                    fullWidth
                                    autoComplete="Tên nhân viên"
                                /><Popover content={Validation} trigger="hover">
                                    <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                </Popover>
                            </Grid>
                            <Grid item style={{ display: 'inline-flex' }} xs={12} sm={6}>
                                <TextField
                                    required
                                    id="taxCode"
                                    name="Mã số thuế"
                                    label="Mã số thuế"
                                    fullWidth
                                    autoComplete="family-name"
                                /><Popover content={Validation} trigger="hover">
                                    <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                </Popover>
                            </Grid>
                            <Grid item style={{ display: 'inline-flex' }} xs={12} sm={6}>
                                <TextField
                                    required
                                    id="telePhone"
                                    name="Số điện thoại"
                                    label="Điện thoại"
                                    fullWidth
                                    autoComplete="shipping address-line1"
                                /><Popover content={Validation} trigger="hover">
                                    <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                </Popover>
                            </Grid>
                            <Grid item style={{ display: 'inline-flex' }} xs={12} sm={6}>
                                <TextField
                                    required
                                    id="email"
                                    name="Địa chỉ mail"
                                    label="Địa chỉ mail"
                                    fullWidth
                                    autoComplete="shipping address-level2"
                                /><Popover content={Validation} trigger="hover">
                                    <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                </Popover>
                            </Grid>
                            <Grid item style={{ display: 'inline-flex' }} xs={12} sm={6}>
                                <TextField
                                    id="address"
                                    name="Địa chỉ"
                                    label="Địa chỉ"
                                    fullWidth
                                    autoComplete="shipping address-line2"
                                /><Popover content={Validation} trigger="hover">
                                    <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                </Popover>
                            </Grid>

                            <Grid item style={{ display: 'inline-flex' }} xs={12} sm={6}>
                                <TextField
                                    required
                                    id="role"
                                    name="Chức vụ"
                                    label="Chức vụ"
                                    fullWidth
                                    autoComplete="shipping postal-code"
                                /><Popover content={Validation} trigger="hover">
                                    <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                </Popover>
                            </Grid>
                            <Grid item xs={12}>
                                <b>Quyền Hạn</b>
                                <br />
                                <Row>
                                    <Col span={8}>
                                        <FormControlLabel
                                            control={<Checkbox onChange={onChange} ></Checkbox>}
                                            label="Ký"
                                        />
                                        <p></p>
                                    </Col>
                                    <Col span={8}>
                                        <FormControlLabel
                                            control={<Checkbox onChange={onChange} ></Checkbox>}
                                            label="Quản lý hợp đồng"
                                        />
                                        <p></p>
                                    </Col>

                                    <Col span={8}>
                                        <FormControlLabel
                                            control={<Checkbox onChange={onChange} >Quản lý nhân viên</Checkbox>}
                                            label="Quản lý nhân viên"
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
                                            label="Quản lý chữ ký"
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