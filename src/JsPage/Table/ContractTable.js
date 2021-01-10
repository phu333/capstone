import 'antd/dist/antd.css';
import { Table, Button, Space, Tag, message } from 'antd';
import ContractSearch from '../Search/ContractSearch'
import "../Column.css"
import axios from 'axios'
import {
    FolderViewOutlined, DownloadOutlined, FormOutlined, FileAddOutlined, UploadOutlined, ContainerOutlined,
    FileProtectOutlined, UserSwitchOutlined, UserAddOutlined, LogoutOutlined, MonitorOutlined
} from "@ant-design/icons"
import ChooseContractTemplate from '../Add/ChooseContractTemplate'
import ViewContractPage from '../Update/ViewContractPage'
import React, { Component } from 'react';
import { createContract, contractInformation } from '../../actions/ContractAction'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
const { Column } = Table;


const dataSource = []
var hash = require('object-hash')

class ContractTable extends Component {
    constructor() {
        super();

        this.state = {
            showCreateContract: false,
            showContract: false,
            contract: {},
            contractsCreate: [],
            contractsReciceve: [],
            contractsTotal: [],
            company:{},
        };
        this.onOpenCreateContract = this.onOpenCreateContract.bind(this);
        this.viewContract = this.viewContract.bind(this);
        this.Donwload = this.Donwload.bind(this);


    }
    componentDidMount() {
        axios({
            url: '/api/v1/Company/info',
            method: "PUT",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            }
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                this.setState({
                    company: data.data
                })
                console.log(data.data.taxCode)
                axios({
                    url: '/api/v1/Contract/get-by-taxcode?taxCode='+data.data.taxCode,
                    method: "GET",
                    headers: {
                        Authorization: 'Bearer ' + this.props.token,
        
                    }
                })
                    .then((response) => {
        
                        return response.data;
                    })
                    .then((data) => {
                        console.log(data)
                        this.setState({
                            contractsReciceve: data.data
                        })
                        axios({
                            url: '/api/v1/Contract',
                            method: "GET",
                            headers: {
                                Authorization: 'Bearer ' + this.props.token,
                
                            }
                        })
                            .then((response) => {
                
                                return response.data;
                            })
                            .then((data) => {
                                console.log(data)
                                this.setState({
                                    contractsCreate: data.data,
                                    
                                })
                                this.setState({
                                   
                                    contractsTotal: [...this.state.contractsCreate,...this.state.contractsReciceve]
                                })
                            })
                
                            .catch(error => {
                
                
                            });
                    })
        
                    .catch(error => {
        
        
                    });
                
            })
            .catch(error => {
                console.log(error)


            });

            



    }
    Donwload(text){
        if (this.state.company.id !== undefined) {
            axios({
                url: "https://localhost:44338/api/Signature/PostContract",
                method: "POST",
                data: {
                    Info: this.state.company.taxCode,

                }
            })
                .then((response) => {


                })
                .then((data) => {

                })
                .catch(error => {
                    console.log(error)


                });
            if (text.fileUrl === null) {
                axios({
                    url: '/api/v1/Contract/export-docx/' + text.id,
                    method: "GET",
                    headers: {
                        Authorization: 'Bearer ' + this.props.token,
                        'Content-Type': 'application/json',
                        'Accept': 'application/docx'
                    },
                    responseType: 'arraybuffer',

                })
                    .then((response) => {
                        console.log(response)
                        var fileDownload = require('js-file-download');
                        fileDownload(response.data, text.id + '.docx');
                        return response.data;
                    })
                    .then((data) => {
                        console.log(data.data)

                    })
                    .catch(error => {
                        console.log(error)


                    });
            } else {
                window.open(text.fileUrl, "_blank")
                
            }
        } else {
           
        }
    }
    onOpenCreateContract() {
        this.setState({
            showCreateContract: true
        })
    }
    viewContract() {

        this.setState({

            showContract: true
        })
    }
    render() {

        console.log(this.state.contractsTotal)

        if (this.state.showCreateContract) {
            return (
                <Router>
                    <Redirect push to={"/capstone/chooseTemplate"} />
                    <Route exact path="/capstone/chooseTemplate" render={() => <ChooseContractTemplate token={this.props.token} role={this.props.role} />
                    } /></Router>

            );
        } else if (this.state.showContract) {
            return (
                <Router>
                    <Redirect push to={"/capstone/viewContract/" + hash.sha1(this.state.contract.id)} />
                    <Route exact path="/capstone/viewContract/:id" render={() => <ViewContractPage contract={this.state.contract} token={this.props.token} role={this.props.role} />
                    } /></Router>

            );
        }
        else {

            return (
                <div >
                    <Space size="large">
                        <Button type="primary" icon={<FileAddOutlined />} onClick={this.onOpenCreateContract}>Tạo hợp đồng</Button>
                        <Button type="primary" icon={<UploadOutlined />} >Tải lên hợp đồng</Button>
                    </Space>
                    <ContractSearch />
                    <Table dataSource={this.state.contractsTotal}
                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}>
                        <Column title="Mã hợp đồng" dataIndex="contractNum" key="contractNum"
                            render={(text, record) => (
                                <a> {text}</a>
                            )}
                        />
                        <Column title="Tên hợp đồng" dataIndex="contractTitle" key="contractTitle"
                            render={(text, record) => (

                                <a>{text}</a>

                            )}
                        />

                        <Column title="Bên B" dataIndex="customer" key="customer"
                            render={(text, record) => (

                                <p>{text.companyName}</p>

                            )} />
                        {/* <Column title="Ngày hết hạn" dataIndex="contractExpiredDate" key="contractExpiredDate"
                            sorter={(a, b) => a.deadline.localeCompare(b.deadline)}
                            sortDirections={['descend', 'ascend']}
                            render={(text, record) => (

                                <p>{text}</p>

                            )} /> */}
                        {/* <Column title="bên tạo hợp đồng" dataIndex="ben_tao_hd" key="ben_tao_hd"
                            render={(text, record) => (

                                <p>{text}</p>

                            )} /> */}
                        <Column title="Giá trị hợp đồng" dataIndex="contractValue" key="contractValue"
                            render={(text, record) => (

                                <p>{text}</p>

                            )} />
                        <Column title="Trạng thái" dataIndex="statusAsString" key="statusAsString"
                            sorter={(a, b) => a.status.localeCompare(b.status)}
                            sortDirections={['descend', 'ascend']}
                            render={(text, record) => {
                                let color = 'pink'
                                if (text === 'Deactive') {
                                    color = 'red'
                                } else if (text === 'Active') {
                                    color = 'green'
                                } else if (text === 'Draft') {
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

                                <FolderViewOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={
                                    () => this.setState({
                                        contract: text,
                                        showContract: true
                                    })
                                } />

                            )}
                        />
                        {/* <Column
                            title="Vô hiệu hóa"
                            key="action"
                            render={(text, record) => (

                                <DeleteOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={this.viewContract} />

                            )}
                        /> */}
                        <Column
                            title="Tải về"
                            key="action"
                            render={(text, record) => (

                                <DownloadOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={
                                    () =>this.Donwload(text)
                                } />

                            )}
                        /> 

                    </Table></div>
            );
        }

    }
}
var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (contract) => {
            dispatch(createContract(contract))
        }
    }
}
var mapStateToProps = state => {


    return {
        newContract: state.myContractReducer
    }



}
export default connect(mapStateToProps, mapDispatchToProps)(ContractTable)