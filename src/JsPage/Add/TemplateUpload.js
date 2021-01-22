import React from 'react';

import 'antd/dist/antd.css';
import { connect } from 'react-redux'

import { Card, Button, Space, Checkbox, Descriptions, Select, Form, Input, message } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'

import axios from 'axios'



import ContractTypeTable from '../Table/ContractTypeTable'

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
            finish: false
        };

        this.rteChange = this.rteChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
    }

    rteChange = (value) => {
        console.log(value)
        this.setState({
            contractContent: value.replace(/\n/g, "")
        })

    }
    nameChange = (value) => {

        this.setState({
            contractName: value
        })
        
    }
    onFinish = (values) => {
        
        const template = {
            name: this.state.contractName,
            content: this.state.contractContent.replace(/[\t ]+\</g, "<")
        }
        console.log(this.state.contractContent)
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

                message.success("taọ thành công")
                this.setState({
                    finish: true
                })

            })
            .catch(error => {
                message.error("Đã có lỗi xảy ra vui lòng kiểm tra thông tin đã nhập và thử lại sau")


            });

    };
    Cancel = () => {
        this.setState({
            finish: true
        })
    }
    render() {
        const config = {
            readonly: false // all options from https://xdsoft.net/jodit/doc/
        }
        if (this.state.finish) {
            return (
                <Router>
                <Redirect push to={"/capstone/ContractType"} />
                <Route exact path="/capstone/ContractType" render={() => <ContractTypeTable ActiveDeactiveTemplate={this.props.ActiveDeactiveTemplate} UpdateTemplate={this.props.UpdateTemplate} CreateTemplate={this.props.CreateTemplate} token={this.props.token} role={this.props.role} />} /></Router>
            );
        } else {

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

                                <h1 style={{ textAlign: 'center', fontSize: 14 }}><Input
                                    onChange={(e) => { this.nameChange(e.target.value) }} style={{ width: "100px" }} size="small" /></h1>
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
                            <JoditEditor


                                config={config}


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
                                        Giá trị hợp đồng:........
                                        
                                    <h6 style={{ fontSize: 14 }}>Hợp đồng có hiệu lực kể từ ngày ... tháng ... năm ... đến
                                        ngày ... tháng ... năm ....
                            </h6>
                                        <Space size="large">

                                            <Button type="primary" htmlType="submit" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            Tạo
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
}
var mapStateToProps = state => {
    console.log(state.myLoginReducer)
    return {
        myLoginReducer: state.myLoginReducer
    }
}
export default connect(mapStateToProps, null)(TemplateUpload)