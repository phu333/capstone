import 'antd/dist/antd.css';
import { Table, Space, Tag, Button, Switch, message } from 'antd';
import AddEmployee from '../Add/AddEmployee'
import ViewEmployee from '../Update/ViewEmployee'
import EmployeeDetail from '../Update/EmployeeDetail'
import React from 'react';
import "../Column.css"
import ReactDOM from 'react-dom';
import EmployeeSearch from '../Search/EmployeeSearch'
import { createEmployee, employeeInformation } from '../../actions/EmployeeAction'
import { connect } from 'react-redux'
import { UserAddOutlined, EditOutlined, DeleteOutlined, UserOutlined, FolderViewOutlined } from "@ant-design/icons"
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
const { Column, ColumnGroup } = Table;


class EmployeeList extends React.Component {
  constructor() {
    super();

    this.state = {

      employee: {},
      openEmployee: "",
      employees:[],

    };
    this.OpenAddEmployee = this.OpenAddEmployee.bind(this);
    this.OpenViewEmployee = this.OpenViewEmployee.bind(this);
  }
  componentDidMount() {

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
          this.setState({
            employees:data.data
          })
          this.props.onSubmit(data.data)

        })
        .catch(error => {

          // if (error.response.status === 500) {
          //   message.error(error.response.status + ' Server under maintainence');
          // } else if (error.response.status === 404) {
          //   message.error(error.response.status + ' Server not found');
          // }

        });
      

    

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
          <Route exact path="/capstone/addEmployee" render={() => <AddEmployee token={this.props.token} employee={this.state.employee} />} /></Router>
      );
    } else if (this.state.openEmployee === "openViewEmployee") {
      return (
        <Router>
          <Redirect push to={"/capstone/updateEmployee/" + this.state.employee.userName} />
          <Route exact path="/capstone/updateEmployee/:id" render={() => <ViewEmployee token={this.props.token} employee={this.state.employee} />} />

        </Router>
      );
    }else if (this.state.openEmployee === "employeeDetail") {
      return (
        <Router>
          <Redirect push to={"/capstone/employeeDetail/" + this.state.employee.name} />
          <Route exact path="/capstone/employeeDetail/:id" render={() => <EmployeeDetail token={this.props.token} employee={this.state.employee} />} />

        </Router>
      );
    }
    else {
      return (
        <div style={{ height: "100vh" }}><Button type="primary" onClick={this.OpenAddEmployee} icon={<UserAddOutlined />}>Tạo nhân viên mới</Button>
          <EmployeeSearch token={this.props.token} employeeList={this.state.employees}/>
          <Table dataSource={this.props.newEmployee}
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} >

            <Column title="Tên" dataIndex="userName" key="userName"
              sorter={(a, b) => a.userName.localeCompare(b.userName)}
              sortDirections={['descend', 'ascend']}
              render={(text, record) => (

                <p>{text}</p>

              )} />
            <Column title="Chức vụ" dataIndex="roles"
              sorter={(a, b) => a.roles[0].localeCompare(b.roles[0])}
              sortDirections={['descend', 'ascend']}
              key="roles" 
              render={(text, record) => (
                
                <p>{text}</p>

              )}/>
            {/* <Column title="điện thoại" dataIndex="phone" key="phone" render={(text, record) => (

              <a>{text}</a>

            )} />
            <Column title="email" dataIndex="email" key="email" render={(text, record) => (

              <a>{text}</a>

            )} />

            <Column title="Địa chỉ" dataIndex="address" key="address" render={(text, record) => (

              <b>{text}</b>

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
            {/* <Column
              title="Thông tin cá nhân"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  <FolderViewOutlined style={{ fontSize: '30px', color: '#08c', alignContent: "center", textAlign: "center" }} theme="outlined" onClick={
                    () => this.setState({
                      employee: text,
                      openEmployee: "employeeDetail",
                    })
                  } />
                </Space>
              )}
            /> */}
            <Column
              title="Quyền hạn"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  <FolderViewOutlined style={{ fontSize: '30px', color: '#08c', alignContent: "center", textAlign: "center" }} theme="outlined" onClick={
                    () => this.setState({
                      employee: text,
                      openEmployee: "openViewEmployee",
                    })
                  } />
                </Space>
              )}
            />
            <Column
              title="Trạng thái"
              dataIndex="status"
              key="status"
              render={(text, record) => (
                <Space size="middle">
                  {text === "Deactive" ? <Switch style={{ fontSize: '30px' }} checkedChildren="Vô hiệu hóa" unCheckedChildren="kích hoạt" defaultunChecked /> : <Switch style={{ fontSize: '30px' }} checkedChildren="Vô hiệu hóa" unCheckedChildren="kích hoạt" defaultChecked />}
                </Space>
              )}
            /></Table></div>
      );
    }

  }
}
var mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: (token) => {
      dispatch(createEmployee(token))
    }
  }
}
var mapStateToProps = state => {


  return {
    newEmployee: state.myEmployeeReducer,
    myLoginReducer: state.myLoginReducer
  }



}
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList)