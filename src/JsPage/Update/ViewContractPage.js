import React from 'react';
import ReactDOM from 'react-dom';
import {
    FileExcelOutlined, IdcardOutlined, BankOutlined, PhoneOutlined, PrinterOutlined, HomeOutlined, MailOutlined
    , ContactsOutlined, CalendarOutlined, DollarOutlined, DeleteOutlined, CloudUploadOutlined, AuditOutlined
} from '@ant-design/icons';
import ContractExtensionTable from '../Table/ContractExtensionTable'
import { Descriptions, InputNumber, Space, Button, DatePicker, Input, Card, Form, Select, Table, Comment, List, Avatar, Pagination } from 'antd';
import ContractTable from '../Table/ContractTable'
import moment from 'moment'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
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

        this.state = {
            editorState: EditorState.createEmpty(),
            openExtension: false,
            openCommentSection: false,
            finish: false,
            showContent: "customer",
            comments: [],
            submitting: false,
            value: '',
            currentPage: 1,
            products: [
                {
                    key: 1,
                    product_name: "abc",
                    unit: 1,
                    quantitve: 2,
                    price: 1000,
                },
                {
                    key: 2,
                    product_name: "abc",
                    unit: 1,
                    quantitve: 2,
                    price: 1000,
                }
            ],
            isEdit: false,
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
        this.setState({
            finish: true
        })


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
        if (this.props.role === true) {

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
                                    <Card>
                                        <h6 style={{ textAlign: 'center', fontSize: 14 }}>Cộng hòa xã hội chủ nghĩa Việt Nam</h6>
                                        <h6 style={{ textAlign: 'center', fontSize: 14 }}>Độc lập-tự do-hạnh phúc</h6>
                                        <br />
                                        <br />
                                        <h2 style={{ textAlign: 'center', fontSize: 16, fontWeight: "bold" }}>Hợp đồng </h2>
                                    </Card>
                                    <Card>
                                        <Descriptions size="small" column={2} title={"Thông tin bên A"}  >
                                            <Descriptions.Item label={(<b><IdcardOutlined />{"Công ty/Tổ chức:"}</b>)}>HiSign</Descriptions.Item>
                                            <Descriptions.Item label={(<b><HomeOutlined />{"Địa chỉ:"}</b>)}>asdasdasd</Descriptions.Item>
                                            <Descriptions.Item label={(<b><PhoneOutlined />{"Điện thoại:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><MailOutlined />{"Địa chỉ Email:"}</b>)}>sfds@gmail.com</Descriptions.Item>
                                            <Descriptions.Item label={(<b><BankOutlined />{"Giấy phép kinh doanh:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><BankOutlined />{"Mã số thuế:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><BankOutlined />{"Tài khoản số:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><ContactsOutlined />{"Do ông(bà):"}</b>)} span={2}>Usada Pekora</Descriptions.Item>
                                            <Descriptions.Item label={(<b><ContactsOutlined />{"Năm sinh:"}</b>)} span={2}>
                                                1998
                        </Descriptions.Item>
                                            <Descriptions.Item label={(<b><ContactsOutlined />{"Chức vụ"}</b>)} span={2}>
                                                Giám đốc
                        </Descriptions.Item>
                                            <Descriptions.Item label={(<h><ContactsOutlined />{"làm đại diện"}</h>)} span={2}>

                                            </Descriptions.Item>

                                        </Descriptions>


                                        <Descriptions title="" size="small" column={2} title="Thông tin bên B"

                                        >

                                            <Descriptions.Item label={(<b><IdcardOutlined />{"Công ty/Tổ chức:"}</b>)}>HiSign</Descriptions.Item>
                                            <Descriptions.Item label={(<b><HomeOutlined />{"Địa chỉ:"}</b>)}>asdasdasd</Descriptions.Item>
                                            <Descriptions.Item label={(<b><PhoneOutlined />{"Điện thoại:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><MailOutlined />{"Địa chỉ Email:"}</b>)}>sfds@gmail.com</Descriptions.Item>
                                            <Descriptions.Item label={(<b><BankOutlined />{"Giấy phép kinh doanh:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><BankOutlined />{"Mã số thuế:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><BankOutlined />{"Tài khoản số:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><ContactsOutlined />{"Do ông(bà):"}</b>)} span={2}>Usada Pekora</Descriptions.Item>
                                            <Descriptions.Item label={(<b><ContactsOutlined />{"Năm sinh:"}</b>)} span={2}>
                                                1998
                        </Descriptions.Item>
                                            <Descriptions.Item label={(<b><ContactsOutlined />{"Chức vụ"}</b>)} span={2}>
                                                Giám đốc
                        </Descriptions.Item>
                                            <Descriptions.Item label={(<h><ContactsOutlined />{"làm đại diện"}</h>)} span={2}>

                                            </Descriptions.Item>

                                        </Descriptions>
                                    </Card>
                                </Space>
                                <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >

                                    <Editor
                                        editorState={this.state.editorState}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={this.onEditorStateChange}
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

                                            <Space size="large">
                                                {comments.length > 0 && <CommentList comments={comments} />}
                                                {this.props.contract.status == "pending" && this.state.isEdit === false ? <Button type="primary" value="Sign" onClick={this.onFinish}>{/*Nút này xuất hiện khi chưa ai kí hợp đồng nhưng chỉ có director mới thấy*/}
                                                        Kí
                                                    </Button> : this.props.contract.status == "waiting for sign" ? <Button type="primary" value="Sign" onClick={this.onFinish}>{/*Nút này xuất hiện khi chưa ai kí hợp đồng nhưng chỉ có director mới thấy*/}
                                                        Kí
                                                    </Button> : null}
                                                {this.props.contract.status == "pending" ? <Comment
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
                                                {this.props.contract.status == "pending" && this.state.isEdit === false ? <Button type="primary" onClick={this.onEdit} value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            Sửa
                                                    </Button> : null}
                                                {this.props.contract.status == "pending" && this.state.isEdit === true ? <Button type="primary" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            nộp
                                                    </Button> : null}
                                                {this.props.contract.status == "active" ? <Button type="primary" onClick={this.OpenExtension} value="ViewExtension">{/*nút này xuất hiện khi 2 bên đã kí hợp đồng này*/}
                                                            Xem phụ lục
                                                    </Button> : null}
                                                {this.props.contract.status == "deactive" ? <Button type="primary" onClick={this.OpenExtension} value="ViewExtension">{/*nút này xuất hiện khi 2 bên đã kí hợp đồng này*/}
                                                            Xem phụ lục
                                                        </Button> : null}
                                                {this.props.contract.status == "waiting for sign" ? <Button type="primary" value="reject">{/*nút này xuất hiện khi 2 bên đã kí hợp đồng này*/}
                                                            Reject
                                                        </Button> : null}
                                            </Space>
                                        </Form>
                                        <Pagination onChange={this.onPageChange} defaultCurrent={this.state.currentPage} total={50} />
                                    </Card>
                                </Space>
                            </Space>
                        </div>

                    );
                }
            }

        } else {



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
                        <div style={{ height: "100vh" }}>
                            <Button type="primary" value="cancel" onClick={this.Cancel}>
                                Trở về
              </Button>
                            <h2 style={{ textAlign: 'center' }}>Hợp đồng </h2>
                            <Space direction="vertical" align="start" >
                                <Space direction="vertical" align="start" style={{ backgroundColor: "white" }} >
                                    <Card>
                                        <Descriptions size="small" column={2} title={"Thông tin bên A"}  >
                                            <Descriptions.Item label={(<b><IdcardOutlined />{"Công ty/Tổ chức:"}</b>)}>HiSign</Descriptions.Item>
                                            <Descriptions.Item label={(<b><HomeOutlined />{"Địa chỉ:"}</b>)}>asdasdasd</Descriptions.Item>
                                            <Descriptions.Item label={(<b><PhoneOutlined />{"Điện thoại:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><MailOutlined />{"Địa chỉ Email:"}</b>)}>sfds@gmail.com</Descriptions.Item>
                                            <Descriptions.Item label={(<b><BankOutlined />{"Giấy phép kinh doanh:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><BankOutlined />{"Mã số thuế:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><BankOutlined />{"Tài khoản số:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><ContactsOutlined />{"Do ông(bà):"}</b>)} span={2}>Usada Pekora</Descriptions.Item>
                                            <Descriptions.Item label={(<b><ContactsOutlined />{"Năm sinh:"}</b>)} span={2}>
                                                1998
                        </Descriptions.Item>
                                            <Descriptions.Item label={(<b><ContactsOutlined />{"Chức vụ"}</b>)} span={2}>
                                                Giám đốc
                        </Descriptions.Item>
                                            <Descriptions.Item label={(<h><ContactsOutlined />{"làm đại diện"}</h>)} span={2}>

                                            </Descriptions.Item>

                                        </Descriptions>


                                        <Descriptions title="" size="small" column={2} title="Thông tin bên B"

                                        >

                                            <Descriptions.Item label={(<b><IdcardOutlined />{"Công ty/Tổ chức:"}</b>)}>HiSign</Descriptions.Item>
                                            <Descriptions.Item label={(<b><HomeOutlined />{"Địa chỉ:"}</b>)}>asdasdasd</Descriptions.Item>
                                            <Descriptions.Item label={(<b><PhoneOutlined />{"Điện thoại:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><MailOutlined />{"Địa chỉ Email:"}</b>)}>sfds@gmail.com</Descriptions.Item>
                                            <Descriptions.Item label={(<b><BankOutlined />{"Giấy phép kinh doanh:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><BankOutlined />{"Mã số thuế:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><BankOutlined />{"Tài khoản số:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><ContactsOutlined />{"Do ông(bà):"}</b>)} span={2}>Usada Pekora</Descriptions.Item>
                                            <Descriptions.Item label={(<b><ContactsOutlined />{"Năm sinh:"}</b>)} span={2}>
                                                1998
                        </Descriptions.Item>
                                            <Descriptions.Item label={(<b><ContactsOutlined />{"Chức vụ"}</b>)} span={2}>
                                                Giám đốc
                        </Descriptions.Item>
                                            <Descriptions.Item label={(<h><ContactsOutlined />{"làm đại diện"}</h>)} span={2}>

                                            </Descriptions.Item>

                                        </Descriptions>
                                    </Card>
                                </Space>
                                <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >

                                    <Editor
                                        editorState={this.state.editorState}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={this.onEditorStateChange}
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


                                            <Space size="large">
                                                {comments.length > 0 && <CommentList comments={comments} />}
                                                {this.props.contract.status == "pending" && this.state.isEdit === true ? <Button type="primary" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            nộp
                                                    </Button> : null}

                                                {this.props.contract.status == "pending" && this.state.isEdit === false ? <Button type="primary" onClick={this.onEdit} value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            Sửa
                                                    </Button> : null}
                                                {this.props.contract.status == "active" ? <Button type="primary" onClick={this.OpenExtension} value="ViewExtension">{/*nút này xuất hiện khi 2 bên đã kí hợp đồng này*/}
                                                            Xem phụ lục
                                                    </Button> : null}
                                                {this.props.contract.status == "deactive" ? <Button type="primary" onClick={this.OpenExtension} value="ViewExtension">{/*nút này xuất hiện khi 2 bên đã kí hợp đồng này*/}
                                                            Xem phụ lục
                                                        </Button> : null}

                                            </Space>
                                        </Form>
                                        <Pagination onChange={this.onPageChange} defaultCurrent={this.state.currentPage} total={50} />
                                    </Card>
                                </Space>
                            </Space>


                        </div>

                    );
                }
            }
        }
    }
}
export default ContractView