import React from 'react';
import axios from 'axios'
import 'antd/dist/antd.css';
import '../../index.css';
import { createSignature, signatureInformation } from '../../actions/SignatureAction'
import { connect } from 'react-redux'
import { Form, Input, Button, Card, Space, DatePicker,message } from 'antd';
import {
    QuestionCircleOutlined
} from '@ant-design/icons';
import { Button, Card, DatePicker, Form, Input, Popover, Space,Row,Col } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { createSignature } from '../../actions/SignatureAction';
import '../../index.css';
import SignatureList from '../Table/SignatureList';

const { RangePicker } = DatePicker;
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
        
        this.setState({
            finish: true
        })

        axios({
            url: '',
            method: "POST",
            data: values
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {

                

            })
            .catch(error => {

                if (error.response.status === 500) {
                    message.error(error.response.status + ' Server under maintainence');
                } else if (error.response.status === 404) {
                    message.error(error.response.status + ' Server not found');
                }

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
        const Validation = (

            <p>Nên để họ tên thật</p>
        
        );
        if (this.state.finish) {
            return (<Router>
                <Redirect push to={"/capstone/signatureList"} />
                <Route exact path="/capstone/signatureList" component={SignatureList} /></Router>);
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
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Số serial ',
                                    },
                                ]}
                            >
                                <Row gutter={8}> <Col span={20}> <Input placeholder="Số serial" /></Col><Popover content={Validation} trigger="hover">
                                    <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                </Popover></Row>
                            </Form.Item>
                            <Form.Item
                                label="Nhà cung cấp"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Nhà cung cấp ',
                                    },
                                ]}
                            >
                                <Row gutter={8}> <Col span={20}> <Input placeholder="Nhà cung cấp" /></Col><Popover  content={Validation} trigger="hover">
                                    <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                </Popover></Row>
                            </Form.Item>
                            <Form.Item
                                label="Thời hạn"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Thời hạn',
                                    },
                                ]}
                            >
                                <RangePicker
                                    showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD HH:mm"
                                    onChange={this.onChange}
                                    onOk={this.onOk}
                                /><Popover  content={Validation} trigger="hover">
                                <Button size="small" shape="circle"  style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                            </Popover>
                            </Form.Item>




                            <Form.Item {...tailLayout}>
                                <Space size="large">
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Nộp
                                </Button>
                                    <Button type="primary" htmlType="reset" className="login-form-button">
                                        Reset
                                </Button>


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