import React from 'react';
import { createContract, contractInformation, } from '../actions/ContractAction'
import { Select, DatePicker, Descriptions, Space, Button, InputNumber, Form, PageHeader, Input, Row, Col } from 'antd';
import { connect } from 'react-redux'
import ContractTable from './ContractTable'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import {
    FileExcelOutlined, IdcardOutlined, BankOutlined, PhoneOutlined, PrinterOutlined, HomeOutlined, MailOutlined
    , ContactsOutlined, CalendarOutlined, DollarOutlined, CloudDownloadOutlined, CloudUploadOutlined, AuditOutlined
} from '@ant-design/icons';
const { Option } = Select;
const { RangePicker } = DatePicker;




class CreateContract extends React.Component {
    constructor() {
        super();

        this.state = {
            TheChooseOne: {
                Name: "",
                MST: "",
                Address: "",
                Email: "",
                Owner: "",
            },
            finish: false,
            showContent: "customer"
        };
        this.handleChange = this.handleChange.bind(this);

    }
    onFinish = (values) => {
        this.setState({
            finish: true
        })


        const contract = {

            contract_name: 'Hop dong lao dong',
            status: "pending",
            ben_tao_hd: 'HiSign',
            ben_tham_gia: 'cty 369',
            nguoi_tao_hd: "Nguyen Ngoc Phu",
            deadline: "12/12/2022",

        }
        this.props.onSubmit(contract)

    };
    Cancel = () => {
        this.setState({
            finish: true
        })




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
    handleChange(value) {
        this.setState({
            TheChooseOne: {
                Name: "Company name here",
                MST: "Tax code here",
                Address: "address here",
                Email: "email here",
                Owner: "owner here",
            },
        })
    }
    log = (type) => console.log.bind(console, type);
    onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    onOk(value) {
        console.log('onOk: ', value);
    }
    render() {

        if (this.state.finish) {
            return (
                <Router>
                    <Redirect push to={"/capstone/contract" } />
                    <Route exact path="/capstone/contract" render={() =>  <ContractTable role={this.props.role} />
                    } /></Router>
            );
        } else {


            return (

                <div style={{ border: "solid",height: "100vh" }}>
                     <Button type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>

                    <h2 style={{ textAlign: 'center' }}>Hợp đồng <Input></Input></h2>
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
                                subTitle={[<Select defaultValue="NO" onChange={this.handleChange}>
                                    <Option value="NO">Please select your customer</Option>
                                    <Option value="PR001">Usada construction</Option>
                                    <Option value="PR002">Anukin corp</Option>
                                    <Option value="PR003">The circus</Option>
                                </Select>]}
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
                                            <Descriptions.Item label="thời hạn hợp đồng"> <RangePicker
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

                                        <Space size="large">
                                            <Button type="primary" value="submit" htmlType="submit">
                                                Nộp
                  </Button>
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
var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (contract) => {
            dispatch(createContract(contract))
        }
    }
}
export default connect(null, mapDispatchToProps)(CreateContract);