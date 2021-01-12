import React from "react";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { Select, DatePicker, Button, Space, Breadcrumb, PageHeader, Input, InputNumber, Form, Radio,Card,Dropdown } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios';
import { createEmployee } from '../../actions/EmployeeAction';
import { connect } from 'react-redux';
const { Option } = Select;
class EmployeeSearch extends React.Component {
    constructor() {
        super();

        this.state = {
            SearchBy: "all",
            firstSearchValue: "all",
            secondSearchValue: "all",
            thirdSearchValue: "all",
            SearchValue: ""
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
        if (this.state.SearchBy === "SearchByName") {
            let EmployeeSearchList = this.props.employeeList.filter(employee => employee.userName.toLowerCase().includes(this.state.SearchValue.toLowerCase()))
            console.log(EmployeeSearchList)
            this.props.onSubmit(EmployeeSearchList)
        } else if (this.state.SearchBy === "SearchByRoles") {
            let EmployeeSearchList = this.props.employeeList.filter(employee => employee.roles.toString().toLowerCase().includes(this.state.SearchValue.toLowerCase()))
            console.log(EmployeeSearchList)
            this.props.onSubmit(EmployeeSearchList)
        } else {
            axios({
                url: '/api/Account/employee',
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
        }

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
                    <Radio.Group onChange={this.handleChange} value={this.state.SearchBy}>
                    <Radio style={radioStyle} value={"all"}>
                            tất cả
        </Radio>
        <Radio style={radioStyle} value={"SearchByName"}>
                            tìm kiếm tên nhân viên
        </Radio>
                        <Radio style={radioStyle} value={"SearchByRoles"}>
                            tìm kiếm theo chức vụ
        </Radio>


                    </Radio.Group>
                </Card>
                {/* <Card>
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
                </Card> */}
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
                                {this.state.SearchBy === "SearchByName" ?
                                    <><Input onInput={values => this.setState({ SearchValue: values.target.value })} style={{ width: '300px' }} />
                                        </>
                                    : null}
                                {this.state.SearchBy === "SearchByRoles" ? 
                                <> <Input onInput={values => this.setState({ SearchValue: values.target.value })} style={{ width: '300px' }} />
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
var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (token) => {
            dispatch(createEmployee(token))
        }
    }
}
export default connect(null, mapDispatchToProps)(EmployeeSearch);