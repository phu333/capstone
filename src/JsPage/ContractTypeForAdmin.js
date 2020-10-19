import 'antd/dist/antd.css';
import { Table, Space,Button,Tag } from 'antd';
import TemplateUpload from './TemplateUpload';
import React from 'react';
import './Column.css'
import { createContractType, contractTypeInformation } from '../actions/ContractType'
import { connect } from 'react-redux'
import ContractTypeSearch from './ContractTypeSearch'
import { UploadOutlined, FileOutlined, DeleteOutlined,UserOutlined,FileWordOutlined } from "@ant-design/icons"
const { Column } = Table;


const dataSource = []
for (var i = 0; i < 1000; i++) {
  if (i % 2 == 0) {
    const contract = {
      key: i,
      contract_type: 'Hop dong lao dong',

      fileName: 'template1.dot',
      color: "#fff"
    }
    dataSource.push(contract)
  } else {
    const contract = {
      key: i,
      name: 'John',
      contract_type: 'Hop dong lao dong',

      fileName: 'template1.dot',
      color: "#ddd"
    }
    dataSource.push(contract)
  }


}
class ContractTypeForAdmin extends React.Component {
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

          fileName: 'template1.dot',
          status: "active"

        }
        const contract2 = {

          contract_type: 'Hop dong lao dong',

          fileName: 'template1.dot',
          status: "deactive"

        }
        
        this.props.onSubmit(contract1)
        this.props.onSubmit(contract2)
        
    }

}
  render() {
    if (this.state.showTemplateCreate) {
      
    } else {
      return (
        <div style={{height: "100vh"}}>
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
export default connect(mapStateToProps, mapDispatchToProps) (ContractTypeForAdmin)