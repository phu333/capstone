import 'antd/dist/antd.css';
import { Table, Space, Button, Tag, Switch, message } from 'antd';
import TemplateUpload from '../Add/TemplateUpload';
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom'
import React from 'react';
import "../Column.css"
import ViewTemplate from '../Update/TemplateView'
import ContractTypeSearch from '../Search/ContractTypeSearch'
import { createContractType, contractTypeInformation } from '../../actions/ContractType'
import { connect } from 'react-redux'
import { UploadOutlined, FolderViewOutlined, DeleteOutlined, UserOutlined, FileWordOutlined } from "@ant-design/icons"
import axios from 'axios'
import FadeIn from 'react-fade-in'
const { Column } = Table;


class ContractTable extends React.Component {
  constructor() {
    super();

    this.state = {
      showTemplateCreate: false,
      viewTemplate: false,
      templateList: [],
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
          templateList: data.data
        })
        this.props.onSubmit(data.data)
      })
      .catch(error => {


      });



  }
  render() {
    

    if (this.state.showTemplateCreate) {
      return (<FadeIn>
        <Router>
          <Redirect push to={"/capstone/uploadTemplate"} />
          <Route exact path="/capstone/uploadTemplate" render={() => <TemplateUpload token={this.props.token} role={this.props.role} />} /></Router>
      </FadeIn>
      );
    } else if (this.state.showTemplateCreate) {
      return (<FadeIn>
        <Router>
          <Redirect push to={"/capstone/viewTemplate"} />
          <Route exact path="/capstone/viewTemplate" render={() => <ViewTemplate token={this.props.token} role={this.props.role} />} /></Router>
      </FadeIn>


      );
    } else if (this.state.showTemplateCreate) {
      return (
        <Router>
          <Redirect push to={"/capstone/viewTemplate"} />
          <Route exact path="/capstone/viewTemplate" render={() => <ViewTemplate token={this.props.token} role={this.props.role} />} /></Router>

      );
    }
    else {
      if (this.props.myLoginReducer !== "logout") {

        var information = this.props.myLoginReducer.map((login, index) => {
           
          return (<FadeIn>
            <div style={{ height: "100vh" }}>
              {login.UpdateTemplate === true ? <Button type="primary" onClick={this.handleChange} icon={<UploadOutlined />}>Tải lên mẫu mới</Button>
                : null}
              <ContractTypeSearch token={this.props.token} templateList={this.state.templateList} />
              <Table dataSource={this.props.newContractType}
             
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}  >
                <Column title="Stt"   key="index"
      render={(text, record, index) => index+1}
                />
                <Column title="Tên" dataIndex="name" key="name"
                  render={(text, record) => (

                    <p>{text}</p>

                  )}
                />
                {login.ActiveDeactiveTemplate === true ?
                  <Column
                    title="Chọn file khác"
                    key="Update"
                    align="center"
                    render={(text, record) => (
                      <Space size="middle">
                        <FolderViewOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={() => {
                          this.setState({
                            viewTemplate: !this.state.viewTemplate
                          })
                        }}></FolderViewOutlined>
                      </Space>
                    )}
                  /> : null}            {login.ActiveDeactiveCustomer === true ? 
                    <Column
                      title="Tác vụ"
                      dataIndex="status"
                      key="status"
                      align="center"
                      // sorter={(a, b) => a.status.localeCompare(b.status)}
                      // sortDirections={['descend', 'ascend']}
                      render={(text, record) => (
                        <Space size="middle">
                          {text === "Deactive" ? <Switch style={{ fontSize: '20px' }}  checkedChildren="Vô hiệu hóa" unCheckedChildren="kích hoạt"defaultunChecked  /> : <Switch style={{ fontSize: '20px' }} checkedChildren="Vô hiệu hóa" unCheckedChildren="kích hoạt" defaultChecked />}
                        </Space>
                      )}
                    />
        :null}
        
              </Table></div></FadeIn>
          );
        }

        )
      } if (this.props.myLoginReducer === "Logout") {


      } return (<div>{information}</div>);
    }

  }
}



var mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: (token) => {
      dispatch(createContractType(token))
    }
  }
}
var mapStateToProps = state => {


  return {
    newContractType: state.myContractTypeReducer,
    myLoginReducer: state.myLoginReducer
  }



}
export default connect(mapStateToProps, mapDispatchToProps)(ContractTable)