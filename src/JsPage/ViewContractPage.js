import React from 'react';
import ReactDOM from 'react-dom';
import {
    FileExcelOutlined, IdcardOutlined, BankOutlined, PhoneOutlined, PrinterOutlined, HomeOutlined, MailOutlined
    , ContactsOutlined, CalendarOutlined, DollarOutlined, CloudDownloadOutlined, CloudUploadOutlined, AuditOutlined
} from '@ant-design/icons';
import ContractExtensionTable from './ContractExtensionTable'
import { Descriptions, InputNumber, Space, Button, DatePicker, Input, PageHeader, Form, Row, Col, Comment, List, Avatar } from 'antd';
import ContractTable from './ContractTable'
import moment from 'moment'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
const { RangePicker } = DatePicker;

const { TextArea } = Input;

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
            openExtension: false,
            openCommentSection: false,
            finish: false,
            showContent: "customer",
            comments: [],
            submitting: false,
            value: '',
        };

        this.OpenExtension = this.OpenExtension.bind(this)
        this.OpenCommentSection = this.OpenCommentSection.bind(this)
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
                    <Redirect push to={"/capstone/viewContract/"+ this.props.contract.id+"/viewExtension"} />
                    <Route exact path="/capstone/viewContract/:id/viewExtension" render={() =>   <ContractExtensionTable contractId={this.props.contract.id} role={this.props.role} />
                    } /></Router>
               );
            } else {
                if (this.state.finish) {
                    return (<ContractTable role={this.props.role} />);
                } else {
                    return (

                        <div style={{ height: "100vh" }}>
                            <Button type="primary" value="cancel" onClick={this.Cancel}>
                                Trở về
                            </Button>
                            <h2 style={{ textAlign: 'center' }}>Hợp đồng </h2>
                            <Row>
                                <Col span={3} order={1} />
                                <Col span={20} order={2}>
                                    <PageHeader
                                        className="site-page-header"
                                        ghost={false}
                                        title="Thông tin bên A">
                                        <Descriptions size="small" column={2} >
                                            <Descriptions.Item label={(<b><IdcardOutlined />{"Tên doanh nghiệp:"}</b>)}>HiSign</Descriptions.Item>
                                            <Descriptions.Item label={(<b><BankOutlined />{"Mã số thuế:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><PhoneOutlined />{"Điện thoại:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><HomeOutlined />{"Địa chỉ:"}</b>)}>asdasdasd</Descriptions.Item>
                                            <Descriptions.Item label={(<b><MailOutlined />{"Địa chỉ Email:"}</b>)}>sfds@gmail.com</Descriptions.Item>
                                            <Descriptions.Item label={(<b><ContactsOutlined />{"Người đại diện:"}</b>)} span={2}>
                                                Usada Pekora
                                            </Descriptions.Item>


                                        </Descriptions>
                                    </PageHeader>


                                    <PageHeader
                                        className="site-page-header"
                                        ghost={false}
                                        title="Thông tin bên B"
                                        subTitle={[]}
                                        extra={[<Button type="primary" onClick={this.ShowCustomer}>Thông tin bên B</Button>,
                                        <Button type="primary" onClick={this.ShowContent}>Thông tin hợp đồng</Button>
                                        ]}
                                    >
                                        {this.state.showContent === "customer" ?
                                            <Descriptions title="" size="small" column={2}  >

                                                <Descriptions.Item label={(<b><IdcardOutlined />{"Tên doanh nghiệp:"}</b>)}>HiSign</Descriptions.Item>
                                                <Descriptions.Item label={(<b><BankOutlined />{"Mã số thuế:"}</b>)}>123123123123</Descriptions.Item>
                                                <Descriptions.Item label={(<b><PhoneOutlined />{"Điện thoại:"}</b>)}>123123123123</Descriptions.Item>
                                                <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item>
                                                <Descriptions.Item label={(<b><HomeOutlined />{"Địa chỉ:"}</b>)}>asdasdasd</Descriptions.Item>
                                                <Descriptions.Item label={(<b><MailOutlined />{"Địa chỉ Email:"}</b>)}>sfds@gmail.com</Descriptions.Item>
                                                <Descriptions.Item label={(<b><ContactsOutlined />{"Người đại diện:"}</b>)} span={2}>
                                                    Usada Pekora
                                                </Descriptions.Item>


                                            </Descriptions> : null}
                                        {this.state.showContent === "content" ?
                                            <Form

                                                name="basic"
                                                className="lcontract-form"

                                                onFinish={this.onFinish}
                                                onFinishFailed={this.onFinishFailed}

                                            >
                                                <Descriptions title="Nội dung hợp đồng" size="small" column={1}   >
                                                    <Descriptions.Item label="Contract duration"> <RangePicker
                                                        showTime={{ format: 'HH:mm' }}
                                                        format="YYYY-MM-DD HH:mm"
                                                        onChange={this.onChange}
                                                        onOk={this.onOk}
                                                    /></Descriptions.Item>
                                                    <Descriptions.Item label="Giá trị:">
                                                        <Form.Item

                                                            name="value"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Vui lòng nhập Giá trị:',
                                                                },
                                                            ]}
                                                        >
                                                            <InputNumber
                                                                defaultValue={1000}
                                                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}

                                                            />
                                                        </Form.Item>

                                                    </Descriptions.Item>
                                                    <a>Dieu khoan 1:</a><br />
                                                    <a>Dieu khoan 2:</a><br />
                                                    <a>Dieu khoan 3:</a><br />
                                                    <a>Dieu khoan 4:</a><br />

                                                </Descriptions>
                                                {comments.length > 0 && <CommentList comments={comments} />}





                                                <Space size="large">

                                                    {this.props.contract.status == "pending" ? <Button type="primary" value="Sign" onClick={this.onFinish}>{/*Nút này xuất hiện khi chưa ai kí hợp đồng nhưng chỉ có director mới thấy*/}
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
                                                    {this.props.contract.status == "pending" ? <Button type="primary" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            Sửa
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
                                            </Form> : null}
                                    </PageHeader>
                                </Col>
                            </Row>


                        </div>

                    );
                }
            }

        } else {



            if (this.state.openExtension) {
                return (<ContractExtensionTable role={this.props.role} />);
            } else {
                if (this.state.finish) {
                    return (<ContractTable role={this.props.role} />);
                } else {
                    return (
                        <div style={{ height: "100vh" }}>
                            <Button type="primary" value="cancel" onClick={this.Cancel}>
                                Trở về
              </Button>
                            <h2 style={{ textAlign: 'center' }}>Hợp đồng </h2>
                            <Row>
                                <Col span={3} order={1} />
                                <Col span={20} order={2}>
                                    <PageHeader
                                        className="site-page-header"
                                        ghost={false}
                                        title="Thông tin bên A">
                                        <Descriptions size="small" column={2} >
                                            <Descriptions.Item label={(<b><IdcardOutlined />{"Tên doanh nghiệp:"}</b>)}>HiSign</Descriptions.Item>
                                            <Descriptions.Item label={(<b><BankOutlined />{"Mã số thuế:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><PhoneOutlined />{"Điện thoại:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item>
                                            <Descriptions.Item label={(<b><HomeOutlined />{"Địa chỉ:"}</b>)}>asdasdasd</Descriptions.Item>
                                            <Descriptions.Item label={(<b><MailOutlined />{"Địa chỉ Email:"}</b>)}>sfds@gmail.com</Descriptions.Item>
                                            <Descriptions.Item label={(<b><ContactsOutlined />{"Người đại diện:"}</b>)} span={2}>
                                                Usada Pekora
                        </Descriptions.Item>


                                        </Descriptions>
                                    </PageHeader>


                                    <PageHeader
                                        className="site-page-header"
                                        ghost={false}
                                        title="Thông tin bên B"
                                        subTitle={[]}
                                        extra={[<Button type="primary" onClick={this.ShowCustomer}>Thông tin bên B</Button>,
                                        <Button type="primary" onClick={this.ShowContent}>Thông tin hợp đồng</Button>
                                        ]}
                                    >
                                        {this.state.showContent === "customer" ?
                                            <Descriptions title="" size="small" column={2}  >

                                                <Descriptions.Item label={(<b><IdcardOutlined />{"Tên doanh nghiệp:"}</b>)}>HiSign</Descriptions.Item>
                                                <Descriptions.Item label={(<b><BankOutlined />{"Mã số thuế:"}</b>)}>123123123123</Descriptions.Item>
                                                <Descriptions.Item label={(<b><PhoneOutlined />{"Điện thoại:"}</b>)}>123123123123</Descriptions.Item>
                                                <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item>
                                                <Descriptions.Item label={(<b><HomeOutlined />{"Địa chỉ:"}</b>)}>asdasdasd</Descriptions.Item>
                                                <Descriptions.Item label={(<b><MailOutlined />{"Địa chỉ Email:"}</b>)}>sfds@gmail.com</Descriptions.Item>
                                                <Descriptions.Item label={(<b><ContactsOutlined />{"Người đại diện:"}</b>)} span={2}>
                                                    Usada Pekora
                        </Descriptions.Item>


                                            </Descriptions> : null}
                                        {this.state.showContent === "content" ?
                                            <Form
                                                name="basic"
                                                className="lcontract-form"

                                                onFinish={this.onFinish}
                                                onFinishFailed={this.onFinishFailed}

                                            >
                                                <Descriptions title="Nội dung hợp đồng" size="small" column={1}   >
                                                    <Descriptions.Item label="Contract duration"> <RangePicker
                                                        showTime={{ format: 'HH:mm' }}
                                                        format="YYYY-MM-DD HH:mm"
                                                        onChange={this.onChange}
                                                        onOk={this.onOk}
                                                    /></Descriptions.Item>
                                                    <a>Dieu khoan 1:</a><br />
                                                    <a>Dieu khoan 2:</a><br />
                                                    <a>Dieu khoan 3:</a><br />
                                                    <a>Dieu khoan 4:</a><br />
                                                    <Descriptions.Item label="Giá trị:">
                                                        <Form.Item

                                                            name="value"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Vui lòng nhập Giá trị:',
                                                                },
                                                            ]}
                                                        >
                                                            <InputNumber
                                                                defaultValue={1000}
                                                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}

                                                            />
                                                        </Form.Item>

                                                    </Descriptions.Item>
                                                </Descriptions>

                                                <Space size="large">


                                                    {this.props.contract.status == "pending" ? <Button type="primary" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                Sửa
              </Button> : null}
                                                    {this.props.contract.status == "active" ? <Button type="primary" onClick={this.OpenExtension} value="ViewExtension">{/*nút này xuất hiện khi 2 bên đã kí hợp đồng này*/}
                                Xem phụ lục
              </Button> : null}
                                                    {this.props.contract.status == "deactive" ? <Button type="primary" onClick={this.OpenExtension} value="ViewExtension">{/*nút này xuất hiện khi 2 bên đã kí hợp đồng này*/}
                                Xem phụ lục
              </Button> : null}
                                                </Space>
                                            </Form> : null}
                                    </PageHeader>
                                </Col>
                            </Row>


                        </div>

                    );
                }
            }
        }
    }
}
export default ContractView