import 'antd/dist/antd.css';
import { Table, Space, Button, Tag } from 'antd';
import AddCustomer from './AddCustomer'
import ViewCustomer from './ViewCustomer'
import React from 'react';
import './Column.css'
import CustomerSearch from './CustomerSearch'
import { createCustomer, customerInformation } from '../actions/CustomerAction'
import { connect } from 'react-redux'
import { UserAddOutlined, EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons"
const { Column } = Table;


class CustomerList extends React.Component {
  constructor() {
    super();

    this.state = {
      openCustomer: "",

    };

    this.OpenAddCustomer = this.OpenAddCustomer.bind(this);
    this.OpenViewCustomer = this.OpenViewCustomer.bind(this);

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
        company: "cty 369",
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
  OpenViewCustomer() {
    this.setState({
      openCustomer: "openViewCustomer",
    })
  }
  render() {
    if (this.state.openCustomer === "openAddCustomer") {
      return (
        <AddCustomer />
      );
    } else if (this.state.openCustomer === "openViewCustomer") {
      return (<AddCustomer />);

    }
    else {
      return (
        <div style={{ height: "100vh" }}><Button type="primary" onClick={this.OpenAddCustomer} icon={<UserAddOutlined />}>Tạo khách hàng mới</Button>
          <CustomerSearch />
          <Table dataSource={this.props.newCustomer}
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} >
            <Column title="Tên doanh nghiệp" dataIndex="company" key="company" render={(text, record) => (

              <b>{text}</b>

            )} />

            <Column title="Người đại diện" dataIndex="name" key="name" render={(text, record) => (

              <b>{text}</b>

            )} />
            <Column title="Địa chỉ" dataIndex="address" key="address" render={(text, record) => (

              <b>{text}</b>

            )} />
            <Column title="Mã số thuế" dataIndex="address" key="address" render={(text, record) => (

              <b>{text}</b>

            )} />
            <Column title="Số fax" dataIndex="address" key="address" render={(text, record) => (

              <b>{text}</b>

            )} />
            <Column title="Số điện thoại" dataIndex="address" key="address" render={(text, record) => (

              <b>{text}</b>

            )} />
            <Column title="email" dataIndex="address" key="address" render={(text, record) => (

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
                  <EditOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={this.OpenViewCustomer}>Sửa</EditOutlined>
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