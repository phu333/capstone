import 'antd/dist/antd.css';
import { Table, Button, Space, Tag } from 'antd';
import ContractSearch from './ContractSearch'
import './Column.css'
import {
    EyeOutlined, DeleteOutlined, FormOutlined, FileAddOutlined, UploadOutlined, ContainerOutlined,
    UsergroupAddOutlined, UserSwitchOutlined, UserAddOutlined, LogoutOutlined, MonitorOutlined
} from "@ant-design/icons"
import ChooseContractTemplate from './ChooseContractTemplate'
import ViewContractPage from './ViewContractPage'
import React, { Component } from 'react';
import { createContract, contractInformation } from '../actions/ContractAction'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
const { Column } = Table;


const dataSource = []
// for (var i = 0; i < 5; i++) {

//     const contract = {

//         contract_name: 'Hop dong lao dong',
//         status: "pending",
//         ben_tao_hd: 'HiSign',
//         ben_tham_gia: 'cty 369',
//         nguoi_tao_hd: "Nguyen Ngoc Phu",
//         deadline: "12/12/2022",

//     }
//     dataSource.push(contract)




// }

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
            const contract1 = {

                contract_name: 'Hop dong lao dong',
                status: "deactive",
                ben_tao_hd: 'HiSign',
                ben_tham_gia: 'cty 369',
                nguoi_tao_hd: "Nguyen Ngoc Phu",
                deadline: "12/12/2022",

            }
            const contract2 = {

                contract_name: 'Hop dong lao dong',
                status: "waiting for customer",
                ben_tao_hd: 'HiSign',
                ben_tham_gia: 'cty 369',
                nguoi_tao_hd: "Nguyen Ngoc Phu",
                deadline: "12/12/2022",

            }
            const contract3 = {

                contract_name: 'Hop dong lao dong',
                status: "pending",
                ben_tao_hd: 'HiSign',
                ben_tham_gia: 'cty 369',
                nguoi_tao_hd: "Nguyen Ngoc Phu",
                deadline: "12/12/2022",

            }
            const contract4 = {

                contract_name: 'Hop dong lao dong',
                status: "active",
                ben_tao_hd: 'HiSign',
                ben_tham_gia: 'cty 369',
                nguoi_tao_hd: "Nguyen Ngoc Phu",
                deadline: "12/12/2022",

            }
            const contract5 = {

                contract_name: 'Hop dong mua ban',
                status: "waiting for sign",
                ben_tao_hd: 'cty 369',
                ben_tham_gia: 'HiSign',
                nguoi_tao_hd: "AAA",
                deadline: "12/12/2022",

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
                <ChooseContractTemplate role={this.props.role} />
            );
        } else if (this.state.showContract) {
            return (
                <ViewContractPage contract={this.state.contract} role={this.props.role} />
            );
        }
        else {

            return (
                <div style={{height: "100vh"}}>
                    <Space size="large">
                        <Button type="primary" icon={<FileAddOutlined />} onClick={this.onOpenCreateContract}>Tạo hợp đồng</Button>
                        <Button type="primary" icon={<UploadOutlined />} >Tải lên hợp đồng</Button>
                    </Space>
                    <ContractSearch />
                    <Table dataSource={this.props.newContract}
                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}>
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
                        render={(text, record) => (

                            <b>{text}</b>

                        )} />
                        <Column title="bên tạo hợp đồng" dataIndex="ben_tao_hd" key="ben_tao_hd"
                        render={(text, record) => (

                            <b>{text}</b>

                        )} />
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