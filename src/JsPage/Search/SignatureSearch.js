import React from "react";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { Select,Form, DatePicker, Button, Space, Breadcrumb, PageHeader, Input, InputNumber, Dropdown, Card, Radio } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
const { RangePicker } = DatePicker;
class SignatureSearch extends React.Component {
    constructor() {
        super();

        this.state = {

            firstSearchValue: "all",
            secondSearchValue: "all",
            thirdSearchValue: "all",
        };


    }
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
                        <Radio style={radioStyle} value={"SearchByProvider"}>
                            tìm kiếm nhà cung cấp
        </Radio>
                        <Radio style={radioStyle} value={"SearchBySerial"}>
                            Số serial
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

                        <Radio style={radioStyle} value={"SearchByGivenDate"}>
                            Ngày cấp
        </Radio>
                        <Radio style={radioStyle} value={"SearchByDeadline"}>
                            Ngày hết hạn
        </Radio>
                        <Radio style={radioStyle} value={"SearchInAPeriod"}>
                            Trong khoản thời gian
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


                                {this.state.firstSearchValue === "SearchByProvider" ? <> <Input name="searchValue" />
                                </> : null}
                                {this.state.firstSearchValue === "SearchBySerial" ?
                                    <> <Input name="searchValue" />
                                    </>
                                    : null}
                                {this.state.secondSearchValue === "SearchByGivenDate" ? <> 
                                <DatePicker showTime onChange={this.onChange} onOk={this.onOk} />
                                </> : null}
                                {this.state.secondSearchValue === "SearchByDeadline" ?
                                    <> <DatePicker showTime onChange={this.onChange} onOk={this.onOk} />
                                    </>
                                    : null}
                                {this.state.secondSearchValue === "SearchInAPeriod" ? <> <RangePicker
                                    showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD HH:mm"
                                    onChange={this.onChange}
                                    onOk={this.onOk}
                                />
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
export default SignatureSearch;