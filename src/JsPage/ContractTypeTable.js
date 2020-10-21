import 'antd/dist/antd.css';
import { Table, Space, Button, Tag } from 'antd';
import TemplateUpload from './TemplateUpload';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import React from 'react';
import './Column.css'
import ContractTypeSearch from './ContractTypeSearch'
import { createContractType, contractTypeInformation } from '../actions/ContractType'
import { connect } from 'react-redux'
import { UploadOutlined, FileOutlined, DeleteOutlined, UserOutlined, FileWordOutlined } from "@ant-design/icons"
const { Column } = Table;



class ContractTable extends React.Component {
  constructor() {
    super();

    this.state = {
      showTemplateCreate: false
    };
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange() {
    this.setState({
      showTemplateCreate: true,
    })
  }
  componentDidMount() {

    if (this.props.newContractType.length === 0) {
      const contract1 = {

        contract_type: 'Hop dong lao dong',
        creator: "creator",
        createDate: "date",
        fileName: 'template1.dot',
        status: "active"

      }
      const contract2 = {

        contract_type: 'Hop dong lao dong',
        creator: "creator",
        createDate: "date",
        fileName: 'template1.dot',
        status: "deactive"

      }

      this.props.onSubmit(contract1)
      this.props.onSubmit(contract2)

    }

  }
  render() {
    if (this.state.showTemplateCreate) {
      return (
        <Router>
        <Redirect push to={"/capstone/uploadTemplate" } />
        <Route exact path="/capstone/uploadTemplate" component={TemplateUpload} /></Router>
       
      );
    } else {
      return (
        <div style={{ height: "100vh" }}><Button type="primary" onClick={this.handleChange} icon={<UploadOutlined />}>Tải lên mẫu mới</Button>
          <ContractTypeSearch />
          <Table dataSource={this.props.newContractType}
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}  >
            <Column title="Loại hợp đồng" dataIndex="contract_type" key="contract_type"
              render={(text, record) => (

                <a><FileOutlined />{text}</a>

              )}
            />

            <Column title="Tên file" dataIndex="fileName" key="fileName"
              render={(text, record) => (

                <b><FileWordOutlined />{text}</b>

              )}
            />
            <Column title="Người tạo" dataIndex="creator" key="creator"
              render={(text, record) => (

                <b>{text}</b>

              )}
            />
            <Column title="Ngày tạo" dataIndex="createDate" key="createDate"
              render={(text, record) => (

                <b>{text}</b>

              )}
            />
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
              title="Chọn file khác"
              key="Update"
              render={(text, record) => (
                <Space size="middle">
                  <UploadOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={this.handleChange}>Chọn file khác</UploadOutlined>
                </Space>
              )}
            />
            <Column
              title="Vô hiệu hóa"
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
    onSubmit: (contractType) => {
      dispatch(createContractType(contractType))
    }
  }
}
var mapStateToProps = state => {


  return {
    newContractType: state.myContractTypeReducer
  }



}
export default connect(mapStateToProps, mapDispatchToProps)(ContractTable)