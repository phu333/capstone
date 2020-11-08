import 'antd/dist/antd.css';
import { Table, Button, Space, Tag,Popover } from 'antd';
import ContractSearch from '../Search/ContractSearch'
import "../Column.css"
import {
    FolderViewOutlined, FileExcelOutlined, FormOutlined, FileAddOutlined, UploadOutlined, ContainerOutlined,
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
            const contract1 = {
                id: 'se123',
                contract_name: 'Hop dong lao dong',
                status: "deactive",
                ben_tao_hd: 'HiSign',
                ben_tham_gia: 'cty 369',
                nguoi_tao_hd: "Nguyen Ngoc Phu",
                deadline: "12/12/2022",

            }
            const contract2 = {
                id: 'se456',
                contract_name: 'Hop dong lao dong',
                status: "waiting for customer",
                ben_tao_hd: 'HiSign',
                ben_tham_gia: 'cty 369',
                nguoi_tao_hd: "Nguyen Ngoc Phu",
                deadline: "12/12/2022",

            }
            const contract3 = {
                id: 'se789',
                contract_name: 'Hop dong lao dong',
                status: "pending",
                ben_tao_hd: 'HiSign',
                ben_tham_gia: 'cty 369',
                nguoi_tao_hd: "Nguyen Ngoc Phu",
                deadline: "12/12/2022",

            }
            const contract4 = {
                id: 'sb123',
                contract_name: 'Hop dong lao dong',
                status: "active",
                ben_tao_hd: 'HiSign',
                ben_tham_gia: 'cty 369',
                nguoi_tao_hd: "Nguyen Ngoc Phu",
                deadline: "12/12/2022",

            }
            const contract5 = {
                id: 'sb456',
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
        const content = (
            <div style={{display:"inline-block"}}>
               <span> <Button
                    title="Xem chi tiết"
                    key="action"
                    onClick={
                        () => this.setState({
                            
                            showContract: true
                        })
                    }
                ><FolderViewOutlined/> Xem chi tiết</Button></span>
                <span><Button
                    title="Vô hiệu hóa"
                    key="action"
                    onClick={this.viewContract}
                    
                ><FileExcelOutlined /> Vô hiệu hóa</Button></span>
                 <span><Button
                    title="Ký"
                    key="action"
                    onClick={this.viewContract}
                ><FormOutlined /> Ký</Button> 
</span>
            </div>
        );


        if (this.state.showCreateContract) {
            return (
                <Router>
                    <Redirect push to={"/capstone/chooseTemplate"} />
                    <Route exact path="/capstone/chooseTemplate" render={() => <ChooseContractTemplate role={this.props.role} />
                    } /></Router>

            );
        } else if (this.state.showContract) {
            return (
                <Router>
                    <Redirect push to={"/capstone/viewContract/" + this.state.contract.id} />
                    <Route exact path="/capstone/viewContract/:id" render={() => <ViewContractPage contract={this.state.contract} role={this.props.role} />
                    } /></Router>

            );
        }
        else {

            return (
                <div style={{ height: "100vh" }}>
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

                                <a><ContainerOutlined /> {text}</a>

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
                            title="Action"
                            key="action"
                            render={(text, record) => (

                               <Popover content={content} title="please chose your action">
                                <Button type="primary">Action</Button>
                            </Popover>
                             ) } />

                            
                        

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