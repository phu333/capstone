import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Select, DatePicker, Button, Space, Breadcrumb, PageHeader, Input, InputNumber,Form } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
const { Option } = Select;
class EmployeeSearch extends React.Component {
    constructor() {
        super();

        this.state = {

            SearchBy: "SearchByName"
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
            <div className="container">
                <Select defaultValue="SearchByName" onChange={this.handleChange}>
                    <Option value="SearchByPhone">tìm kiếm theo số điện thoại</Option>
                    <Option value="SearchByName">tìm kiếm theo tên </Option>
                    
                    <Option value="SearchByStatus">tìm kiếm theo trạng thái</Option>
                    
                    
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
                                {this.state.SearchBy === "SearchByName" ?
                                    <> <Input name="searchValue" />
                                        <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined />} /></>
                                    : null}
                                {this.state.SearchBy === "SearchByPhone" ? <> <Input name="searchValue" />
                                    <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined />} /></> : null}
                               


                            </Space>
                        </Form>
                    ]}
                >



                </PageHeader>

            </div>);
    }
}
export default EmployeeSearch;