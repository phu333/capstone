import 'antd/dist/antd.css';
import { Table, Button,Tag } from 'antd';
import ContractSearch from './ContractSearch'
import { EyeOutlined,DeleteOutlined, FormOutlined, FileAddOutlined,ContainerOutlined } from "@ant-design/icons"
import AddContractExtension from './AddContractExtension'
import UpdateContractExtension from './UpdateContractExtension'
import React from 'react';
import { createcontractExtension, contractExtensionInformation } from '../actions/ContractExtension'
import { connect } from 'react-redux'
const { Column } = Table;


class ContractExtensionTable extends React.Component {
    constructor() {
        super();

        this.state = {
            showCreateContractExtension: false,
            showContractExtension: false,
            contract :{},
            
        };

        this.onOpenCreateContractExtension = this.onOpenCreateContractExtension.bind(this);
        this.viewContractExtension = this.viewContractExtension.bind(this);
    }
    componentDidMount() {

        if (this.props.newContractExtension.length === 0) {
            const contract1 = {

                contract_type: 'Hop dong lao dong',
                    status: "active",
                    ben_tao_hd: 'HiSign',
                    ben_tham_gia: 'cty 369',
                    nguoi_tao_hd: "Nguyen Ngoc Phu",
                    deadline: "12/12/2022",

            }
            const contract2 = {

                contract_type: 'Hop dong lao dong',
                    status: "deactive",
                    ben_tao_hd: 'HiSign',
                    ben_tham_gia: 'cty 369',
                    nguoi_tao_hd: "Nguyen Ngoc Phu",
                    deadline: "12/12/2022",

            }
            const contract3 = {

                contract_type: 'Hop dong lao dong',
                    status: "pending",
                    ben_tao_hd: 'HiSign',
                    ben_tham_gia: 'cty 369',
                    nguoi_tao_hd: "Nguyen Ngoc Phu",
                    deadline: "12/12/2022",

            }
            const contract4 = {

                contract_type: 'Hop dong lao dong',
                    status: "waiting for customer",
                    ben_tao_hd: 'HiSign',
                    ben_tham_gia: 'cty 369',
                    nguoi_tao_hd: "Nguyen Ngoc Phu",
                    deadline: "12/12/2022",

            }
            this.props.onSubmit(contract1)
            this.props.onSubmit(contract2)
            this.props.onSubmit(contract3)
            this.props.onSubmit(contract4)
        }

    }
    onOpenCreateContractExtension() {
        this.setState({
            showCreateContractExtension: true
        })

    }
    viewContractExtension() {
        this.setState({
            showContractExtension: true
        })
    }
    render() {
        if (this.state.showCreateContractExtension) {
            return (
                <AddContractExtension role={this.props.role} />

            );
        } else if (this.state.showContractExtension) {
            return (
                <UpdateContractExtension contract={this.state.contract} role={this.props.role} />

            );
        }
        else {
            return (
                <div style={{height: "100vh"}}><Button type="primary" icon={<FileAddOutlined />} onClick={this.onOpenCreateContractExtension}>Tạo phụ lục</Button>
                    <ContractSearch />
                    <Table dataSource={this.props.newContractExtension}
                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}>
                        <Column title="tên phụ lục" dataIndex="contract_type" key="contract_type"
                            render={(text, record) => (

                                <a><ContainerOutlined />{text}</a>

                            )}
                        />

                        <Column title="bên đối tác" dataIndex="ben_tham_gia" key="ben_tham_gia"
                        render={(text, record) => (

                            <b>{text}</b>

                        )} />
                        <Column title="bên tạo " dataIndex="ben_tao_hd" key="ben_tao_hd"
                        render={(text, record) => (

                            <b>{text}</b>

                        )} />
                        <Column title="người tạo " dataIndex="nguoi_tao_hd" key="nguoi_tao_hd"
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
                                        showContractExtension: true
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
                        {this.props.role == 'Director' ? <Column
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
        onSubmit: (contractExtension) => {
            dispatch(createcontractExtension(contractExtension))
        }
    }
}
var mapStateToProps = state => {


    return {
        newContractExtension: state.myContractExtensionReducer
    }



}
export default connect(mapStateToProps, mapDispatchToProps) (ContractExtensionTable)