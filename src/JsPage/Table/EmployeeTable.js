import 'antd/dist/antd.css';
import { Table, Space, Tag, Button, Switch } from 'antd';
import AddEmployee from '../Add/AddEmployee'
import ViewEmployee from '../Update/ViewEmployee'
import React from 'react';
import "../Column.css"
import ReactDOM from 'react-dom';
import EmployeeSearch from '../Search/EmployeeSearch'
import { createEmployee, employeeInformation } from '../../actions/EmployeeAction'
import { connect } from 'react-redux'
import { UserAddOutlined, EditOutlined, DeleteOutlined, UserOutlined, EyeOutlined } from "@ant-design/icons"
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
const { Column, ColumnGroup } = Table;


class EmployeeList extends React.Component {
  constructor() {
    super();

    this.state = {

      employee: {},
      openEmployee: "",

    };
    this.OpenAddEmployee = this.OpenAddEmployee.bind(this);
    this.OpenViewEmployee = this.OpenViewEmployee.bind(this);
  }
  componentDidMount() {

    if (this.props.newEmployee.length === 0) {
      axios({
        url: '',
        method: "GET",
        
    })
        .then((response) => {

            return response.data;
        })
        .then((data) => {

            

        })
        .catch(error => {

            if (error.response.status === 500) {
                message.error(error.response.status + ' Server under maintainence');
            } else if (error.response.status === 404) {
                message.error(error.response.status + ' Server not found');
            }

        });
      const contract1 = {

        name: 'Mike',
        email: "some email",
        address: '10 Downing Street',
        status: "active",
        role: "director"

      }
      const contract2 = {

        name: 'John',
        email: "some email",
        address: '10 Downing Street',
        status: "deactive",
        role: "secrectery"

      }

      this.props.onSubmit(contract1)
      this.props.onSubmit(contract2)

    }

  }
  OpenAddEmployee() {
    this.setState({
      openEmployee: "openAddEmployee",
    })
  }
  OpenViewEmployee() {
    this.setState({
      openEmployee: "openViewEmployee",
    })
  }
  render() {
    if (this.state.openEmployee === "openAddEmployee") {
      return (
        <Router>
          <Redirect push to={"/capstone/addEmployee"} />
          <Route exact path="/capstone/addEmployee" component={AddEmployee} /></Router>
      );
    } else if (this.state.openEmployee === "openViewEmployee") {
      return (
        <Router>
          <Redirect push to={"/capstone/updateEmployee/" + this.state.employee.name} />
          <Route exact path="/capstone/updateEmployee/:id" render={() => <ViewEmployee employee={this.state.employee} />} />

        </Router>
      );
    }
    else {
      return (
        <div style={{ height: "100vh" }}><Button type="primary" onClick={this.OpenAddEmployee} icon={<UserAddOutlined />}>Tạo nhân viên mới</Button>
          <EmployeeSearch />
          <Table dataSource={this.props.newEmployee}
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} >

            <Column title="Tên" dataIndex="name" key="name"
              sorter={(a, b) => a.name.localeCompare(b.name)}
              sortDirections={['descend', 'ascend']}
              render={(text, record) => (

                <b>{text}</b>

              )} />
            <Column title="điện thoại" dataIndex="phone" key="phone" render={(text, record) => (

              <a>{text}</a>

            )} />
            <Column title="email" dataIndex="email" key="email" render={(text, record) => (

              <a>{text}</a>

            )} />
           
            <Column title="Địa chỉ" dataIndex="address" key="address" render={(text, record) => (

              <b>{text}</b>

            )} />
            <Column title="chức vụ" dataIndex="role"
              sorter={(a, b) => a.role.localeCompare(b.role)}
              sortDirections={['descend', 'ascend']}
              key="role" />
            <Column title="trạng thái" dataIndex="status" key="status"
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
            />

            <Column
              title="Xem chi tiết"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  <EyeOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={
                    () => this.setState({
                      employee: text,
                      openEmployee: "openViewEmployee",
                    })
                  } />
                </Space>
              )}
            />
            <Column
              title="Chức năng"
              dataIndex="status"
              key="status"
              render={(text, record) => (
                <Space size="middle">
                  {text === "active" ? <Switch style={{ fontSize: '30px' }} checkedChildren="kích hoạt" unCheckedChildren="Vô hiệu hóa" defaultChecked /> : <Switch style={{ fontSize: '30px' }} checkedChildren="kích hoạt" unCheckedChildren="Vô hiệu hóa" defaultunChecked />}
                </Space>
              )}
            /></Table></div>
      );
    }

  }
}
var mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: (employee) => {
      dispatch(createEmployee(employee))
    }
  }
}
var mapStateToProps = state => {


  return {
    newEmployee: state.myEmployeeReducer
  }



}
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList)