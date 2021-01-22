import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import ContractTypeTable from '../Table/ContractTypeTable'
import { MailOutlined, PrinterOutlined, IdcardOutlined, HomeOutlined, PhoneOutlined, BankOutlined, ContactsOutlined } from '@ant-design/icons';
import { Card, Button, Space, message, Descriptions, Select, Form, Input } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { FormBuilder } from 'react-formio';
import axios from 'axios'
import 'reactjs-popup/dist/index.css';
import FadeIn from 'react-fade-in'
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
class TemplateView extends React.Component {
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
            isEdit: false,
            contractContent: "",
            contractName: "",
            finish: false

        };
        // this.handleChange = this.handleChange.bind(this);
        // this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.rteChange = this.rteChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    onEdit = () => {

        this.setState({
            isEdit: !this.state.isEdit,
        });
    };
    rteChange = (value) => {
        console.log(value); // HTML/rich text
        this.setState({
            contractContent: value
        })

    }
    componentDidMount() {
        this.setState({
            contractContent: this.props.template.name,
            contractName: this.props.template.content
        })
    }
    onFinish = (values) => {
        const template = {
            name: this.state.contractName,
            content: this.state.contractContent.replace(/[\t ]+\</g, "<")
        }
        axios({
            url: '/api/v1/ContractType/' + this.props.template.id,
            method: "PUT",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            },
            data: template
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
    nameChange = (value) => {

        this.setState({
            contractName: value
        })

    }
    Cancel = () => {
        this.setState({
            finish: true
        })
    }
    render() {
        const config = {
            readonly: !this.state.isEdit, // all options from https://xdsoft.net/jodit/doc/
            toolbar: this.state.isEdit
        }
        // const content = <p>This is the initial content of the editor</p>;

        // const EDITOR_JS_TOOLS = {
        //     embed: Embed,
        //     table: Table,

        //     list: List,
        //     warning: Warning,
        //     Paragraph: Paragraph,
        //     linkTool: LinkTool,


        //     header: Header,



        // };

        if (this.state.finish) {
            return (<FadeIn>
                <Router>
                    <Redirect push to={"/capstone/ContractType"} />
                    <Route exact path="/capstone/ContractType" render={() => <ContractTypeTable ActiveDeactiveTemplate={this.props.ActiveDeactiveTemplate} UpdateTemplate={this.props.UpdateTemplate} CreateTemplate={this.props.CreateTemplate} token={this.props.token} role={this.props.role} />} /></Router>
            </FadeIn>
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
                                <h2 style={{ textAlign: 'center', fontSize: 16, fontWeight: "bold" }}><Input
                                    defaultValue={this.state.contractName}
                                    value={this.props.template.name}
                                    disabled={!this.state.isEdit}
                                    onChange={(e) => { this.nameChange(e.target.value) }} style={{ width: "100px" }} size="small" /></h2>
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
                                    <Descriptions.Item label={(<b>{"Số Fax:"}</b>)}>....</Descriptions.Item>
                                    <Descriptions.Item label={(<b>{"Do ông(bà):"}</b>)} span={2}>....</Descriptions.Item>
                                    <Descriptions.Item label={(<b>{"Năm sinh:"}</b>)} span={2}>
                                        ....
                                </Descriptions.Item>
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
                                    <Descriptions.Item label={(<b>{"Số Fax:"}</b>)}>....</Descriptions.Item>
                                    <Descriptions.Item label={(<b>{"Do ông(bà):"}</b>)} span={2}>....</Descriptions.Item>
                                    <Descriptions.Item label={(<b>{"Năm sinh:"}</b>)} span={2}>
                                        ....
                                </Descriptions.Item>
                                    <Descriptions.Item label={(<b>{"Chức vụ"}</b>)} span={2}>
                                        ........làm đại diện
                </Descriptions.Item>


                                </Descriptions>
                            </Card>
                        </Space>

                        <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >

                            <JoditEditor

                                value={this.props.template.content}
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

                                        <h6 style={{ fontSize: 14 }}>Hợp đồng có hiệu lực kể từ ngày ... tháng ... năm ... đến
                                        ngày ... tháng ... năm ....
                            </h6>
                                        <Space size="large">

                                            {this.state.isEdit === true ? <Button type="primary" htmlType="submit" className="login-form-button">
                                                Nộp
                            </Button> : null}
                                            {this.state.isEdit === true ? <Button type="primary" htmlType="reset" className="login-form-button">
                                                Xóa dữ liệu đã nhập                                </Button> : null}

                                            {this.state.isEdit === false && this.props.UpdateTemplate ? <Button type="primary" onClick={this.onEdit} className="login-form-button">
                                                Sửa
                            </Button> : null}


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
export default connect(mapStateToProps, null)(TemplateView)