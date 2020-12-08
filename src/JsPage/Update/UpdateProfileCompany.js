import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import axios from 'axios'
import {
    IdcardOutlined, BankOutlined, HomeOutlined, MailOutlined
    , CloudUploadOutlined, RedoOutlined
} from '@ant-design/icons';

import { Form, Input, Button, Row, Popover, Col, Card, Space,message } from 'antd';

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
            value: 'date',
            company: {},
        };
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        axios({
            url: '/api/v1/Company/'+this.state.company.id,
            method: "PUT",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            },
            data:values
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                
            })
            .catch(error => {
                console.log(error)
                if (error.response.status === 500) {
                    message.error(error.response.status + ' Server under maintainence');
                } else if (error.response.status === 404) {
                    message.error(error.response.status + ' Server not found');
                }

            });

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
    componentDidMount(){
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
                console.log(data.data)
                this.setState({
                    company: data.data
                })
                console.log(this.state.company)
            })
            .catch(error => {
                console.log(error)
                if (error.response.status === 500) {
                    message.error(error.response.status + ' Server under maintainence');
                } else if (error.response.status === 404) {
                    message.error(error.response.status + ' Server not found');
                }

            });
    }
    render() {
        console.log(this.state.company.name)
        const name = "hello"


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
                                
                                name="id"
                                initialValue={this.state.company.id}
                            >
                               
                            </Form.Item>
                            <Form.Item
                                label="Tên doanh nghiệp"
                                name="name"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.state.company.name} /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue={this.state.company.name} /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Mã số thuế"
                                name="taxCode"
                                rules={[
                                    
                                    {
                                        
                                        message: 'Vui lòng nhập 10 ký tự',
                                        min: 10,
                                        max: 10,
                                    },
                                ]}   
                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.state.company.taxCode} /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue={this.state.company.taxCode} /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Điện thoại"
                                name="phoneNumber"
                                rules={[
                                   
                                    {
                                        
                                        message: 'Vui lòng nhập 10 ký tự',
                                        min: 10,
                                        max: 10,
                                    },
                                ]}    
                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.state.company.phoneNumber} /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue={this.state.company.phoneNumber} /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.state.company.address} /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue={this.state.company.address} /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.state.company.email} /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue={this.state.company.email} /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Giấy phép kinh doanh"
                                name="businessLicense"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.state.company.businessLicense} /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue={this.state.company.businessLicense} /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Tài khoản ngân hàng"
                                name="bankAccount"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.state.company.bankAccount} /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue={this.state.company.bankAccount} /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Người đại diện"
                                name="representaive"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.state.company.name} /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue={this.state.company.name} /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>



                            {/* <Form.Item
                                label="Chức vụ"
                                name="role"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue="Giám đốc" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="Giám đốc" /></Col>    <Popover content={name} trigger="hover">
                                        <Button shape="circle" icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item> */}




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
