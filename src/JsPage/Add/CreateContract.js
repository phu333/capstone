import React from 'react';
import { createContract, contractInformation, } from '../../actions/ContractAction'
import { Select, DatePicker, Descriptions, Space, Button, InputNumber, Form, Table, Input, Col, Card, message } from 'antd';
import { connect } from 'react-redux'
import ContractTable from '../Table/ContractTable'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'


import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios'
import 'react-quill/dist/quill.snow.css';
import JoditEditor from "jodit-react";
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;
const options = [
    {
        value: 'Công ty tnhh Microsoft',
    },
    {
        value: 'Công ty tnvh google',
    },
    {
        value: 'Công ty cổ phần amazon',
    },
];


class CreateContract extends React.Component {
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
            BSide: {
                Name: "",
                MST: "",
                Phone: "",
                Address: "",
                Email: "",
                Representative: "",
                Position: "",
                BusinessLicensce: "",
                YoB: "",
                BankAccount: "",
            },
            ASide: {
                Name: "",
                MST: "",
                Phone: "",
                Address: "",
                Email: "",
                Representative: "",
                Position: "",
                BusinessLicensce: "",
                YoB: "",
                BankAccount: "",
            },
            contractNum: "",
            contractName: "",
            contractValue: 0,

            finish: false,
            contractTitle: "",
            contractPlace: "",
            contractExpiredDate: "",
            customers: [],
            company: {},
        };
        this.handleChange = this.handleChange.bind(this);

        this.rteChange = this.rteChange.bind(this);
    }

    rteChange = (value) => {
        console.log(value); // HTML/rich text
    }
    componentDidMount() {
        axios({
            url: '/api/v1/Company',
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            }
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                console.log(data)
                this.setState({
                    company: data.data,
                })


            })
            .catch(error => {
                console.log(error)
                if (error.response.status === 500) {
                    message.error(error.response.status + ' Server under maintainence');
                } else if (error.response.status === 404) {
                    message.error(error.response.status + ' Server not found');
                }

            });
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
                    customers: data.data,
                })


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
    onFinish = (values) => {
        const contract = {
            contractTitle: this.state.contractTitle,
            contractNum: this.state.contractNum,
            contractName: this.state.contractName,
            contractPlace: this.state.contractPlace,
            contractCreateDate: "",
            contractExpiredDate: this.state.contractExpiredDate,
            ASide: this.state.ASide,
            BSide: this.state.BSide,
            contractValue: this.state.contractValue,
            contractContent: this.state.contractContent,
        }
        axios({
            url: '',
            method: "POST",
            data: contract
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {



            })
            .catch(error => {

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




    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    handleChange(value) {
        console.log(value);
        const company=JSON.parse(value)
        this.setState({
            BSide: {
                Name: company.name,
                MST: company.taxCode,
                Phone: company.phoneNumber,
                Address: company.address,
                Email: company.email,
                Representative: company.name,
                Position: "giám đốc",
                BusinessLicensce: company.businessLicense,

                BankAccount: "123123123213",
            },
        })
    }

    render() {
        const config = {
            readonly: false // all options from https://xdsoft.net/jodit/doc/
        }

        if (this.state.finish) {
            return (
                <Router>
                    <Redirect push to={"/capstone/contract"} />
                    <Route exact path="/capstone/contract" render={() => <ContractTable role={this.props.role} />
                    } /></Router>
            );
        } else {


            return (

                <div style={{ fontSize: 14, height: "100vh" }} >
                    <Button type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>

                    <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >

                        <Space direction="vertical" align="center" style={{ backgroundColor: "white" }}  >
                            <Card bordered={false} >
                                <h6 style={{ textAlign: 'center', fontSize: 14 }}>Cộng hòa xã hội chủ nghĩa Việt Nam</h6>
                                <h6 style={{ textAlign: 'center', fontSize: 14 }}>Độc lập-tự do-hạnh phúc</h6>
                                <br />
                                <h2 style={{ textAlign: 'center', fontSize: 16, fontWeight: "bold" }}>Hợp đồng mua bán</h2>
                                <h6 style={{ textAlign: 'center', fontSize: 14 }}>Số<Input style={{ width: "30px" }} size="small" />/<Input style={{ width: "30px" }} size="small" /></h6>
                                <h6 style={{ fontSize: 14 }}>Hôm nay, ngày 3 tháng 11 năm 2020,
                                tại<Input style={{ width: "100px" }} size="small" />, chúng tôi gồm
                            </h6>
                            </Card>
                            <Card bordered={false}>
                                <Descriptions size="small" column={2} title={"Thông tin bên A"}  >
                                    <Descriptions.Item label={(<><b>{"Công ty/Tổ chức:"}</b></>)}>Công ty cổ phần HiSign
                                        </Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Địa chỉ:"}</b></>)}>asdasdasd</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Điện thoại:"}</b></>)}>123123123123</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Địa chỉ Email:"}</b></>)}>sfds@gmail.com</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Giấy phép kinh doanh:"}</b></>)}>123123123123</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Mã số thuế:"}</b></>)}>123123123123</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Tài khoản số:"}</b></>)}>123123123123</Descriptions.Item>
                                    {/* <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item> */}
                                    <Descriptions.Item label={(<><b>{"Do ông(bà):"}</b></>)} span={2}>Usada Pekora</Descriptions.Item>

                                    <Descriptions.Item label={(<><b>{"Chức vụ"}</b></>)} span={2}>
                                        Giám đốc làm đại diện
                        </Descriptions.Item>


                                </Descriptions>


                                <Descriptions title="" size="small" column={2} title="Thông tin bên B"

                                >

                                    <Descriptions.Item label={(<><b>{"Công ty/Tổ chức:"}</b></>)}>
                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
                                            placeholder="chọn khách hàng"
                                            optionFilterProp="customer"
                                            onChange={this.handleChange}
                                            onSearch={this.handleChange}
                                           
                                        >
                                           {this.state.customers.map((customer)=>(
                                               <Option value={JSON.stringify(customer)} >{customer.name}</Option>
                                           ))}
                                        </Select></Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Địa chỉ:"}</b></>)}>{this.state.BSide.Address}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Điện thoại:"}</b></>)}>{this.state.BSide.Phone}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Địa chỉ Email:"}</b></>)}>{this.state.BSide.Email}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Giấy phép kinh doanh:"}</b></>)}>{this.state.BSide.BusinessLicensce}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Mã số thuế:"}</b></>)}>{this.state.BSide.MST}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Tài khoản số:"}</b></>)}>{this.state.BSide.BankAccount}</Descriptions.Item>
                                    {/* <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item> */}
                                    <Descriptions.Item label={(<><b>{"Do ông(bà):"}</b></>)} span={2}>{this.state.BSide.Representative}</Descriptions.Item>

                                    <Descriptions.Item label={(<><b>{"Chức vụ"}</b></>)} span={2}>
                                        {this.state.BSide.Position} làm đại diện
                        </Descriptions.Item>


                                </Descriptions>
                            </Card>
                        </Space>

                        <Space direction="vertical" style={{ backgroundColor: "white" }} >
                            <InputNumber
                                prefix="Giá trị hợp đồng"
                                title="Giá trị hợp đồng"
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}

                            />
                            <h6 style={{ fontSize: 16 }}>Chúng tôi thỏa thuận với các điều khoản sau
                            </h6>
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

                                        <h6 style={{ fontSize: 14 }}>Hợp đồng có hiệu lực kể từ ngày 3 tháng 11 năm 2020 đến
                                        <DatePicker size="small" bordered={false} />
                                        </h6>
                                        <Space size="large">

                                            <Button type="primary" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
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
}
var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (contract) => {
            dispatch(createContract(contract))
        }
    }
}
export default connect(null, mapDispatchToProps)(CreateContract);