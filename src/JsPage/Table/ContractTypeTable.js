import { EyeOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Space, Table } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { createContractType } from '../../actions/ContractType';
import TemplateUpload from '../Add/TemplateUpload';
import "../Column.css";
import ContractTypeSearch from '../Search/ContractTypeSearch';
import ViewTemplate from '../Update/TemplateView';
const { Column } = Table;



class ContractTable extends React.Component {
  constructor() {
    super();

    this.state = {
      showTemplateCreate: false,
      viewTemplate:false,
      templateList:[],
    };
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange() {
    this.setState({
      showTemplateCreate: !this.state.showTemplateCreate,
    })
  }
  componentDidMount() {

   
      axios({
        url: '/api/v1/ContractType',
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
              templateList:data.data
            })

        })
        .catch(error => {

           
        });
      
    

  }
  render() {
    if (this.state.showTemplateCreate) {
      return (
        <Router>
        <Redirect push to={"/capstone/uploadTemplate" } />
        <Route exact path="/capstone/uploadTemplate" render={() => <TemplateUpload token={this.props.token} role={this.props.role} />} /></Router>
       
      );
    }else if (this.state.showTemplateCreate) {
      return (
        <Router>
        <Redirect push to={"/capstone/viewTemplate" } />
        <Route exact path="/capstone/viewTemplate" render={() => <ViewTemplate token={this.props.token} role={this.props.role} />} /></Router>
       
      );
    } 
    else {
      return (

        <div style={{ height: "100vh" }}>
          <br />
        <Button type="primary" onClick={this.handleChange} icon={<UploadOutlined />}>Tải lên mẫu mới</Button>

          <ContractTypeSearch />
          <Table dataSource={this.state.templateList}
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}  >
           <Column title="mã" dataIndex="id" key="id"
            sorter={(a, b) => a.contract_type.localeCompare(b.contract_type)}
            sortDirections={['descend', 'ascend']}
              render={(text, record) => (

                <b>{text}</b>

              )}
            />

            <Column title="tên" dataIndex="name" key="name"
              render={(text, record) => (

                <b>{text}</b>

              )}
            />
            
            
           

            <Column
              title="Chọn file khác"
              key="Update"
              render={(text, record) => (
                <Space size="middle">
                  <EyeOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={()=>{
                    this.setState({
                      viewTemplate : !this.state.viewTemplate
                    })
                  }}></EyeOutlined>
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