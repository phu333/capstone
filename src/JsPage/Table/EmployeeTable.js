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
import FadeIn from 'react-fade-in'
const { Column, ColumnGroup } = Table;


class EmployeeList extends React.Component {
  constructor() {
    super();

    this.state = {
      loading:true,
      employee: {},
      openEmployee: "",
      employees: [],

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
          employees: data.data
        })
        setTimeout(function(){
          this.setState({
              loading:false,
              
          })
          this.props.onSubmit(data.data)

      }.bind(this),5000)
        

      })
      .catch(error => {

        // if (error.response.status === 500) {
        //   message.error(error.response.status + ' Server under maintainence');
        // } else if (error.response.status === 404) {
        //   message.error(error.response.status + ' Server not found');
        // }

      });




  }
  handleChangeS(index, info) {
    if (info == "Deactive") { info = false }
    else { info = true }
    let Status = {
        id: index,

        enabled: info
    }
    axios({
        url: '/api/Account/permission',
        data: Status,
        method: "PUT",
        headers: {
            Authorization: 'Bearer ' + this.props.token,

        }

    })
        .then((response) => {

            return response.data;
        })
        .then((data) => {
            console.log(data.data)
            message.success("Trạng thái đã được cập nhật")

        })
        .catch(error => {
            message.error("Đã có lỗi xảy ra vui lòng kiểm tra thông tin đã nhập và thử lại sau")

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
      return (<FadeIn>
        <Router>
          <Redirect push to={"/capstone/addEmployee"} />
          <Route exact path="/capstone/addEmployee" render={() => <AddEmployee token={this.props.token}  />} /></Router>
          </FadeIn>);
    } else if (this.state.openEmployee === "openViewEmployee") {
      return (<FadeIn>
        <Router>
          <Redirect push to={"/capstone/updateEmployee/" + this.state.employee.userName} />
          <Route exact path="/capstone/updateEmployee/:id" render={() => <ViewEmployee token={this.props.token} employee={this.state.employee} />} />

        </Router></FadeIn>
      );
    } else if (this.state.openEmployee === "employeeDetail") {
      return (<FadeIn>
        <Router>
          <Redirect push to={"/capstone/employeeDetail/" + this.state.employee.name} />
          <Route exact path="/capstone/employeeDetail/:id" render={() => <EmployeeDetail token={this.props.token} employee={this.state.employee} />} />

        </Router></FadeIn>
      );
    }
    else {
    if (this.props.myLoginReducer !== "logout") {

      var information = this.props.myLoginReducer.map((login, index) => {

        return (<FadeIn>
          <div style={{ height: "100vh" }}>
            {login.CreateAccount === true ? <Button type="primary" onClick={this.OpenAddEmployee} icon={<UserAddOutlined />}>Tạo nhân viên mới</Button> : null}
            <EmployeeSearch token={this.props.token} employeeList={this.state.employees} />
            <Table dataSource={this.props.newEmployee}
            loading={this.state.loading}
              rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} >
        
              <Column title="Họ" dataIndex="lastName" key="lastName"
                sorter={(a, b) => a.userName.localeCompare(b.lastName)}
                sortDirections={['descend', 'ascend']}
                render={(text, record) => (

                  <p>{text}</p>

                )} />
                      <Column title="Tên" dataIndex="firstName" key="firstName"
                sorter={(a, b) => a.userName.localeCompare(b.firstName)}
                sortDirections={['descend', 'ascend']}
                render={(text, record) => (
                  
                  <p>{text}</p>

                )} />
              <Column title="Chức vụ" dataIndex="roles"
              align="center"
              width="50px"
                sorter={(a, b) => a.roles[0].localeCompare(b.roles[0])}
                sortDirections={['descend', 'ascend']}
                key="roles"
                render={(text, record) => (

                  <p>{text}</p>

                )} />
              {/* <Column title="điện thoại" dataIndex="phone" key="phone" render={(text, record) => (
    
                  <a>{text}</a>
    
                )} />
                <Column title="email" dataIndex="email" key="email" render={(text, record) => (
    
                  <a>{text}</a>
    
                )} />
    
                <Column title="Địa chỉ" dataIndex="address" key="address" render={(text, record) => (
    
                  <b>{text}</b>
    
                )} /> */}

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
                {login.UpdateAccountPermission ?  <Column
                title="Quyền hạn"
                key="action"
                align="center"
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
              />: null}
             
              {login.ActiveDeactiveAccount === true ?
                <Column
                  title="Trạng thái"
                  dataIndex="status"
                  align="center"
                  key="status"
                  render={(text, record) => (
                    <Space size="middle">
                          {text === "Deactive" ? <Switch style={{ fontSize: '20px' }}   checkedChildren="Vô hiệu hóa" unCheckedChildren="kích hoạt" defaultunChecked /> : <Switch style={{ fontSize: '20px' }}   checkedChildren="Vô hiệu hóa" unCheckedChildren="kích hoạt" defaultChecked />}
                          {/* onChange={() => this.handleChangeS(record.id, text)} */}
                    </Space>
                  )}
                /> : null}</Table></div></FadeIn>
        );
      }

       )
    } if (this.props.myLoginReducer === "Logout") {


    }  return (<div>{ information }</div>); }

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

  console.log(state.myLoginReducer)
  return {
    newEmployee: state.myEmployeeReducer,
    myLoginReducer: state.myLoginReducer
  }



}
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList)