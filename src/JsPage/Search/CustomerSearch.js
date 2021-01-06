import React from "react";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { createCustomer, customerInformation } from '../../actions/CustomerAction'
import { Select, DatePicker, Button, Space, Breadcrumb, PageHeader, Input, InputNumber, Form,Card,Radio,Dropdown } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
const { Option } = Select;
class CustomerSearch extends React.Component {
    constructor() {
        super();

        this.state = {
            SearchBy:"all",
            firstSearchValue: "all",
            secondSearchValue: "all",
            thirdSearchValue: "all",
            SearchValue:"",
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
        if(this.state.SearchBy === "SearchByCompanyName"){

            let custometSearchList = this.props.customerList.filter(customer=>customer.name==this.state.SearchValue)
            console.log(custometSearchList)
            this.props.onSubmit(custometSearchList)
        }else if(this.state.SearchBy === "SearchByTaxCode"){
            let custometSearchList = this.props.customerList.filter(customer=>customer.taxCode==this.state.SearchValue)
            console.log(custometSearchList)
            this.props.onSubmit(custometSearchList)
        }else{
            axios({
                url: '/api/v1/Customer',
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
                        <Radio style={radioStyle} value={"SearchByCompanyName"}>
                            tìm kiếm tên doanh nghiệp
        </Radio>
                        <Radio style={radioStyle} value={"SearchByTaxCode"}>
                            tìm kiếm mã số thuế
        </Radio>
                        <Radio style={radioStyle} value={"all"}>
                            tất cả
        </Radio>


                    </Radio.Group>
                </Card>
                {/* <Card>
                    <Radio.Group onChange={this.onChangeSecondSearchValue} value={this.state.secondSearchValue}>
                        <Radio style={radioStyle} value={"all"}>
                            tất cả
                        </Radio>

                        <Radio style={radioStyle} value={"SearchByName"}>
                            tìm kiếm bằng tên
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
                               
                            <Form.Item name="Search">
                                {this.state.SearchBy === "SearchByCompanyName" ? <> <Input onInput={values=>this.setState({SearchValue:values.target.value})} style={{ width: '300px' }} />
                                    </> : null}
                                {this.state.SearchBy === "SearchByTaxCode" ?
                                    <> <Input onInput={values=>this.setState({SearchValue:values.target.value})} style={{ width: '300px' }} />
                                        </>
                                    : null}
                                    </Form.Item>
                                <Button type="primary" htmlType="submit" shape="circle" icon={<SearchOutlined />} />


                            </Space>
                        </Form>
                    ]}
                >



                </PageHeader>

            </div>

        );
    }
}
var mapDispatchToProps = (dispatch, props) => {
    return {
      onSubmit: (token) => {
        dispatch(createCustomer(token))
      }
    }
  }
export default connect(null, mapDispatchToProps) (CustomerSearch);