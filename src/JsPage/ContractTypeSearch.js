import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Select, DatePicker, Button, Space, Breadcrumb, PageHeader, Input, InputNumber,Form } from 'antd';
const { Option } = Select;
class ContractTypeSearch extends React.Component {
    constructor() {
        super();

        this.state = {

            SearchBy: "SearchByContractType"
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
                <Select defaultValue="SearchByContractType" onChange={this.handleChange}>
                    <Option value="SearchByContractType">tìm kiếm theo loại hợp đồng</Option>
                    <Option value="SearchByCreater">tìm kiếm theo người tạo</Option>
                    <Option value="SearchByCreateDate">tìm kiếm theo ngày tạo</Option>
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
                               
                                {this.state.SearchBy === "SearchByContractType" ?
                                    <> <Input name="searchValue" />
                                        <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined />} /></>
                                    : null}
                                {this.state.SearchBy === "SearchByCreater" ? <> <Input name="searchValue" />
                                    <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined />} /></> : null}
                                {this.state.SearchBy === "SearchByCreateDate" ?
                                    <> <Input name="searchValue" />
                                        <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined />} /></>
                                    : null}


                            </Space>
                        </Form>
                    ]}
                >



                </PageHeader>

            </div>);
    }
}
export default ContractTypeSearch;