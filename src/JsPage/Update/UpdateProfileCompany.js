import {
    QuestionCircleOutlined
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Popover, Row, Space } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import '../../index.css';








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
            value: 'date'
        };
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    onFinish = (values) => {


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

    render() {
        const ValidationCompany = (

            <p>Tên công ty nên để tên dưới 250 ký tự</p>
        
        );
        const ValidationAdd = (
        
            <p>Số địa chỉ công ty</p>
        
        );const ValidationPresentor = (
        
            <p>Người đại diện cho công ty </p>
        
        );const ValidationCertificate = (
        
            <p>Mã giấy phép kinh doanh do nhà nước cấp</p>
        
        );const ValidationEmail = (
        
            <p>Địa chỉ email của google</p>
        
        );const ValidationTax = (
        
            <p>Mã số thuế của công ty nhập dưới 10 ký tự</p>
        
        );const ValidationRole = (
        
            <p>Chức vụ trong công ty có thể để trống</p>
        
        );const ValidationPhone = (
        
            <p>Số điện thoại công ty dưới 10 ký tự</p>
        
        );const ValidationBank = (
        
            <p>Mã số Ngân hàng của công ty có thể để trắng</p>
        
        );
        

        return (


            <React.Fragment>
                <h2 style={{ textAlign: 'center' }}>Thông tin doanh nghiệp</h2>
                <Space direction="horizontal" align="center"  >


                    <Card   style={{ width: 1000, minHeight: 600 }}>

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
                                name="company"
                                required
                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue="HiSign" /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                        <Button size="small" shape="circle" style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="HiSign" /></Col>    <Popover content={ValidationCompany} trigger="hover">
                                        <Button size="small" shape="circle" style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Mã số thuế"
                                name="name"
                                rules={[
                                    
                                    {
                                        
                                        message: 'Vui lòng nhập 10 ký tự',
                                        min: 10,
                                        max: 10,
                                    },
                                ]}   
                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue="1231231" /></Col>    <Popover content={ValidationTax} trigger="hover">
                                        <Button size="small" shape="circle" style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="1231231" /></Col>    <Popover content={ValidationTax} trigger="hover">
                                        <Button size="small" shape="circle" style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Điện thoại"
                                name="phone"
                                rules={[
                                   
                                    {
                                        
                                        message: 'Vui lòng nhập 10 ký tự',
                                        min: 10,
                                        max: 10,
                                    },
                                ]}    
                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue="1231231" /></Col>    <Popover content={ValidationPhone} trigger="hover">
                                        <Button size="small" shape="circle" style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="1231231" /></Col>    <Popover content={ValidationPhone} trigger="hover">
                                        <Button size="small" shape="circle" style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                required
                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue="12/10/4/8" /></Col>    <Popover content={ValidationAdd} trigger="hover">
                                        <Button size="small" shape="circle" style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="12/10/4/8" /></Col>    <Popover content={ValidationAdd} trigger="hover">
                                        <Button size="small" shape="circle" style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="Email"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue="Email" /></Col>    <Popover content={ValidationEmail} trigger="hover">
                                        <Button size="small" shape="circle" style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="Email" /></Col>    <Popover content={ValidationEmail} trigger="hover">
                                        <Button size="small" shape="circle" style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Giấy phép kinh doanh"
                                name="certificate"
                                required
                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue="34534534" /></Col>    <Popover content={ValidationCertificate} trigger="hover">
                                        <Button size="small" shape="circle" style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="34534534" /></Col>    <Popover content={ValidationCertificate} trigger="hover">
                                        <Button size="small" shape="circle" style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Tài khoản ngân hàng"
                                name="bankaccount"

                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue="34534534" /></Col>    <Popover content={ValidationBank} trigger="hover">
                                        <Button size="small" shape="circle" style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="34534534" /></Col>    <Popover content={ValidationBank} trigger="hover">
                                        <Button size="small" shape="circle" style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>
                            <Form.Item
                                label="Người đại diện"
                                name="presentor"
                                required
                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue="Nguyen Van A" /></Col>    <Popover content={ValidationPresentor} trigger="hover">
                                        <Button size="small" shape="circle" style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="Nguyen Van A" /></Col>    <Popover content={ValidationPresentor} trigger="hover">
                                        <Button size="small" shape="circle" style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>



                            <Form.Item
                                label="Chức vụ"
                                name="role"
                                required
                            >
                                {this.state.isEdit === false ?
                                    <Row gutter={8}> <Col span={20}><Input disabled defaultValue="Giám đốc" /></Col>    <Popover content={ValidationRole} trigger="hover">
                                        <Button size="small" shape="circle" style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                    </Popover></Row> :
                                    <Row gutter={8}> <Col span={20}><Input defaultValue="Giám đốc" /></Col>    <Popover content={ValidationRole} trigger="hover">
                                        <Button size="small" shape="circle" style={{ border: "none" }} icon={<QuestionCircleOutlined />} />
                                    </Popover></Row>}
                            </Form.Item>




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
