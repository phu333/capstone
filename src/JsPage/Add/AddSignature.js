import React from 'react';
import axios from 'axios'
import 'antd/dist/antd.css';
import '../../index.css';
import { createSignature, signatureInformation } from '../../actions/SignatureAction'
import { connect } from 'react-redux'
import { Form, Input, Button, Card, Space, DatePicker, message, Row, Col, Popover } from 'antd';
import {
    QuestionCircleOutlined
} from '@ant-design/icons';
import SignatureList from '../Table/SignatureList'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
const { RangePicker } = DatePicker;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 10,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 10,
    },
};
const ValidationSeri = (

    <p>Số Seri của chữ ký số được phép dùng để ký</p>

);
const ValidationSup = (

    <p>Tên đơn vị cung cấp chữ ký số</p>

);
const ValidationDate = (

    <p>Thời hạn sử dụng chữ ký mà người dùng muốn trong hệ thống</p>

);
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


        axios({
            url: '/api/v1/Company/info',
            method: "PUT",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            }
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                console.log(data.data.id)
                let signatureInfo={
                    serialNumber:values.serial,
                    expirationDate:values.expiredDate,
                    companyId: parseInt(data.data.id) ,
                    company:data.data,
                    
                }
                console.log(signatureInfo)
                axios({
                    url: '/api/DigitalSignature',
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + this.props.token,

                    },
                    data: signatureInfo
                })
                    .then((response) => {

                        return response.data;
                    })
                    .then((data) => {
                        setTimeout(function () {
                            this.setState({
                                finish: true
                            })
                        }.bind(this), 5000)
                        message.success("taọ thành công")


                    })
                    .catch(error => {
                        message.error("Đã có lỗi xảy ra vui lòng kiểm tra thông tin đã nhập và thử lại sau")
                        console.log(error)

                    });


            })
            .catch(error => {
                console.log(error)


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

        if (this.state.finish) {
            return (<Router>
                <Redirect push to={"/capstone/signatureList"} />
                <Route exact path="/capstone/signatureList" render={() => <SignatureList ActiveDeactiveSignature={this.props.ActiveDeactiveSignature} UpdateSignature={this.props.UpdateSignature} CreateSignature={this.props.CreateSignature} token={this.props.token} />} /></Router>);
        } else {
            return (
                <div >
                    <Button type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>
                    <h2 style={{ textAlign: 'center' }}>Thông tin chữ ký</h2>
                    <Card>
                        <br />
                        <Form
                            {...layout}
                            name="basic"
                            className="employee-form"
                            hideRequiredMark
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}

                        >

                            <Form.Item
                                label="Số serial"
                                name="serial"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Số serial ',
                                    },
                                ]}
                            >
                                <Row gutter={8}> <Col span={20}><Input placeholder="Số serial" /> </Col>    <Popover content={ValidationSeri} trigger="hover">
                                    <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                </Popover></Row>
                            </Form.Item>

                            <Form.Item
                                label="Ngày hết hạn"
                                name="expiredDate"
                                
                            >
                                <Row gutter={8}> <Col span={20}>  <Input
                                                placeholder="ngày hết hạn"
                                                type="date"
                                                
                                            /> </Col>    <Popover content={ValidationDate} trigger="hover">
                                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>
                            </Form.Item>




                            <Form.Item {...tailLayout}>
                                <Space size="large">
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Tạo
                                </Button>
                                    <Button type="primary" htmlType="reset" className="login-form-button">
                                        Xóa dữ liệu đã nhập                                </Button>


                                </Space>
                            </Form.Item>
                            <Form.Item>

                            </Form.Item>




                        </Form>




                    </Card >

                </div >
            );
        }

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