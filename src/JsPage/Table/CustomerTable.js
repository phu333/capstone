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
      return (
        <Router>
          <Redirect push to={"/capstone/addCustomer"} />
          <Route exact path="/capstone/addCustomer" render={() => <AddCustomer token={this.props.token} />
          } /></Router>

      );
    } else if (this.state.openCustomer === "openViewCustomer") {
      return (<Router>
        <Redirect push to={"/capstone/updateCustomer/" + this.state.customer.taxCode} />
        <Route exact path="/capstone/updateCustomer/:id" render={() => <ViewCustomer customer={this.state.customer} />
        } /></Router>);

    }
    else {
      return (
        <div style={{ height: "100vh" }}><Button type="primary" onClick={this.OpenAddCustomer} icon={<UserAddOutlined />}>Tạo khách hàng mới</Button>
          <CustomerSearch token={this.props.token} customerList={this.state.customers} />
          <Table dataSource={this.props.newCustomer}

            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} >
            <Column title="Tên doanh nghiệp" dataIndex="name" key="name"
              sorter={(a, b) => a.name.localeCompare(b.name)}
              sortDirections={['descend', 'ascend']}
              render={(text, record) => (

                <p>{text}</p>

              )} />

            <Column title="Người đại diện" dataIndex="name" key="name"
              sorter={(a, b) => a.name.localeCompare(b.name)}
              sortDirections={['descend', 'ascend']}
              render={(text, record) => (

                <p>{text}</p>

              )} />
            <Column title="Mã số thuế" dataIndex="taxCode" key="taxCode" render={(text, record) => (

              <p>{text}</p>

            )} />
            <Column title="Số điện thoại" dataIndex="phoneNumber" key="phoneNumber" render={(text, record) => (

              <p>{text}</p>

            )} />
            {/* <Column title="email" dataIndex="email" key="email" render={(text, record) => (

              <a>{text}</a>

            )} /> */}

            {/* <Column title="trạng thái" dataIndex="status" key="status"
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
            <Column
              title="Tác vụ"
              dataIndex="status"
              key="status"
              sorter={(a, b) => a.status.localeCompare(b.status)}
              sortDirections={['descend', 'ascend']}
              render={(text, record) => (
                <Space size="middle">
                  {text === "active" ? <Switch style={{ fontSize: '20px' }} checkedChildren="kích hoạt" unCheckedChildren="Vô hiệu hóa" defaultChecked /> : <Switch style={{ fontSize: '20px' }} checkedChildren="kích hoạt" unCheckedChildren="Vô hiệu hóa" defaultunChecked />}
                </Space>
              )}
            />

          </Table></div>
      );
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