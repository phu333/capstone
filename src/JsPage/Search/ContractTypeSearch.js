import React from "react";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { Select, DatePicker, Button, Space, Breadcrumb, PageHeader, Input, InputNumber, Form, Radio,Dropdown,Card } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux';
import { createContractType } from '../../actions/ContractType';
const { Option } = Select;
class ContractTypeSearch extends React.Component {
    constructor() {
        super();

        this.state = {
            SearchValue: "",
            SearchBy: "all",
            firstSearchValue: "all",
            secondSearchValue: "all",
            thirdSearchValue: "all",
        };
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(value) {
        this.setState({
            SearchBy: value.target.value
        })
    }
    onFinish = (values) => {
        console.log(this.state.SearchValue)
        if (this.state.SearchBy === "SearchByContractType") {
            let custometSearchList = this.props.templateList.filter(template => template.name.toLowerCase().includes(this.state.SearchValue.toLowerCase()))
            console.log(custometSearchList)
            this.props.onSubmit(custometSearchList)
        } else if (this.state.SearchBy === "SearchByCreater") {
            let custometSearchList = this.props.templateList.filter(template => template.createdBy.toLowerCase().includes(this.state.SearchValue.toLowerCase()))
            console.log(custometSearchList)
            this.props.onSubmit(custometSearchList)
        } else {
            axios({
                url: '/api/v1/ContractType',
                method: "GET",
                headers: {
                    Authorization: 'Bearer ' + this.props.token,

                }
            })
                .then((response) => {

                    return response.data;
                })
                .then((data) => {


                    this.props.onSubmit(data.data)


                })
                .catch(error => {

                });
        }};
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
                    <Radio.Group onChange={this.handleChange} value={this.state.SearchBy}>
                        <Radio style={radioStyle} value={"SearchByContractType"}>
                            Tìm kiếm bằng loại hợp đồng
        </Radio>
                        <Radio style={radioStyle} value={"SearchByCreater"}>
                            Tìm kiếm theo tên người tạo
        </Radio>
                        <Radio style={radioStyle} value={"all"}>
                            tất cả
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

                                {this.state.SearchBy === "SearchByContractType" ?
                                     <> <Input onInput={values => this.setState({ SearchValue: values.target.value })} style={{ width: '300px' }} />
                                     </> : null}
                                {this.state.SearchBy === "SearchByCreater" ?  <> <Input onInput={values => this.setState({ SearchValue: values.target.value })} style={{ width: '300px' }} />
                                    </> : null}
                                {this.state.SearchBy === "SearchByCreateDate" ?
                                    <> <DatePicker showTime onChange={this.onChange} onOk={this.onOk} />
                                        </>
                                    : null}
                                <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined style={{verticalAlign:'baseline'}} />} />

                            </Space>
                        </Form>
                    ]}
                >



                </PageHeader>

            </div>);
    }
}
var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (token) => {
            dispatch(createContractType(token))
        }
    }
}
export default connect(null, mapDispatchToProps)(ContractTypeSearch);