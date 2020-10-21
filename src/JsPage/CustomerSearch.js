import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Select, DatePicker, Button, Space, Breadcrumb, PageHeader, Input, InputNumber,Form } from 'antd';
<<<<<<< HEAD
=======
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
>>>>>>> origin/main
const { Option } = Select;
class CustomerSearch extends React.Component {
    constructor() {
        super();
<<<<<<< HEAD

        this.state = {

            SearchBy: "SearchByCompanyName"
        };
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(value) {
        this.setState({
            SearchBy: value
        })
    }
    onFinish = (values) => {
        console.log(values)


    };
    onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    onOk(value) {
        console.log('onOk: ', value);
    }
    onFinishFailed = (errorInfo) => {

    };


    render() {
        return (
=======

        this.state = {
>>>>>>> origin/main

            SearchBy: "SearchByCompanyName"
        };
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(value) {
        this.setState({
            SearchBy: value
        })
    }
    onFinish = (values) => {
        console.log(values)


    };
    onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    onOk(value) {
        console.log('onOk: ', value);
    }
    onFinishFailed = (errorInfo) => {

<<<<<<< HEAD


=======
    };


    render() {
        return (
>>>>>>> origin/main
            <div className="container">
                <Select defaultValue="SearchByCompanyName" onChange={this.handleChange}>
                    <Option value="SearchByPhone">tìm kiếm theo số điện thoại</Option>
                    <Option value="SearchByCompanyName">tìm kiếm theo tên doanh nghiệp</Option>
                    <Option value="SearchByTaxCode">tìm kiếm theo mã số thuế</Option>
                    <Option value="SearchByStatus">tìm kiếm theo trạng thái</Option>
                    <Option value="SearchByFaxCode">tìm kiếm theo số fax</Option>
                    <Option value="SearchByPresentor">tìm kiếm theo người đại diện</Option>
                </Select>

                <PageHeader
                    className="site-page-header"

                    title={[<Space size="large">

                        {this.state.SearchBy === "SearchByStatus" ?
                            <Breadcrumb>
                                <Breadcrumb.Item>Tất cả</Breadcrumb.Item>

                                <Breadcrumb.Item>đang có hiệu lực</Breadcrumb.Item>
                                <Breadcrumb.Item>hết hiệu lực</Breadcrumb.Item>
                            </Breadcrumb> : null}

                    </Space>]}
                    extra={[

                        <Form
                            name="basic"
                            className="search-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}>
                            <Space size="large">
                                {this.state.SearchBy === "SearchByPhone" ?
                                    <> <Input name="searchValue" />
                                        <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined />} /></>
                                    : null}
                                {this.state.SearchBy === "SearchByCompanyName" ? <> <Input name="searchValue" />
                                    <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined />} /></> : null}
                                {this.state.SearchBy === "SearchByTaxCode" ?
                                    <> <Input name="searchValue" />
                                        <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined />} /></>
                                    : null}
                                {this.state.SearchBy === "SearchByFaxCode" ? <> <Input name="searchValue" />
                                    <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined />} /></> : null}
                                {this.state.SearchBy === "SearchByPresentor" ?
                                    <> <Input name="searchValue" />
                                        <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined />} /></>
                                    : null}


                            </Space>
                        </Form>
                    ]}
                >



                </PageHeader>

            </div>

        );
    }
}
export default CustomerSearch;