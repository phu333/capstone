import 'antd/dist/antd.css';
import { Table, Space, Button, Tag, Switch } from 'antd';
import AddCustomer from './AddCustomer'
import ViewCustomer from './ViewCustomer'
import React from 'react';
import './Column.css'
import CustomerSearch from './CustomerSearch'
import { createCustomer, customerInformation } from '../actions/CustomerAction'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { UserAddOutlined, EditOutlined, DeleteOutlined, UserOutlined,EyeOutlined } from "@ant-design/icons"
const { Column } = Table;


class CustomerList extends React.Component {
  constructor() {
    super();

    this.state = {
      openCustomer: "",
      customer:{},
    };

    this.OpenAddCustomer = this.OpenAddCustomer.bind(this);
    

  }
  componentDidMount() {

    if (this.props.newCustomer.length === 0) {
      const contract1 = {

        name: 'John',
        company: "cty 369",
        address: '10 Downing Street',
        taxCode: "taxcode",
        faxCode: "faxcode",
        phone: "phone",
        email: "email",
        status: "deactive",

      }
      const contract2 = {

        name: 'Mike',
        company: "cty 370",
        address: '10 Downing Street',
        taxCode: "taxcode",
        faxCode: "faxcode",
        phone: "phone",
        email: "email",
        status: "active",

      }

      this.props.onSubmit(contract1)
      this.props.onSubmit(contract2)

    }

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
          <Route exact path="/capstone/addCustomer" render={() => <AddCustomer />
          } /></Router>

      );
    } else if (this.state.openCustomer === "openViewCustomer") {
      return (<Router>
        <Redirect push to={"/capstone/updateCustomer/"+this.state.customer.taxCode} />
        <Route exact path="/capstone/updateCustomer/:id" render={() => <AddCustomer customer={this.state.customer} />
        } /></Router>);

    }
    else {
      return (
<<<<<<< HEAD
        <div><br />
          <div style={{ height: "100vh" }}><Button type="primary" onClick={this.OpenAddCustomer} icon={<UserAddOutlined />}>Tạo khách hàng mới</Button>

            <CustomerSearch />
            <Table dataSource={this.props.newCustomer}

              rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} >
              <Column title="Tên doanh nghiệp" dataIndex="company" key="company"
                sorter={(a, b) => a.company.localeCompare(b.company)}
                sortDirections={['descend', 'ascend']}
                render={(text, record) => (

                  <a>{text}</a>

                )} />

              <Column title="Người đại diện" dataIndex="name" key="name"
                sorter={(a, b) => a.name.localeCompare(b.name)}
                sortDirections={['descend', 'ascend']}
                render={(text, record) => (

                  <b>{text}</b>

                )} />
                {/*những cái này tui nghĩ chỉ cần hiện trong phần Thông tin công ty thôi
              <Column title="Địa chỉ" dataIndex="address" key="address"
                sorter={(a, b) => a.address.localeCompare(b.address)}
                sortDirections={['descend', 'ascend']}
                render={(text, record) => (

                  <b>{text}</b>

                )} />*
              <Column title="Mã số thuế" dataIndex="taxCode" key="taxCode" render={(text, record) => (
=======
        <div style={{ height: "100vh" }}><Button type="primary" onClick={this.OpenAddCustomer} icon={<UserAddOutlined />}>Tạo khách hàng mới</Button>
          <CustomerSearch />
          <Table dataSource={this.props.newCustomer}

            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} >
            <Column title="Tên doanh nghiệp" dataIndex="company" key="company"
              sorter={(a, b) => a.company.localeCompare(b.company)}
              sortDirections={['descend', 'ascend']}
              render={(text, record) => (
>>>>>>> origin/main

                <b>{text}</b>

              )} />
<<<<<<< HEAD
                              
              <Column title="Số fax" dataIndex="faxCode" key="faxCode" render={(text, record) => (

                <b>{text}</b>

              )} />*/}
              <Column title="Số điện thoại" dataIndex="phone" key="phone" render={(text, record) => (
=======

            <Column title="Người đại diện" dataIndex="name" key="name"
              sorter={(a, b) => a.name.localeCompare(b.name)}
              sortDirections={['descend', 'ascend']}
              render={(text, record) => (
>>>>>>> origin/main

                <b>{text}</b>

              )} />
<<<<<<< HEAD
              <Column title="email" dataIndex="email" key="email" render={(text, record) => (

                <a>{text}</a>

              )} />

              <Column title="trạng thái" dataIndex="status" key="status"
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
              />
              <Column
                title="Cập nhật thông tin"
                key="action"
                render={(text, record) => (
                  <Space size="small">
                    <EditOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={this.OpenViewCustomer}>Sửa</EditOutlined>
                  </Space>
                )}
              />
              <Column
                title="Tác vụ"
                dataIndex="status"
                key="status"

                render={(text, record) => (
                  /*onClick={ this.OpenViewCustomer*/
                  <Space size="middle">
                    {text === "active" ? <Switch style={{ fontSize: '30px' }} onClick={this.OpenViewCustomer} checkedChildren="kích hoạt" unCheckedChildren="Vô hiệu hóa" defaultChecked /> : <Switch style={{ fontSize: '30px' }} checkedChildren="kích hoạt" unCheckedChildren="Vô hiệu hóa" defaultunChecked />}
                  </Space>
                )}
              />

            </Table></div></div>
=======
            <Column title="Địa chỉ" dataIndex="address" key="address"
              sorter={(a, b) => a.address.localeCompare(b.address)}
              sortDirections={['descend', 'ascend']}
              render={(text, record) => (

                <b>{text}</b>

              )} />
            <Column title="Mã số thuế" dataIndex="taxCode" key="taxCode" render={(text, record) => (

              <b>{text}</b>

            )} />
            <Column title="Số fax" dataIndex="faxCode" key="faxCode" render={(text, record) => (

              <b>{text}</b>

            )} />
            <Column title="Số điện thoại" dataIndex="phone" key="phone" render={(text, record) => (

              <b>{text}</b>

            )} />
            <Column title="email" dataIndex="email" key="email" render={(text, record) => (

              <a>{text}</a>

            )} />

            <Column title="trạng thái" dataIndex="status" key="status"
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
            />
            <Column
              title="Cập nhật thông tin"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                 <EyeOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={
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
              render={(text, record) => (
                <Space size="middle">
                  {text === "active" ? <DeleteOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={this.OpenViewCustomer}>Vô hiệu hóa</DeleteOutlined> : null}
                  {text === "deactive" ? <UserOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={this.OpenViewCustomer}>kích hoạt</UserOutlined> : null}
                </Space>
              )}
            />

          </Table></div>
>>>>>>> origin/main
      );
    }

  }
}
var mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: (customer) => {
      dispatch(createCustomer(customer))
    }
  }
}
var mapStateToProps = state => {


  return {
    newCustomer: state.myCustomerReducer
  }



}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerList)