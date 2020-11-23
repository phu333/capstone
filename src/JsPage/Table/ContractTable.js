import 'antd/dist/antd.css';
import { Table, Button, Space, Tag,message } from 'antd';
import ContractSearch from '../Search/ContractSearch'
import "../Column.css"
import axios from 'axios'
import {
    EyeOutlined, DeleteOutlined, FormOutlined, FileAddOutlined, UploadOutlined, ContainerOutlined,
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


class ContractTable extends Component {
    constructor() {
        super();

        this.state = {
            showCreateContract: false,
            showContract: false,
            contract: {}
        };
        this.onOpenCreateContract = this.onOpenCreateContract.bind(this);
        this.viewContract = this.viewContract.bind(this);



    }
    componentDidMount() {

        if (this.props.newContract.length === 0) {
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
                id: 1,
                contract_name: 'Hop dong lao dong',
                status: "deactive",
                ben_tao_hd: 'HiSign',
                ben_tham_gia: 'cty 369',
                nguoi_tao_hd: "Nguyen Ngoc Phu",
                deadline: "12/12/2022",
                contractValue:1000000,
            }
            const contract2 = {
                id: 2,
                contract_name: 'Hop dong lao dong',
                status: "waiting for customer",
                ben_tao_hd: 'HiSign',
                ben_tham_gia: 'cty 369',
                nguoi_tao_hd: "Nguyen Ngoc Phu",
                deadline: "12/12/2022",
                contractValue:1000000,
            }
            const contract3 = {
                id: 3,
                contract_name: 'Hop dong lao dong',
                status: "pending",
                ben_tao_hd: 'HiSign',
                ben_tham_gia: 'cty 369',
                nguoi_tao_hd: "Nguyen Ngoc Phu",
                deadline: "12/12/2022",
                contractValue:1000000,
            }
            const contract4 = {
                id: 4,
                contract_name: 'Hop dong lao dong',
                status: "active",
                ben_tao_hd: 'HiSign',
                ben_tham_gia: 'cty 369',
                nguoi_tao_hd: "Nguyen Ngoc Phu",
                deadline: "12/12/2022",
                contractValue:1000000,
            }
            const contract5 = {
                id: 5,
                contract_name: 'Hop dong mua ban',
                status: "waiting for sign",
                ben_tao_hd: 'cty 369',
                ben_tham_gia: 'HiSign',
                nguoi_tao_hd: "AAA",
                deadline: "12/12/2022",
                contractValue:1000000,
            }
            this.props.onSubmit(contract1)
            this.props.onSubmit(contract2)
            this.props.onSubmit(contract3)
            this.props.onSubmit(contract4)
            this.props.onSubmit(contract5)
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
                    <Redirect push to={"/capstone/viewContract/" + this.state.contract.id} />
                    <Route exact path="/capstone/viewContract/:id" render={() => <ViewContractPage token={this.props.token} role={this.props.role} />
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
                    <Table dataSource={this.props.newContract}
                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}>
                        <Column title="Mã hợp đồng" dataIndex="id" key="id"
                            render={(text, record) => (
                                <a><FileProtectOutlined /> {text}</a>
                            )}
                        />
                        <Column title="tên hợp đồng" dataIndex="contract_name" key="contract_name"
                            render={(text, record) => (

                                <a><ContainerOutlined />{text}</a>

                            )}
                        />

                        <Column title="bên đối tác" dataIndex="ben_tham_gia" key="ben_tham_gia"
                            render={(text, record) => (

                                <b>{text}</b>

                            )} />
                        <Column title="Ngày hết hạn" dataIndex="deadline" key="deadline"
                            sorter={(a, b) => a.deadline.localeCompare(b.deadline)}
                            sortDirections={['descend', 'ascend']}
                            render={(text, record) => (

                                <b>{text}</b>

                            )} />
                        <Column title="bên tạo hợp đồng" dataIndex="ben_tao_hd" key="ben_tao_hd"
                            render={(text, record) => (

                                <b>{text}</b>

                            )} />
                        <Column title="giá trị hợp đồng" dataIndex="contractValue" key="contractValue"
                            render={(text, record) => (

                                <b>{text}</b>

                            )} />
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
                            title="Xem chi tiết"
                            key="action"
                            render={(text, record) => (

                                <EyeOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={
                                    () => this.setState({
                                        contract: text,
                                        showContract: true
                                    })
                                } />

                            )}
                        />
                        <Column
                            title="Vô hiệu hóa"
                            key="action"
                            render={(text, record) => (

                                <DeleteOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={this.viewContract} />

                            )}
                        />
                        {this.props.role === true ? <Column
                            title="Ký"
                            key="action"
                            render={(text, record) => (

                                <FormOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={this.viewContract} />

                            )}
                        /> : null}

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