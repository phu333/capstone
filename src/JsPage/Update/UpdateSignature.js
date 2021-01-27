import {
    QuestionCircleOutlined
} from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Input, message, Popover, Row, Space } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import '../../index.css';
import SignatureList from '../Table/SignatureList';
const dateFormat = 'YYYY-MM-DD';
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
        offset: 6,
        span: 10,
    },
};
const ValidationSeri = (

    <p>Số seri của chữ ký điện tử mà quý khách muốn sử dụng trong Hisign</p>

); const ValidationDate = (

    <p>Hạn sử dụng chữ ký mà quý khách muốn sử dụng trong Hisign</p>

);
class UpdateSignature extends React.Component {
    constructor() {
        super();

        this.state = {
            isEdit: false,
            finish: false
        };

        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        console.log(values);
        axios({
            url: '/api/DigitalSignature/' + this.props.signature.id,
            method: "PUT",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            },
            data: values
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                message.success("thông tin chỉnh sửa thành công")
                this.setState({
                    isEdit: false
                })
            })
            .catch(error => {
                message.error("Đã có lỗi xảy ra vui lòng kiểm tra thông tin đã nhập và thử lại sau")

            });



    };
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
    }
    componentDidMount() {
        console.log(this.props.signature);
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
                        <Form
                            {...layout}
                            name="basic"
                            className="employee-form"

                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}

                        >

                            <Form.Item
                                label="Số serial"
                                name="serial"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}>
                                        <Input disabled defaultValue={this.props.signature.serialNumber} /> </Col>    <Popover content={ValidationSeri} trigger="hover">
                                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row> : <Row gutter={8}> <Col span={20}>
                                            <Input defaultValue={this.props.signature.serialNumber} /> </Col>    <Popover content={ValidationSeri} trigger="hover">
                                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row>}
                            </Form.Item>

                            <Form.Item
                                label="Ngày hết hạn"
                                name="expiredDate"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}>
                                        <Input
                                            placeholder="ngày hết hạn"

                                            disabled defaultValue={this.props.signature.expirationDate}
                                        /> </Col>    <Popover content={ValidationDate} trigger="hover">
                                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row>
                                    :
                                    <Row gutter={8}> <Col span={20}>
                                        <Input
                                            placeholder="ngày hết hạn"

                                            defaultValue={this.props.signature.expirationDate}
                                        /> </Col>    <Popover content={ValidationDate} trigger="hover">
                                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                                        </Popover></Row>}

                            </Form.Item>




                            <Form.Item {...tailLayout}>
                                <Space size="large">
                                    {this.state.isEdit === true ? <Button type="primary" htmlType="submit" className="login-form-button">
                                        Nộp
                            </Button> : null}
                                    {this.state.isEdit === true ? <Button type="primary" htmlType="reset" className="login-form-button">
                                        Xóa dữ liệu đã nhập                                </Button> : null}

                                    {this.state.isEdit === false && this.props.UpdateSignature ? <Button type="primary" onClick={this.onEdit} className="login-form-button">
                                        Sửa
                            </Button> : null}

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


export default UpdateSignature;