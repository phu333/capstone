import 'antd/dist/antd.css';
import axios from 'axios'
import { Table, Space, Button, Tag,Switch,message } from 'antd';
import AddSignature from '../Add/AddSignature'
import UpdateSignature from '../Update/UpdateSignature'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom'
import SignatureSearch from '../Search/SignatureSearch'
import { createSignature, signatureInformation } from '../../actions/SignatureAction'
import { connect } from 'react-redux'
import "../Column.css"
import { UserAddOutlined, EditOutlined, DeleteOutlined, UserOutlined,FolderViewOutlined } from "@ant-design/icons"
const { Column, ColumnGroup } = Table;


class SignatureList extends React.Component {
    constructor() {
        super();

        this.state = {

            dataSource: [
                {
                    key: '1',
                    name: 'Mike',
                    email: "some email",
                    provider: '10 Downing Street',
                    status: "active",
                    expired: 2022
                },
                {
                    key: '2',
                    name: 'John',
                    email: "some email",
                    provider: '10 Downing Street',
                    status: "active",
                    expired: 2022
                },
            ],
            openSignature: "",
            signature:{},

        };
        this.OpenAddSignature = this.OpenAddSignature.bind(this);
        
    }
    componentDidMount() {

        if (this.props.newSignature.length === 0) {
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
                serial:123123123123123123,
                
                provider: 'Viettel',
                status: "active",
                expired: "12/11/2022"

            }
            const contract2 = {
                serial:123123123123123123,
               
                provider: 'Fpt',
                status: "deactive",
                expired: "12/12/2022"

            }

            this.props.onSubmit(contract1)
            this.props.onSubmit(contract2)

        }

    }
    OpenAddSignature() {
        this.setState({
            openSignature: "openAddSignature",
        })
    }
    
    render() {
        if (this.state.openSignature === "openAddSignature") {

            return (
                <Router>
                    <Redirect push to={"/capstone/addSignature"} />
                    <Route exact path="/capstone/addSignature" component={AddSignature} /></Router>
            );
        } else if (this.state.openSignature === "openViewSignature") {
            return (
                <Router>
                    <Redirect push to={"/capstone/updateSignature/" + this.state.signature.serial} />
                    <Route exact path="/capstone/updateSignature/:id" render={() => <UpdateSignature signature={this.state.signature} />} />

                </Router>
            );
        }
        else {
            return (
                <div style={{ height: "100vh" }}><Button type="primary" onClick={this.OpenAddSignature} icon={<UserAddOutlined />}>Thêm chữ ký mới</Button>
                    <SignatureSearch token={this.props.token} SignatureList={this.props.newSignature}/>
                    <Table dataSource={this.props.newSignature}
                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} >

                       

                        <Column title="Nhà cung cấp" dataIndex="provider"
                         sorter={(a, b) => a.provider.localeCompare(b.provider)}
                         sortDirections={['descend', 'ascend']}
                         key="provider" />

                        <Column title="Ngày hết hạn"
                         sorter={(a, b) => a.expired.localeCompare(b.expired)}
                         sortDirections={['descend', 'ascend']}
                         dataIndex="expired" key="expired" />
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
                                } else if (text === 'Hiệu lực') {
                                    color = 'green'
                                } else if (text === 'Vô hiệu hóa') {
                                    color = 'red'
                                } else if (text === 'Chờ bên ta ký') {
                                    color = 'blue'
                                } else if (text === 'Chờ đối tác ký') {
                                    color = 'blue'
                                } else if (text === 'Hoàn thành') {
                                    color = 'yellow'
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
                                <Space size="middle">
                                   <FolderViewOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={
                                    () => this.setState({
                                        signature: text,
                                        openSignature: "openViewSignature",
                                    })
                                } />
                                </Space>
                            )}
                        />
                        <Column
                            title="Chức năng"
                            dataIndex="status"
                            key="status"
                            render={(text, record) => (
                                <Space size="middle">
                                    {text === "Deactive" ? <Switch style={{ fontSize: '30px' }} onClick={this.OpenViewCustomer} checkedChildren="Vô hiệu hóa" unCheckedChildren="kích hoạt" defaultunChecked /> : <Switch style={{ fontSize: '30px' }} checkedChildren="Vô hiệu hóa" unCheckedChildren="kích hoạt" defaultChecked />}
                                </Space>
                            )}
                        /></Table></div>
            );
        }

    }
}
var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (signature) => {
            dispatch(createSignature(signature))
        }
    }
}
var mapStateToProps = state => {


    return {
        newSignature: state.mySignatureReducer
    }



}
export default connect(mapStateToProps, mapDispatchToProps)(SignatureList)