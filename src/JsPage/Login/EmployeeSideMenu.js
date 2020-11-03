import 'antd/dist/antd.css';
import { Menu, Layout } from 'antd';
import { Breadcrumb, Avatar, Descriptions, Space, Tag, Affix, Button } from 'antd';
import React from 'react';
import { Badge } from 'antd';
import AddCompany from './AddCompany'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import Chart from './ChartProfile'
import { UserOutlined, ToolOutlined, NotificationOutlined, LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import ContractTable from '../Table/ContractTable'
import CustomerTable from '../Table/CustomerTable'
import ContractTypeTable from '../Table/ContractTypeTable'
import UpdateProfile from '../Update/UpdateProfile'
import UpdateProfileCompany from '../Update/UpdateProfileCompany'
import EmployeeTable from '../Table/EmployeeTable'
import SignatureList from '../Table/SignatureList'
import Header from '../Login/Header'
import { createFromIconfontCN } from '@ant-design/icons';
import { connect } from 'react-redux'
import "../Column.css"

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart (overrided)
    '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
  ],
});
const { SubMenu } = Menu;
const { Content, Sider } = Layout;
class EmployeeSideMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      showComponent: "Chart",
      collapsed: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  handleClick = e => {

    this.setState({
      showComponent: e.key
    })

  };
  // componentDidMount() {
  //   return (<Router>
  //     <Redirect push to="/capstone/SideMenu" />

  //     <Route exact path="/capstone/SideMenu" component={EmployeeSideMenu} />
  //   </Router>);
  // }
  render() {

    if (this.props.myLoginReducer !== "logout") {

      var information = this.props.myLoginReducer.map((login, index) => {
        return (

          <Layout style={{ height: "100vh" }}>

            <Layout style={{ height: "100vh" }}>

              <Sider width={250} className="site-layout-background"
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={() => this.setState({
                  collapsed: !this.state.collapsed
                })}
                style={{
                  overflow: "auto",
                  height: "100vh",
                  position: "sticky",
                  top: 0,
                  left: 0
                }}
              >

                <IconFont type="icon-javascript" style={{ fontSize: '60px', color: '#08c', marginLeft: "40%" }} />


                <Menu
                  onClick={this.handleClick}
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={this.state.collapsed}
                >
                  <SubMenu key="sub1" icon={<ToolOutlined />} title="Quản lý">
                    {login.companyId !== null ? <>
                      <Menu.Item active={true} key="Chart">Xem doanh thu</Menu.Item>
                      {login.contractManagePermision === true ? <Menu.Item key="contract">danh sách hợp đồng</Menu.Item> : null}
                      {login.customerManagePermission === true ? <Menu.Item key="customerList">danh sách khách hàng</Menu.Item> : null}
                      {login.contractTypeManagePermission === true ? <Menu.Item key="contractType">danh sách loại hợp đồng</Menu.Item> : null}
                      {login.employeeManagePermission === true ? <Menu.Item key="employee">Nhân viên</Menu.Item> : null}
                      {login.signatureManagePermission === true ? <Menu.Item key="signatureList">Danh sách chữ ký</Menu.Item> : null} </> : <Menu.Item key="addCompany">Tạo doanh nghiệp</Menu.Item>}








                  </SubMenu>
                  <SubMenu key="sub2" icon={<UserOutlined />} title="Thông tin cá nhân">

                    {login.companyId !== null ? <>
                      {login.editCompanyInformationPermission === true ? <Menu.Item key="companyProfile">Thông tin công ty</Menu.Item> : null} </> : null}
                    <Menu.Item key="profile">Thông tin cá nhân</Menu.Item>

                  </SubMenu>
                  {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                  </Button> */}
                </Menu>

              </Sider>
              <Layout style={{ padding: "0 24px 24px", height: "110vh" }}>
                <Affix >

                  <Header></Header>
                </Affix>


                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>{this.state.showComponent}</Breadcrumb.Item>

                </Breadcrumb>





                <Content style={{
                  padding: 24,
                  margin: 0,
                  minHeight: "100vh",
                  maxHeight:"100%",
                  
                }}>
                  {login.companyId !== null ? <>
                    {this.state.showComponent === "Chart" ?
                      <Router>
                        <Redirect push to={"/capstone/" + this.state.showComponent} />
                        <Route exact path="/capstone/Chart" component={Chart} />
                      </Router>
                      : null}
                    {this.state.showComponent === "customerList" ?
                      <Router>
                        <Redirect push to={"/capstone/" + this.state.showComponent} />
                        <Route exact path="/capstone/customerList" component={CustomerTable} />
                      </Router>
                      : null}
                    {this.state.showComponent === "contract" ?
                      <Router>
                        <Redirect push to={"/capstone/" + this.state.showComponent} />
                        <Route exact path="/capstone/contract" render={() => <ContractTable role={login.signPermission} />
                        } /></Router> : null}
                    {this.state.showComponent === "contractType" ?
                      <Router>
                        <Redirect push to={"/capstone/" + this.state.showComponent} />
                        <Route exact path="/capstone/contractType" component={ContractTypeTable} /></Router> : null}
                    {this.state.showComponent === "employee" ?
                      <Router>
                        <Redirect push to={"/capstone/" + this.state.showComponent} />
                        <Route exact path="/capstone/employee" component={EmployeeTable} /></Router> : null}
                    {this.state.showComponent === "signatureList" ?
                      <Router>
                        <Redirect push to={"/capstone/" + this.state.showComponent} />
                        <Route exact path="/capstone/signatureList" component={SignatureList} /></Router> : null}
                    {this.state.showComponent === "companyProfile" ?
                      <Router>
                        <Redirect push to={"/capstone/" + this.state.showComponent} />
                        <Route exact path="/capstone/companyProfile" component={UpdateProfileCompany} /></Router> : null}
                  </> : <Router>
                      <Redirect push to={"/capstone/addCompany"} />
                      <Route exact path="/capstone/companyProfile" component={AddCompany} /></Router>}





                  {this.state.showComponent === "profile" ?
                    <Router>
                      <Redirect push to={"/capstone/" + this.state.showComponent} />
                      <Route exact path="/capstone/profile" component={UpdateProfile} /></Router> : null}




                </Content>


              </Layout>
            </Layout>
          </Layout>
        );
      })

      if (this.props.myLoginReducer === "Logout") {


      } else {
        return (<div style={{ height: "100vh" }}> {information}</div >);
      }
    } else {

    }


  }
}
var mapStateToProps = state => {
  console.log(state.myLoginReducer)
  return {
    myLoginReducer: state.myLoginReducer
  }
}
export default connect(mapStateToProps, null)(EmployeeSideMenu);