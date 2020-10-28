import React from "react";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { Select, DatePicker, Button, Space, Breadcrumb, PageHeader, Input, InputNumber, Form, Radio,Card,Dropdown } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
const { Option } = Select;
class EmployeeSearch extends React.Component {
    constructor() {
        super();

        this.state = {

            firstSearchValue: "all",
            secondSearchValue: "all",
            thirdSearchValue: "all",
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

    onChangeFirstSearchValue = e => {
        this.setState({
            firstSearchValue: e.target.value
        })
    }
    onChangeSecondSearchValue = e => {
        this.setState({
            secondSearchValue: e.target.value
        })
    }
    onChangeThirdSearchValue = e => {
        this.setState({
            thirdSearchValue: e.target.value
        })
    }
    render() {
        const radioStyle = {

        };
        const dropDown = (
            <Space direction="horizontal">
                <Card>
                    <Radio.Group onChange={this.onChangeFirstSearchValue} value={this.state.firstSearchValue}>
                        <Radio style={radioStyle} value={"SearchByPhone"}>
                            tìm kiếm bằng sdt
        </Radio>

                        <Radio style={radioStyle} value={"all"}>
                            tất cả
        </Radio>


                    </Radio.Group>
                </Card>
                <Card>
                    <Radio.Group onChange={this.onChangeSecondSearchValue} value={this.state.secondSearchValue}>
                        <Radio style={radioStyle} value={"all"}>
                            tất cả
                        </Radio>

                        <Radio style={radioStyle} value={"SearchByName"}>
                            tìm kiếm bằng tên
        </Radio>

                    </Radio.Group>
                </Card>
                <Card>
                    <Radio.Group onChange={this.onChangeThirdSearchValue} value={this.state.thirdSearchValue}>
                        <Radio style={radioStyle} value={"all"}>
                            tất cả
                        </Radio>
                        <Radio style={radioStyle} value={"active"}>
                            đang có hiệu lực
        </Radio>

                        <Radio style={radioStyle} value={"deactive"}>
                            hết hiệu lực
        </Radio>
                    </Radio.Group>
                </Card>
            </Space>
        )
        return (

            <div className="container">


                <PageHeader
                    className="site-page-header"

                    title={[<Space size="large">



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
                                <Dropdown overlay={dropDown} placement="bottomCenter" arrow>
                                    <Button icon={<MenuOutlined />}>Tìm kiếm bằng</Button>
                                </Dropdown>
                                {this.state.secondSearchValue === "SearchByName" ?
                                    <> <Input name="searchValue" />
                                        </>
                                    : null}
                                {this.state.firstSearchValue === "SearchByPhone" ? <> <Input name="searchValue" />
                                    </> : null}
                                    <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined />} />


                            </Space>
                        </Form>
                    ]}
                >



                </PageHeader>

            </div>);
    }
}
export default EmployeeSearch;