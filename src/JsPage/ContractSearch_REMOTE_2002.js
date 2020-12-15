import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Select, DatePicker, Button, Space, Breadcrumb, PageHeader, Input, InputNumber } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import Form from "antd/lib/form/Form";
const { Option } = Select;
const { RangePicker } = DatePicker;
class ContractSearch extends React.Component {
    constructor() {
        super();

        this.state = {

            SearchBy: "SearchByContractId"
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
                    <Select defaultValue="SearchByContractId" onChange={this.handleChange}>
                        <Option value="SearchByContractId">tìm kiếm theo số hợp đồng</Option>
                        <Option value="SearchByContractDuration">tìm kiếm theo thời hạn</Option>
                        <Option value="SearchByCustomerTaxCode">tìm kiếm theo mã số thuế</Option>
                        <Option value="SearchByStatus">tìm kiếm theo trạng thái</Option>
                        <Option value="SearchByContractValue">tìm kiếm theo giá trị hợp đồng</Option>
                        <Option value="SearchByContractDeadline">tìm kiếm theo ngày hết hạn</Option>
                        <Option value="SearchByContractCreatedDate">tìm kiếm theo ngày tạo</Option>
                    </Select>

                    <PageHeader
                        className="site-page-header"

                        title={[<Space size="large">
                            {this.state.SearchBy === "SearchByStatus" ?
                                <Breadcrumb>
                                    <Breadcrumb.Item>Tất cả</Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        đang duyệt
                            </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        đang chờ ký
                            </Breadcrumb.Item>
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
                                    {this.state.SearchBy === "SearchByContractId" ?
                                        <> <Input name="searchValue" />
                                            <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined />} /></>
                                        : null}
                                    {this.state.SearchBy === "SearchByCustomerTaxCode" ? <> <Input name="searchValue" />
                                        <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined />} /></> : null}
                                    {this.state.SearchBy === "SearchByContractValue" ? <> <InputNumber

                                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}

                                    />
                                        <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined />} /></>
                                        : null}
                                    {this.state.SearchBy === "SearchByContractDuration" ? <><RangePicker
                                        showTime={{ format: 'HH:mm' }}
                                        format="YYYY-MM-DD HH:mm"
                                        onChange={this.onChange}
                                        onOk={this.onOk}
                                    />
                                        <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined />} /></>
                                        : null}
                                    {this.state.SearchBy === "SearchByContractDeadline" ? <>
                                        <DatePicker showTime onChange={this.onChange} onOk={this.onOk} />
                                        <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined />} /></>
                                        : null}
                                    {this.state.SearchBy === "SearchByContractCreatedDate" ? <>
                                    <DatePicker showTime onChange={this.onChange} onOk={this.onOk} />

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
export default ContractSearch;