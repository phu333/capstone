import 'antd/dist/antd.css';
import { Menu, Layout } from 'antd';
import { PageHeader, Avatar, Descriptions, Space, Tag, Affix, Button } from 'antd';
import React from 'react';
import { Badge } from 'antd';
import UpdateProfileCompany from './UpdateProfileCompany'
import EmployeeTable from './EmployeeTable'
import { BrowserRouter as Router, Route, Switch, Redirect,useHistory } from 'react-router-dom'
import SignatureList from './SignatureList'
import { UserOutlined, ToolOutlined, NotificationOutlined, LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import ContractTable from './ContractTable'
import CustomerTable from './CustomerTable'
import ContractTypeTable from './ContractTypeTable'
import UpdateProfile from './UpdateProfile'
import Header from './Header'
import { createFromIconfontCN } from '@ant-design/icons';
import { connect } from 'react-redux'
import './Column.css'
import LoginPage from './Login/LoginPage'
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
      showComponent: "",
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

  render() {
    console.log(this.props.myLoginReducer)
    if (this.props.myLoginReducer !== "logout") {
      console.log(this.props.myLoginReducer)
      var information = this.props.myLoginReducer.map((login, index) => {
        return (

          <Layout style={{ height: "100vh" }}>

            <Layout style={{ height: "100vh" }}>

              <Sider width={250} className="site-layout-background">

                <IconFont type="icon-javascript" style={{ fontSize: '60px', color: '#08c', marginLeft: "40%" }} />
                <Descriptions size="small" column={2}   >

                  <Descriptions.Item><Avatar size={70} icon={<UserOutlined />} /> </Descriptions.Item>



                  <Descriptions.Item><br />
                    <b style={{ color: ' white' }}>{login.username}</b><br />

                    <b style={{ color: ' white' }}>Company ABC</b>
                  </Descriptions.Item>

                </Descriptions>
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                  {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
                <Menu
                  onClick={this.handleClick}
                  title={[]}
                  mode="inline"
                  theme="dark"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ height: "100%", borderRight: 0 }}
                  inlineCollapsed={this.state.collapsed}
                >
                  <SubMenu key="sub1" icon={<ToolOutlined />} title="Quản lý">
                    {login.contractManagePermision === true ? <Menu.Item key="contract">danh sách hợp đồng</Menu.Item> : null}
                    {login.customerManagePermission === true ? <Menu.Item key="customerList">danh sách khách hàng</Menu.Item> : null}
                    {login.contractTypeManagePermission === true ? <Menu.Item key="contractType">danh sách loại hợp đồng</Menu.Item> : null}
                    {login.employeeManagePermission === true ? <Menu.Item key="employee">Nhân viên</Menu.Item> : null}
                    {login.signatureManagePermission === true ? <Menu.Item key="signatureList">Danh sách chữ ký</Menu.Item> : null}







                  </SubMenu>
                  <SubMenu key="sub2" icon={<UserOutlined />} title="Thông tin cá nhân">


                    <Menu.Item key="profile">Thông tin cá nhân</Menu.Item>
                    {login.editCompanyInformationPermission === true ? <Menu.Item key="companyProfile">Thông tin công ty</Menu.Item> : null}
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout style={{ padding: "0 24px 24px", height: "100vh" }}>
                <Affix onChange={(affixed) => console.log(affixed)}>
                  <Header></Header>
                </Affix>











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
                {this.state.showComponent === "profile" ?
                  <Router>
                    <Redirect push to={"/capstone/" + this.state.showComponent} />
                    <Route exact path="/capstone/profile" component={UpdateProfile} /></Router> : null}
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