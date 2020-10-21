import 'antd/dist/antd.css';
<<<<<<< HEAD
import { Table, Space,Button,Tag,Switch } from 'antd';
=======
import { Table, Space, Button, Tag } from 'antd';
>>>>>>> origin/main
import AddSignature from './AddSignature'
import UpdateSignature from './UpdateSignature'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import SignatureSearch from './SignatureSearch'
import { createSignature, signatureInformation } from '../actions/SignatureAction'
import { connect } from 'react-redux'
import { UserAddOutlined, EditOutlined, DeleteOutlined, UserOutlined,EyeOutlined } from "@ant-design/icons"
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
            openEmployee: "",
            signature:{},

        };
        this.OpenAddEmployee = this.OpenAddEmployee.bind(this);
        
    }
    componentDidMount() {

        if (this.props.newSignature.length === 0) {
            const contract1 = {
                serial:123123123123123123,
                name: 'Mike',
                email: "some email",
                provider: 'Viettel',
                status: "active",
                expired: 2022

            }
            const contract2 = {
                serial:123123123123123123,
                name: 'John',
                email: "some email",
                provider: 'Fpt',
                status: "deactive",
                expired: 2022

            }

            this.props.onSubmit(contract1)
            this.props.onSubmit(contract2)

        }

    }
    OpenAddEmployee() {
        this.setState({
            openEmployee: "openAddSignature",
        })
    }
    
    render() {
        if (this.state.openEmployee === "openAddSignature") {

            return (
                <Router>
                    <Redirect push to={"/capstone/addSignature"} />
                    <Route exact path="/capstone/addSignature" component={AddSignature} /></Router>
            );
        } else if (this.state.openEmployee === "openViewSignature") {
            return (
                <Router>
                    <Redirect push to={"/capstone/updateSignature" + this.state.signature.serial} />
                    <Route exact path="/capstone/updateSignature/:id" render={() => <UpdateSignature signature={this.state.signature} />} />

                </Router>
            );
        }
        else {
            return (
<<<<<<< HEAD
                <div style={{height: "100vh"}}><Button type="primary" onClick={this.OpenAddEmployee} icon={<UserAddOutlined />}>Thêm chữ ký mới</Button>
                       <br/>
                            <SignatureSearch/>
=======
                <div style={{ height: "100vh" }}><Button type="primary" onClick={this.OpenAddEmployee} icon={<UserAddOutlined />}>Thêm chữ ký mới</Button>
                    <SignatureSearch />
>>>>>>> origin/main
                    <Table dataSource={this.props.newSignature}
                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} >

                        <Column title="Tên người sử dụng" dataIndex="name" key="name" />

                        <Column title="Nhà cung cấp" dataIndex="provider" key="provider" />

                        <Column title="Ngày hết hạn" dataIndex="expired" key="expired" />
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
                                <Space size="middle">
                                   <EyeOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={
                                    () => this.setState({
                                        signature: text,
                                        openCustomer: "openViewSignature",
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
<<<<<<< HEAD
                  {text === "active" ?  <Switch style={{ fontSize: '30px' }} onClick={this.OpenViewCustomer} checkedChildren="kích hoạt" unCheckedChildren="Vô hiệu hóa" defaultChecked />: <Switch style={{ fontSize: '30px' }} checkedChildren="kích hoạt" unCheckedChildren="Vô hiệu hóa" defaultunChecked />}
=======
                                    {text === "active" ? <DeleteOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" >Vô hiệu hóa</DeleteOutlined> : null}
                                    {text === "deactive" ? <UserOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" >kích hoạt</UserOutlined> : null}
>>>>>>> origin/main
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