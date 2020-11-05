import 'antd/dist/antd.css';
import { Table, Space, Button, Tag,Switch,message } from 'antd';
import TemplateUpload from '../Add/TemplateUpload';
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom'
import React from 'react';
import "../Column.css"
import ViewTemplate from '../Update/TemplateView'
import ContractTypeSearch from '../Search/ContractTypeSearch'
import { createContractType, contractTypeInformation } from '../../actions/ContractType'
import { connect } from 'react-redux'
import { UploadOutlined, EyeOutlined, DeleteOutlined, UserOutlined, FileWordOutlined } from "@ant-design/icons"
import axios from 'axios'
const { Column } = Table;



class ContractTable extends React.Component {
  constructor() {
    super();

    this.state = {
      showTemplateCreate: false,
      viewTemplate:false,
    };
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange() {
    this.setState({
      showTemplateCreate: !this.state.showTemplateCreate,
    })
  }
  componentDidMount() {

    if (this.props.newContractType.length === 0) {
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

        contract_type: 'Hop dong lao dong',
        link: "creator",
        createDate: "12/11/2018",
        fileName: 'template1.dot',
        status: "active"

      }
      const contract2 = {

        contract_type: 'Hop dong lao dong',
        link: "creator",
        createDate: "12/12/2019",
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
    }else if (this.state.showTemplateCreate) {
      return (
        <Router>
        <Redirect push to={"/capstone/viewTemplate" } />
        <Route exact path="/capstone/viewTemplate" component={ViewTemplate} /></Router>
       
      );
    } 
    else {
      return (
        <div style={{ height: "100vh" }}><Button type="primary" onClick={this.handleChange} icon={<UploadOutlined />}>Tải lên mẫu mới</Button>
          <ContractTypeSearch />
          <Table dataSource={this.props.newContractType}
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}  >
           <Column title="Tên mẫu" dataIndex="contract_type" key="contract_type"
            sorter={(a, b) => a.contract_type.localeCompare(b.contract_type)}
            sortDirections={['descend', 'ascend']}
              render={(text, record) => (

                <b>{text}</b>

              )}
            />

            <Column title="link" dataIndex="link" key="link"
              render={(text, record) => (

                <b>{text}</b>

              )}
            />
            
            
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
            <Column
              title="Vô hiệu hóa"
              dataIndex="status"
              key="status"
              render={(text, record) => (
                
                <Space size="middle">
                  {text === "active" ? <Switch style={{ fontSize: '30px' }} checkedChildren="kích hoạt" unCheckedChildren="Vô hiệu hóa" defaultChecked /> : <Switch style={{ fontSize: '30px' }} checkedChildren="kích hoạt" unCheckedChildren="Vô hiệu hóa" defaultunChecked />}
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