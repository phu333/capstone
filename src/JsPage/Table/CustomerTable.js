import 'antd/dist/antd.css';
import { Table, Space, Button, Tag, Switch, message } from 'antd';
import AddCustomer from '../Add/AddCustomer'
import ViewCustomer from '../Update/ViewCustomer'
import React from 'react';
import "../Column.css"
import CustomerSearch from '../Search/CustomerSearch'
import { createCustomer, customerInformation } from '../../actions/CustomerAction'
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { UserAddOutlined, EditOutlined, DeleteOutlined, UserOutlined, FolderViewOutlined } from "@ant-design/icons"
import axios from 'axios'
import FadeIn from 'react-fade-in'
const { Column } = Table;


class CustomerList extends React.Component {
  constructor() {
    super();

    this.state = {
      openCustomer: "",
      customer: {},
      customers:[],
    };

    this.OpenAddCustomer = this.OpenAddCustomer.bind(this);


  }
  componentDidMount() {

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
        console.log(data.data)
        this.setState({
          customers:data.data,
        })
        this.props.onSubmit(data.data)


      })
      .catch(error => {
       
      });
      
     
     
      

    

  }
  OpenAddCustomer() {
    this.setState({
      openCustomer: "openAddCustomer",

    })
  }

  render() {
    if (this.state.openCustomer === "openAddCustomer") {
      return (<FadeIn>
        <Router>
          <Redirect push to={"/capstone/addCustomer"} />
          <Route exact path="/capstone/addCustomer" render={() => <AddCustomer token={this.props.token} />
          } /></Router></FadeIn>

      );
    } else if (this.state.openCustomer === "openViewCustomer") {
      return (<FadeIn>
      <Router>
        <Redirect push to={"/capstone/updateCustomer/" + this.state.customer.taxCode} />
        <Route exact path="/capstone/updateCustomer/:id" render={() => <ViewCustomer customer={this.state.customer} />
        } /></Router></FadeIn>
        
        );

    }
    else {
      if (this.props.myLoginReducer !== "logout") {

        var information = this.props.myLoginReducer.map((login, index) => {
  
     return (<FadeIn>
        <div style={{ height: "100vh" }}>
        {login.AddCustomer === true ? <Button type="primary" onClick={this.OpenAddCustomer} icon={<UserAddOutlined />}>Tạo khách hàng mới</Button>:null}
          <CustomerSearch token={this.props.token} customerList={this.state.customers} />
          <Table dataSource={this.props.newCustomer}

            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} >
            <Column title="Tên doanh nghiệp" dataIndex="name" key="name"
              sorter={(a, b) => a.name.localeCompare(b.name)}
              sortDirections={['descend', 'ascend']}
              render={(text, record) => (

                <p>{text}</p>

              )} />
{/* 
            <Column title="Người đại diện" dataIndex="name" key="name"
              sorter={(a, b) => a.name.localeCompare(b.name)}
              sortDirections={['descend', 'ascend']}
              render={(text, record) => (

                <p>{text}</p>

              )} /> */}

            <Column title="Mã số thuế" dataIndex="taxCode" key="taxCode"align='center' render={(text, record) => (

              <p>{text}</p>

            )} />

            <Column title="Email" dataIndex="email" key="email" render={(text, record) => (

              <a>{text}</a>

            )} />

            {/* <Column title="Trạng thái" dataIndex="status" key="status"
              sorter={(a, b) => a.status.localeCompare(b.status)}
              sortDirections={['descend', 'ascend']}
              render={(text, record) => {
                let color = 'pink'
                if (text === 'deactive') {
                  color = 'red'
                } else if (text === 'active') {
                  color = 'green'
                } else if (text === 'pending') {
                  color = 'blue'
                } else if (text === 'waiting for customer') {
                  color = 'pink'
                } else if (text === 'rejected') {
                  color = 'grey'
                }
                return (<Tag color={color} key={text}>
                  {text.toUpperCase()}
                </Tag>);
              }}
            /> */}
            <Column
              title="Xem thông tin"
              key="action"
              align="center"
              render={(text, record) => (
                <Space size="middle">
                  <FolderViewOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={
                    () => this.setState({
                      customer: text,
                      openCustomer: "openViewCustomer",
                    })
                  } />
                </Space>
              )}
            />
            {login.ActiveDeactiveCustomer === true ? 
            <Column
              title="Tác vụ"
              dataIndex="status"
              key="status"
              align="center"
              // sorter={(a, b) => a.status.localeCompare(b.status)}
              // sortDirections={['descend', 'ascend']}
              render={(text, record) => (
                <Space size="middle">
                  {text === "Deactive" ? <Switch style={{ fontSize: '20px' }}  checkedChildren="Vô hiệu hóa" unCheckedChildren="kích hoạt"defaultunChecked  /> : <Switch style={{ fontSize: '20px' }} checkedChildren="Vô hiệu hóa" unCheckedChildren="kích hoạt" defaultChecked />}
                </Space>
              )}
            />
:null}
          </Table></div></FadeIn>
                    );
                  }
          
                  )
                } if (this.props.myLoginReducer === "Logout") {
          
          
                } return (<div>{information}</div>);
              }
          
            }
          }
          
var mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: (token) => {
      dispatch(createCustomer(token))
    }
  }
}
var mapStateToProps = state => {


  return {
    newCustomer: state.myCustomerReducer,
    myLoginReducer: state.myLoginReducer
  }



}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerList)