import {
    QuestionCircleOutlined
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Popover, Row, Space } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import '../../index.css';
import axios from 'axios'
const { TextArea } = Input;

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
const ValidationCompany = (

    <p>Tên công ty được in trên hợp đồng nên để tên dưới 250 ký tự</p>

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

    <p>8 số cuối của mã số ngân hàng trên thẻ của công ty</p>

);


const middleLayout = {
    wrapperCol: {
        offset: 6,
        span: 10,
    },
};
class AddCompany extends React.Component {
    constructor() {
        super();
        this.state = {
            finish: false,

        };
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }

    onFinish = (values) => {
        console.log(values);
        axios({
            url: '/api/v1/company',
            method: "POST",
            data: values
        })
            .then((response) => {

                return response.data.data;
            })
            .then((data) => {




            })
            .catch(error => {
                console.log(error)
            });


    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    render() {



        return (


            <Card>
                <br />
                <h2 style={{ textAlign: 'center' }}>Thông tin doanh nghiệp</h2>




                <Form
                    {...layout}
                    name="basic"
                    className="employee-form"

                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}

                >

                        <Form.Item
                            label="Tên doanh nghiệp"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên doanh nghiệp',
                                },
                            ]}>
                            <Row gutter={8}> <Col span={20}><TextArea autoSize placeholder="Tên doanh nghiệp" /> </Col>    <Popover content={ValidationCompany} trigger="hover">
                        <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                    </Popover></Row>
</Form.Item>
                    <Form.Item
                        label="Mã số thuế"
                        name="taxCode"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mst ',
                                
                            },
                            {
                                
                                message: 'Vui lòng nhập 10 ký tự',
                                min: 10,
                                max: 10,
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input type="number" /></Col>    <Popover content={ValidationTax} trigger="hover">
                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label="Điện thoại"
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập sdt',
                                
                            },
                            {
                                
                                message: 'Vui lòng nhập 10 ký tự',
                                min: 10,
                                max: 10,
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input type="number" prefix="+84" /></Col>    <Popover content={ValidationPhone} trigger="hover">
                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        required
                    >
                        <Row gutter={8}> <Col span={20}><TextArea autoSize /></Col>    <Popover content={ValidationAdd} trigger="hover">
                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Vui lòng nhập Email',
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input /></Col>    <Popover content={ValidationEmail} trigger="hover">
                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label="Giấy phép kinh doanh"
                        name="businessLicense"
                        required
                    >
                        <Row gutter={8}> <Col span={20}><Input type="number" /></Col>    <Popover content={ValidationCertificate} trigger="hover">
                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label="Tài khoản ngân hàng"
                        name="bankAccount"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Số tài khoản',
                                
                            },{

                                message: 'Vui lòng nhập 8 ký tự',
                                min: 8,
                                max: 8,
                            },
                        ]}
                    >
                        <Row gutter={8}> <Col span={20}><Input type="number" /></Col>    <Popover content={ValidationBank} trigger="hover">
                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
                    </Form.Item>
                    <Form.Item
                        label="Người đại diện"
                        name="comRepresentative"
                        required
                    >
                        <Row gutter={8}> <Col span={20}><Input type="number" /></Col>    <Popover content={ValidationPresentor} trigger="hover">
                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
                    </Form.Item>



                    <Form.Item
                        label="Chức vụ"
                        name="comRepresentativeRole"
                        required
                    >
                        <Row gutter={8}> <Col span={20}><Input /></Col>    <Popover content={ValidationRole} trigger="hover">
                            <Button shape="circle" style={{ border: "none" }} size="small" icon={<QuestionCircleOutlined />} />
                        </Popover></Row>
                    </Form.Item>




                    <Form.Item {...tailLayout}>
                        <Space size="large">
                            <Button type="primary" htmlType="submit" >
                                Tạo
                                </Button>
                            <Button type="primary" htmlType="reset" >
                                Xóa dữ liệu đã nhập                                </Button>


                        </Space>
                    </Form.Item>
                    <Form.Item>

                    </Form.Item>






                </Form>
            </Card>


        );
    }
}



export default AddCompany;
