import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'

import { MailOutlined, PrinterOutlined, IdcardOutlined, HomeOutlined, PhoneOutlined, BankOutlined, ContactsOutlined } from '@ant-design/icons';
import { Card, Button, Space, Checkbox, Descriptions, Select, Form, Input, message } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { FormBuilder } from 'react-formio';
import axios from 'axios'
import 'reactjs-popup/dist/index.css';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import 'react-quill/dist/quill.snow.css';
import JoditEditor from "jodit-react";


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const { Option } = Select;
class TemplateUpload extends React.Component {
    constructor() {
        super();
        this.modules = {
            toolbar: [
                [{ 'font': [] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                [{ 'color': [] }, { 'background': [] }],
                ['clean']
            ]
        };

        this.formats = [
            'font',
            'size',
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'align',
            'color', 'background'
        ];
        this.state = {
            contractContent: "",
            templateName: "",
            contractName: "",

        };

        this.rteChange = this.rteChange.bind(this);

    }

    rteChange = (value) => {
        console.log(value); // HTML/rich text
        this.setState({
            contractContent: value
        })

    }
    onFinish = (values) => {
        console.log(this.state.contractName)
        const template = {
            name: "tên",
            content: JSON.stringify(this.state.contractContent)
        }
        axios({
            url: '/api/v1/ContractType',
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            },
            data: template
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {



            })
            .catch(error => {



            });

    };
    render() {
        const config = {
            readonly: false // all options from https://xdsoft.net/jodit/doc/
        }


        return (
            <div style={{ fontSize: 14 }} >
                <Button type="primary" value="cancel" onClick={this.Cancel}>
                    Trở về
      </Button>

                <Space direction="vertical" align="center" >

                    <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                        <Card bordered={false}>
                            <h6 style={{ textAlign: 'center', fontSize: 14 }}>Cộng hòa xã hội chủ nghĩa Việt Nam</h6>
                            <h6 style={{ textAlign: 'center', fontSize: 14 }}>Độc lập-tự do-hạnh phúc</h6>
                            <br />
                            <h2 style={{ textAlign: 'center', fontSize: 16, fontWeight: "bold" }}>
                                <Input onChange={(value) => {
                                 console.log(value)
                                this.setState({
                                    contractName: value
                                })
                                console.log(this.state.contractName)
                            }} style={{ width: "100px" }} size="small" /></h2>
                            <h6 style={{ textAlign: 'center', fontSize: 14, fontWeight: "bold" }}>Số.../...</h6>
                            <h6 style={{ fontSize: 14, fontWeight: "bold" }}>Hôm nay, ngày...tháng...năm....,
                            tại........, chúng tôi gồm
                            </h6>

                        </Card>

                        <Card bordered={false}>
                            <Descriptions size="small" column={2} title={"Thông tin bên A"}  >
                                <Descriptions.Item label={(<b>{"Công ty/Tổ chức:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Địa chỉ:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Điện thoại:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Địa chỉ Email:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Giấy phép kinh doanh:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Mã số thuế:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Tài khoản số:"}</b>)}>....</Descriptions.Item>

                                <Descriptions.Item label={(<b>{"Do ông(bà):"}</b>)} span={2}>....</Descriptions.Item>

                                <Descriptions.Item label={(<b>{"Chức vụ"}</b>)} span={2}>
                                    ........làm đại diện
                                </Descriptions.Item>
                            </Descriptions>


                            <Descriptions title="" size="small" column={2} title="Thông tin bên B"

                            >

                                <Descriptions.Item label={(<b>{"Công ty/Tổ chức:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Địa chỉ:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Điện thoại:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Địa chỉ Email:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Giấy phép kinh doanh:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Mã số thuế:"}</b>)}>....</Descriptions.Item>
                                <Descriptions.Item label={(<b>{"Tài khoản số:"}</b>)}>....</Descriptions.Item>

                                <Descriptions.Item label={(<b>{"Do ông(bà):"}</b>)} span={2}>....</Descriptions.Item>

                                <Descriptions.Item label={(<b>{"Chức vụ"}</b>)} span={2}>
                                    ........làm đại diện
                </Descriptions.Item>


                            </Descriptions>
                        </Card>
                    </Space>

                    <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                        Giá trị hợp đồng:........
                        <JoditEditor


                            config={config}
                            tabIndex={1} // tabIndex of textarea

                            onChange={this.rteChange}
                        />
                        <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                            <Card bordered={false}>

                                <Form

                                    name="basic"
                                    className="lcontract-form"

                                    onFinish={this.onFinish}
                                    onFinishFailed={this.onFinishFailed}

                                >

                                    <h6 style={{ fontSize: 14 }}>Hợp đồng có hiệu lực kể từ ngày 3 tháng 11 năm 2020 đến
                                    ngày ... tháng ... năm ....
                            </h6>
                                    <Space size="large">

                                        <Button type="primary" htmlType="submit" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            nộp
                                                    </Button>

                                        <Button type="primary" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            Lưu
                                                    </Button>


                                    </Space>
                                </Form>

                            </Card>
                        </Space>
                    </Space>

                </Space>
            </div>
        );


    }
}

var mapStateToProps = state => {
    console.log(state.myLoginReducer)
    return {
        myLoginReducer: state.myLoginReducer
    }
}
export default connect(mapStateToProps, null)(TemplateUpload)