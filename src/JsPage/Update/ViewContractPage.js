import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import {
    FileExcelOutlined, IdcardOutlined, BankOutlined, PhoneOutlined, PrinterOutlined, HomeOutlined, MailOutlined
    , ContactsOutlined, CalendarOutlined, DollarOutlined, DeleteOutlined, CloudUploadOutlined, AuditOutlined
} from '@ant-design/icons';
import { FileSaver } from 'file-saver';
import ContractExtensionTable from '../Table/ContractExtensionTable'
import { Descriptions, InputNumber, Space, Button, DatePicker, Input, Card, Form, Select, Table, Comment, List, Avatar, Pagination } from 'antd';
import ContractTable from '../Table/ContractTable'
import moment from 'moment'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { parse } from 'semver';
import JoditEditor from "jodit-react";
const dateFormat = 'YYYY-MM-DD';
const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;
const { TextArea } = Input;
const { Option } = Select;
const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

class ContractView extends React.Component {
    constructor() {
        super();
        this.modules = {
            toolbar: [

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


            openExtension: false,
            openCommentSection: false,
            finish: false,
            showContent: "customer",
            comments: [],
            submitting: false,
            value: '',
            currentPage: 1,
            creator: "",
            isEdit: false,
            company: {},
            BSide: {
                Name: "",
                MST: "",
                Phone: "",
                Address: "",
                Email: "",
                Representative: "",
                Position: "",
                BusinessLicensce: "",

                BankAccount: "",
            },
            customers: [],
            validSignature: false,
        };

        this.OpenExtension = this.OpenExtension.bind(this)
        this.OpenCommentSection = this.OpenCommentSection.bind(this)
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }
    onEditorStateChange(editorState) {
        console.log(editorState)
        this.setState({
            editorState: editorState,
        });
    };
    onEdit = (values) => {
        this.setState({
            isEdit: true
        })




    };
    componentDidMount() {
        
        
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
                axios({
                    url: '/api/v1/Contract/a-side-info',
                    method: "GET",
                    headers: {
                        Authorization: 'Bearer ' + this.props.token,
        
                    },
                    params: {
                        id: this.props.contract.id,
                    }
                })
                    .then((response) => {
        
                        return response.data;
                    })
                    .then((data) => {
                        console.log(data)
                        this.setState({
                            creator: data.companyId
                        })
                        if(this.state.company.id === data.companyId){
                            axios({
                                url: '/api/v1/Customer',
                                method: "GET",
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
                                        customers: data.data.filter(
                                            customer => customer.id === this.props.contract.customer.id
                                
                                
                                
                                        ),
                                    })
                    
                    
                                })
                                .catch(error => {
                                    console.log(error)
                    
                    
                                });
                        }else{
                            axios({
                                url: '/api/v1/Customer',
                                method: "GET",
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
                                        customers: data.data.filter(
                                            customer => customer.companyId  === this.state.creator
                                
                                
                                
                                        ),
                                    })
                    
                    
                                })
                                .catch(error => {
                                    console.log(error)
                    
                    
                                });
                        }
        
                    })
                    .catch(error => {
                        console.log(error)
        
        
                    });
            })
            .catch(error => {
                console.log(error)


            });

    }
    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                        author: 'Han Solo',

                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                    ...this.state.comments,
                ],
            });
        }, 1000);
    };
    onPageChange = page => {
        console.log(page);
        this.setState({
            currentPage: page,
        });
    };
    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
    OpenExtension() {
        this.setState({
            openExtension: true
        })
    }
    OpenCommentSection() {
        this.setState({
            openCommentSection: true
        })
    }
    onFinish = () => {
        console.log(this.state.company.taxCode)
        console.log(this.state.customers[0].taxCode)
        axios({
            url: "https://localhost:44338/api/Signature/PostContract",
            method: "POST",
            data: {
                aInfo: this.state.company.taxCode,
                bInfo: this.state.customers[0].taxCode
            }
        })
            .then((response) => {


            })
            .then((data) => {

            })
            .catch(error => {
                console.log(error)


            });
            if(this.props.contract.fileUrl === null){
                axios({
                    url: '/api/v1/Contract/export-docx/' + this.props.contract.id,
                    method: "GET",
                    headers: {
                        Authorization: 'Bearer ' + this.props.token,
                        'Content-Type': 'application/json',
                        'Accept': 'application/docx'
                    },
                    responseType: 'arraybuffer',
        
                })
                    .then((response) => {
                        console.log(response)
                        var fileDownload = require('js-file-download');
                        fileDownload(response.data, this.props.contract.id + '.docx');
                        return response.data;
                    })
                    .then((data) => {
                        console.log(data.data)
        
                    })
                    .catch(error => {
                        console.log(error)
        
        
                    });
            }else{
                window.open(this.props.contract.fileUrl,"_blank")
                // axios({
                //     url: this.props.contract.fileUrl,
                //     method: "GET",
                //     headers: {
                //         Authorization: 'Bearer ' + this.props.token,
                //         'Content-Type': 'application/json',
                //         'Accept': 'application/docx'
                //     },
                //     responseType: 'arraybuffer',
        
                // })
                //     .then((response) => {
                      
                //         return response.data;
                //     })
                //     .then((data) => {
                //         console.log(data.data)
        
                //     })
                //     .catch(error => {
                //         console.log(error)
        
        
                //     });
            }
        


    };
    onFinishComment = () => {



    };
    onFinishCommenFailt = () => {



    };
    ShowCustomer = () => {
        this.setState({
            showContent: "customer"
        })
    };
    ShowContent = () => {
        this.setState({
            showContent: "content"
        })
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    render() {
        
         
        console.log(this.state.customers)
        const bside = this.state.customers.map(customer => (
            <Descriptions title="" size="small" column={2} title="Thông tin bên B"

            >

                <Descriptions.Item label={(<><b>{"Công ty/Tổ chức"}</b></>)}>
                    {customer.name}
                </Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Địa chỉ"}</b></>)}>{customer.address}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Điện thoại"}</b></>)}>{customer.phoneNumber}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Địa chỉ Email"}</b></>)}>{customer.email}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Giấy phép kinh doanh"}</b></>)}>{customer.businessLicense}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Mã số thuế"}</b></>)}>{customer.taxCode}
                
                </Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Tài khoản số"}</b></>)}>{customer.bankAccount}</Descriptions.Item>
                {/* <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item> */}
                <Descriptions.Item label={(<><b>{"Do ông(bà):"}</b></>)} span={2}>{customer.name}</Descriptions.Item>

                <Descriptions.Item label={(<><b>{"Chức vụ"}</b></>)} span={2}>
                    làm đại diện
                        </Descriptions.Item>


            </Descriptions>
        ))
        const aside = this.state.customers.map(customer => (
            <Descriptions title="" size="small" column={2} title="Thông tin bên A"

            >

                <Descriptions.Item label={(<><b>{"Công ty/Tổ chức"}</b></>)}>
                    {customer.name}
                </Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Địa chỉ"}</b></>)}>{customer.address}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Điện thoại"}</b></>)}>{customer.phoneNumber}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Địa chỉ Email"}</b></>)}>{customer.email}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Giấy phép kinh doanh"}</b></>)}>{customer.businessLicense}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Mã số thuế"}</b></>)}>{customer.taxCode}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Tài khoản số"}</b></>)}>{customer.bankAccount}</Descriptions.Item>
                {/* <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item> */}
                <Descriptions.Item label={(<><b>{"Do ông(bà):"}</b></>)} span={2}>{customer.name}</Descriptions.Item>

                <Descriptions.Item label={(<><b>{"Chức vụ"}</b></>)} span={2}>
                    làm đại diện
                        </Descriptions.Item>


            </Descriptions>
        ))
        const config = {
            readonly: true, // all options from https://xdsoft.net/jodit/doc/
            toolbar: false
        }
        const { comments, submitting, value } = this.state;
        const Editor = ({ onChange, onSubmit, submitting, value }) => (
            <Form

                name="basic"
                className="lcontract-form"

                onFinish={this.onFinishComment}
                onFinishFailed={this.onFinishCommentFailed}

            >
                <Form.Item>
                    <TextArea rows={4} onChange={onChange} value={value} />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                        Yêu cầu sửa
                </Button>
                </Form.Item>
            </Form>
        );


        if (this.state.openExtension) {
            return (
                <Router>
                    <Redirect push to={"/capstone/viewContract/" + this.props.contract.id + "/viewExtension"} />
                    <Route exact path="/capstone/viewContract/:id/viewExtension" render={() => <ContractExtensionTable contractId={this.props.contract.id} role={this.props.role} />
                    } /></Router>
            );
        } else {
            if (this.state.finish) {
                return (
                    <Router>
                        <Redirect push to={"/capstone/" + this.state.showComponent} />
                        <Route exact path="/capstone/contract" render={() => <ContractTable role={this.props.role} />
                        } /></Router>
                );
            } else {
                return (

                    <div style={{ height: "100vh", fontSize: 14 }}>
                        <Button type="primary" value="cancel" onClick={this.Cancel}>
                            Trở về
                            </Button>

                        <Space direction="vertical" align="center" >

                            <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                                <Card bordered={false} >
                                    <h6 style={{ textAlign: 'center', fontSize: 14 }}>Cộng hòa xã hội chủ nghĩa Việt Nam</h6>
                                    <h6 style={{ textAlign: 'center', fontSize: 14 }}>Độc lập-tự do-hạnh phúc</h6>
                                    <br />
                                    <h2 style={{ textAlign: 'center', fontSize: 16, fontWeight: "bold" }}>{this.props.contract.contractName}</h2>
                                    <h6 style={{ textAlign: 'center', fontSize: 14 }}>Số {this.props.contract.contractNum}</h6>
                                    <h6 style={{ fontSize: 14 }}>Hôm nay, ngày 3 tháng 11 năm 2020,
                                    tại {this.props.contract.contractPlace}, chúng tôi gồm
                            </h6>
                                </Card>
                                {this.state.company.id === this.state.creator ? <Card>

                                    <Descriptions size="small" column={2} title={"Thông tin bên A"}  >
                                        <Descriptions.Item label={(<><b>{"Công ty/Tổ chức"}</b></>)}>{this.state.company.name}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={(<><b>{"Địa chỉ"}</b></>)}>{this.state.company.address}</Descriptions.Item>
                                        <Descriptions.Item label={(<><b>{"Điện thoại"}</b></>)}>{this.state.company.phoneNumber}</Descriptions.Item>
                                        <Descriptions.Item label={(<><b>{"Địa chỉ Email"}</b></>)}>{this.state.company.email}</Descriptions.Item>
                                        <Descriptions.Item label={(<><b>{"Giấy phép kinh doanh"}</b></>)}>{this.state.company.businessLicense}</Descriptions.Item>
                                        <Descriptions.Item label={(<><b>{"Mã số thuế"}</b></>)}>{this.state.company.taxCode}</Descriptions.Item>
                                        <Descriptions.Item label={(<><b>{"Tài khoản số"}</b></>)}>{this.state.company.bankAccount}</Descriptions.Item>
                                        {/* <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item> */}
                                        <Descriptions.Item label={(<><b>{"Do ông(bà)"}</b></>)} span={2}>{this.state.company.name}</Descriptions.Item>

                                        <Descriptions.Item label={(<><b>{"Chức vụ"}</b></>)} span={2}>
                                            Giám đốc làm đại diện
                        </Descriptions.Item>


                                    </Descriptions>
                                    {bside}


                                </Card> :
                                    <Card>
                                        {aside}
                                        <Descriptions size="small" column={2} title={"Thông tin bên B"}  >
                                            <Descriptions.Item label={(<><b>{"Công ty/Tổ chức"}</b></>)}>{this.state.company.name}
                                            </Descriptions.Item>
                                            <Descriptions.Item label={(<><b>{"Địa chỉ"}</b></>)}>{this.state.company.address}</Descriptions.Item>
                                            <Descriptions.Item label={(<><b>{"Điện thoại"}</b></>)}>{this.state.company.phoneNumber}</Descriptions.Item>
                                            <Descriptions.Item label={(<><b>{"Địa chỉ Email"}</b></>)}>{this.state.company.email}</Descriptions.Item>
                                            <Descriptions.Item label={(<><b>{"Giấy phép kinh doanh"}</b></>)}>{this.state.company.businessLicense}</Descriptions.Item>
                                            <Descriptions.Item label={(<><b>{"Mã số thuế"}</b></>)}>{this.state.company.taxCode}</Descriptions.Item>
                                            <Descriptions.Item label={(<><b>{"Tài khoản số"}</b></>)}>{this.state.company.bankAccount}</Descriptions.Item>
                                            {/* <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item> */}
                                            <Descriptions.Item label={(<><b>{"Do ông(bà)"}</b></>)} span={2}>{this.state.company.name}</Descriptions.Item>

                                            <Descriptions.Item label={(<><b>{"Chức vụ"}</b></>)} span={2}>
                                                Giám đốc làm đại diện
                    </Descriptions.Item>


                                        </Descriptions>



                                    </Card>
                                }

                            </Space>
                            <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                                Giá trị hợp đồng:{this.props.contract.contractValue}
                                <JoditEditor

                                    value={this.props.contract.contractContent}
                                    config={config}
                                    tabIndex={1} // tabIndex of textarea


                                />
                            </Space>
                            <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                                <Card>

                                    <Form

                                        name="basic"
                                        className="lcontract-form"

                                        onFinish={this.onFinish}
                                        onFinishFailed={this.onFinishFailed}

                                    >
                                        <h6 style={{ fontSize: 14 }}>Hợp đồng có hiệu lực kể từ ngày 3 tháng 11 năm 2020 đến
                                             {this.props.contract.contractExpiredDate}
                                        </h6>
                                        <Space size="large">
                                            {comments.length > 0 && <CommentList comments={comments} />}

                                            {this.props.role === true ? <Button type="primary" value="Sign" onClick={this.onFinish}>{/*Nút này xuất hiện khi chưa ai kí hợp đồng nhưng chỉ có director mới thấy*/}
                                                        Tải về
                                                    </Button> : null}
                                            {this.props.contract.status == "pending" && this.props.role === true ? <Comment
                                                avatar={
                                                    <Avatar
                                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                                        alt="Han Solo"
                                                    />
                                                }
                                                content={
                                                    <Editor
                                                        onChange={this.handleChange}
                                                        onSubmit={this.handleSubmit}
                                                        submitting={submitting}
                                                        value={value}
                                                    />
                                                }
                                            /> : null}


                                            {this.props.role === true ? <Button type="primary" value="reject">{/*nút này xuất hiện khi 2 bên đã kí hợp đồng này*/}
                                                            Reject
                                                        </Button> : null}
                                        </Space>
                                    </Form>

                                </Card>
                            </Space>
                        </Space>
                    </div>

                );
            }
        }




    }
}

export default ContractView