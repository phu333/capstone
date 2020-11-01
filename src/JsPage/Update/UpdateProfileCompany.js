import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';

import {
    IdcardOutlined, BankOutlined, HomeOutlined, MailOutlined
    , CloudUploadOutlined, RedoOutlined
} from '@ant-design/icons';

import { Form, Input, Button, Row,Popover, Col, Card, Space } from 'antd';

import {
    QuestionCircleOutlined, UserOutlined
} from '@ant-design/icons';

import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'




const layout = {
    labelCol: {
        span: 6,

    },
    wrapperCol: {
        span: 14,
    },
};


const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 10,
    },
};
const middleLayout = {
    wrapperCol: {
        offset: 6,
        span: 10,
    },
};
class UpdateProfileCompany extends React.Component {
    constructor() {
        super();
        this.state = {
            finish: false,
            isEdit: false,
            value: 'date'
        };
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {


        this.setState({
            finish: true
        })

    };
    Cancel = () => {
        this.setState({
            finish: true
        })
    }
    onEdit = (values) => {
        this.setState({
            isEdit: true
        })


    }; onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        const name="hello"


        return (


            <React.Fragment>
                <h2 style={{ textAlign: 'center' }}>Thông tin doanh nghiệp</h2>
                <Space direction="horizontal" align="start"  >


                    <Card style={{ width: 800, minHeight: 600 }}>

                        <Form
                            {...layout}
                            name="basic"
                            className="employee-form"

                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}

                        >
                            <Form.Item
                                label="Tên doanh nghiệp"
                                name="company"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue="HiSign" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="HiSign" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Mã số thuế"
                                name="name"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue="1231231" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="1231231" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Điện thoại"
                                name="phone"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue="1231231" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="1231231" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue="12/10/4/8" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="12/10/4/8" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="Email"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue="Email" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="Email" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Giấy phép kinh doanh"
                                name="certificate"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue="34534534" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="34534534" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Tài khoản ngân hàng"
                                name="bankaccount"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue="34534534" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input  defaultValue="34534534" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Người đại diện"
                                name="presentor"

                            >
                                {this.state.isEdit === false ?
                                   <Row gutter={8}> <Col span={20}><Input disabled defaultValue="Nguyen Van A" /></Col>    <Popover content={name} trigger="hover">
                                   <Button shape="circle" icon={<QuestionCircleOutlined />} />
                               </Popover></Row>  :
                                   <Row gutter={8}> <Col span={20}><Input  defaultValue="Nguyen Van A" /></Col>    <Popover content={name} trigger="hover">
                                   <Button shape="circle" icon={<QuestionCircleOutlined />} />
                               </Popover></Row> }
                            </Form.Item>



                            <Form.Item
                                label="Chức vụ"
                                name="role"

                            >
                                {this.state.isEdit === false ?
                                   <Row gutter={8}> <Col span={20}><Input disabled defaultValue="Giám đốc" /></Col>    <Popover content={name} trigger="hover">
                                   <Button shape="circle" icon={<QuestionCircleOutlined />} />
                               </Popover></Row> :
                                   <Row gutter={8}> <Col span={20}><Input  defaultValue="Giám đốc" /></Col>    <Popover content={name} trigger="hover">
                                   <Button shape="circle" icon={<QuestionCircleOutlined />} />
                               </Popover></Row>}
                            </Form.Item>




                            <Form.Item {...tailLayout}>
                                <Space size="large">
                                    {this.state.isEdit === true ? <Button type="primary" htmlType="submit" className="login-form-button">
                                        Nộp
                            </Button> : null}
                                    {this.state.isEdit === true ? <Button type="primary" htmlType="reset" className="login-form-button">
                                        Reset
                            </Button> : null}

                                    {this.state.isEdit === false ? <Button type="primary" onClick={this.onEdit} className="login-form-button">
                                        Sửa
                            </Button> : null}


                                </Space>
                            </Form.Item>
                            <Form.Item>

                            </Form.Item>




                        </Form>

                    </Card></Space>
            </React.Fragment>


        );
    }
}



export default UpdateProfileCompany;
