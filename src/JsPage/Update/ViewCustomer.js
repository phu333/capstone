import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../index.css';
import axios from 'axios'
import { Form, Input, Button, message, Card, Space,Popover,Row,Col } from 'antd';
import {
    QuestionCircleOutlined, BankOutlined, HomeOutlined, MailOutlined
    , CloudUploadOutlined, RedoOutlined
} from '@ant-design/icons';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateCustomer } from '../../actions/CustomerAction';
import CustomerTable from '../Table/CustomerTable'
const { TextArea } = Input;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 10,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 10,
    },
};
const ValidationCompany = (

    <p>Tên công ty khách hàng sẽ được in trên hợp đồng</p>

);
const ValidationAdd = (

    <p>Số địa chỉ công ty khách hàng sẽ được in trên hợp đồng</p>

);const ValidationPresentor = (

    <p>Người đại diện cho công ty khách</p>

);const ValidationCertificate = (

    <p>Mã giấy phép kinh doanh do nhà nước cấp</p>

);const ValidationEmail = (

    <p>Địa chỉ email của khách </p>

);const ValidationTax = (

    <p>Mã số thuế của công ty khách hàng </p>

);const ValidationRole = (

    <p>Chức vụ trong của người đại diện công ty khách</p>

);const ValidationPhone = (

    <p>Số điện thoại công ty khách trong khoảng 10 ký tự</p>

);const ValidationBank = (

    <p>8 số cuối của mã số ngân hàng trên thẻ của công ty khách</p>

);

class ViewCustomer extends React.Component {
    constructor() {
        super();

        this.state = {
            isEdit: false
        };

        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {
        axios({
            url: '/api/v1/Customer/' + this.props.customer.id,
            method: "PUT",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            },
            data: values
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
    onEdit = (values) => {
        this.setState({
            isEdit: true
        })




    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    Cancel = () => {
        this.setState({
            finish: true
        })
    }
    render() {
        console.log(this.props.customer)
        var ButtonFix = this.props.myLoginReducer.map((login, index) => {
            return (
                <div> {
                    login.UpdateCustomer === true ? <div>
                        {this.state.isEdit === false ? <Button type="primary" onClick={this.onEdit} className="login-form-button">
                            Sửa
            </Button> : null}</div>
                        : null
                }</div>)
        })
        if (this.state.finish) {
            return (<Router>
                <Redirect push to={"/capstone/customerList"} />
                <Route exact path="/capstone/customerList" render={() => <CustomerTable token={this.props.token} role={this.props.role} />
                } />
            </Router>);
        }
        else {
            return (
                <Card>
                    <br />
                    <Button style={{ width: '80px' }} type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>
                    <h2 style={{ textAlign: 'center' }}>Thông tin khách hàng</h2>

                    <Form
                        {...layout}
                        name="basic"
                        className="employee-form"
                        hideRequiredMark
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}

                    >

                        <Form.Item
                            label="Tên doanh nghiệp"
                            name="name"

                        >
                            {this.state.isEdit === false ?
                                <Row gutter={8}> <Col span={20}><TextArea autoSize disabled defaultValue={this.props.customer.name} /> </Col>    <Popover content={ValidationCompany} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row> :
                            <Row gutter={8}> <Col span={20}><TextArea autoSize defaultValue={this.props.customer.name} /> </Col>    <Popover content={ValidationCompany} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>}
                        </Form.Item>
                        <Form.Item
                            label="Mã số thuế"
                            name="taxCode"

                        >
                            {this.state.isEdit === false ?
                                <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.props.customer.taxCode} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row> :
                                <Row gutter={8}> <Col span={20}><Input defaultValue={this.props.customer.taxCode} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>}
                        </Form.Item>

                        <Form.Item
                            label="Giấy phép kinh doanh"
                            name="businessLicense"

                        >
                            {this.state.isEdit === false ?
                                <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.props.customer.businessLicense} /> </Col>    <Popover content={ValidationCompany} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>:
                                <Row gutter={8}> <Col span={20}><Input defaultValue={this.props.customer.businessLicense} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>}
                        </Form.Item>
                        <Form.Item
                            label="Điện thoại"
                            name="phoneNumber"

                        >
                            {this.state.isEdit === false ?
                                <Row gutter={8}> <Col span={20}><Input disabled defaultValue={this.props.customer.phoneNumber} /> </Col>    <Popover content={ValidationCompany} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>:
                                <Row gutter={8}> <Col span={20}><Input defaultValue={this.props.customer.phoneNumber} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>}
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"

                        >
                            {this.state.isEdit === false ?
                               <Row gutter={8}> <Col span={20}> <Input disabled defaultValue={this.props.customer.address} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                               <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                           </Popover></Row> :
                              <Row gutter={8}> <Col span={20}> <Input defaultValue={this.props.customer.address} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                              <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                          </Popover></Row>}
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"

                        >
                            {this.state.isEdit === false ?
                               <Row gutter={8}> <Col span={20}> <Input disabled defaultValue={this.props.customer.email} /> </Col>    <Popover content={ValidationCompany} trigger="hover">
                               <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                           </Popover></Row>:
                                <Row gutter={8}> <Col span={20}><Input defaultValue={this.props.customer.email} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>}
                        </Form.Item>
                        <Form.Item
                            label="Số tài khoản"
                            name="bankAccount"

                        >
                            {this.state.isEdit === false ?
                               <Row gutter={8}> <Col span={20}> <Input disabled defaultValue={this.props.customer.bankAccount} /> </Col>    <Popover content={ValidationCompany} trigger="hover">
                               <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                           </Popover></Row>:
                                <Row gutter={8}> <Col span={20}><Input defaultValue={this.props.customer.bankAccount} /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                            </Popover></Row>}
                        </Form.Item>
                        <Form.Item
                            label="Người đại diện"
                            name="role"

                        >
                            {this.state.isEdit === false ?
                               <Row gutter={8}> <Col span={20}><Input disabled defaultValue="Nguyen Van B" /></Col>    <Popover content={ValidationCompany} trigger="hover">
                               <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                           </Popover></Row> :
                              <Row gutter={8}> <Col span={20}>  <Input defaultValue="Nguyen Van B" /></Col>    <Popover content={ValidationCompany} trigger="hover">
                              <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                          </Popover></Row>}
                        </Form.Item>
                        {/* <Form.Item
                        label="Chức vụ"
                        name="role"
                        
                    >
                        {this.state.isEdit === false ?
                            <Input disabled defaultValue="Giám đốc" /> :
                            <Input defaultValue="Giám đốc" />}
                    </Form.Item> */}




                        <Form.Item {...tailLayout}>
                            <Space size="large">
                                {this.state.isEdit === true ? <Button type="primary" htmlType="submit" className="login-form-button">
                                    Sửa
                            </Button> : null}
                                {this.state.isEdit === true ? <Button type="primary" htmlType="reset" className="login-form-button">
                                    Xóa dữ liệu đã nhập                                </Button> : null}
                                {ButtonFix}



                            </Space>
                        </Form.Item>
                        <Form.Item>

                        </Form.Item>




                    </Form>




                </Card >
            );
        }

    }
}
var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (token) => {
            dispatch(updateCustomer(token))
        }
    }
}
var mapStateToProps = state => {

    console.log(state.myLoginReducer)
    return {
        myLoginReducer: state.myLoginReducer
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewCustomer);