import 'antd/dist/antd.css';
import axios from 'axios'
import { Table, Space, Button, Tag, Switch, message } from 'antd';
import AddSignature from '../Add/AddSignature'
import UpdateSignature from '../Update/UpdateSignature'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom'
import SignatureSearch from '../Search/SignatureSearch'
import { createSignature, signatureInformation } from '../../actions/SignatureAction'
import { connect } from 'react-redux'
import "../Column.css"

import FadeIn from 'react-fade-in'
import { UserAddOutlined, EditOutlined, DeleteOutlined, UserOutlined, FolderViewOutlined } from "@ant-design/icons"
const { Column, ColumnGroup } = Table;
var hash = require('object-hash')

class SignatureList extends React.Component {
    constructor() {
        super();

        this.state = {

            loading: true,
            openSignature: "",
            signature: {},

        };
        this.OpenAddSignature = this.OpenAddSignature.bind(this);

    }
    componentDidMount() {


        axios({
            url: '/api/DigitalSignature',
            method: "GET",
            headers: {
                Authorization: "Bearer " + this.props.token,

            },
        })
            .then((response) => {
                console.log(response)
                return response.data;
            })
            .then((data) => {
                setTimeout(function () {
                    this.setState({
                        loading: false,

                    })
                    this.props.onSubmit(data)

                }.bind(this), 5000)

            })
            .catch(error => {



            });







    }
    OpenAddSignature() {
        this.setState({
            openSignature: "openAddSignature",
        })
    }
    handleChangeS(index, info) {
        
        axios({
            url: '/api/DigitalSignature/'+index,
            method: "DELETE",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            }

        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                console.log(data.data)
                message.success("Trạng thái đã được cập nhật")
                axios({
                    url: '/api/DigitalSignature',
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + this.props.token,
        
                    },
                })
                    .then((response) => {
                        console.log(response)
                        return response.data;
                    })
                    .then((data) => {
                        setTimeout(function () {
                            this.setState({
                                loading: false,
        
                            })
                            this.props.onSubmit(data)
        
                        }.bind(this), 5000)
        
                    })
                    .catch(error => {
                
                    });
        
            })
            .catch(error => {
                message.error("Đã có lỗi xảy ra vui lòng kiểm tra thông tin đã nhập và thử lại sau")

            });

    }
    render() {
        if (this.state.openSignature === "openAddSignature") {

            return (<FadeIn>
                <Router>
                    <Redirect push to={"/capstone/addSignature"} />
                    <Route exact path="/capstone/addSignature" render={() => <AddSignature ActiveDeactiveSignature={this.props.ActiveDeactiveSignature} UpdateSignature={this.props.UpdateSignature} CreateSignature={this.props.CreateSignature} token={this.props.token} />} /></Router></FadeIn>
            );
        } else if (this.state.openSignature === "openViewSignature") {
            return (<FadeIn>
                <Router>
                    <Redirect push to={"/capstone/updateSignature/" + hash.sha1(this.state.signature.serialNumber)} />
                    <Route exact path="/capstone/updateSignature/:id" render={() => <UpdateSignature ActiveDeactiveSignature={this.props.ActiveDeactiveSignature} UpdateSignature={this.props.UpdateSignature} CreateSignature={this.props.CreateSignature} token={this.props.token} signature={this.state.signature} />} />

                </Router></FadeIn>
            );
        }
        else {
            return (<FadeIn>
                <div style={{ height: "100vh" }}>
                    {this.props.CreateSignature ? <Button type="primary" onClick={this.OpenAddSignature} icon={<UserAddOutlined />}>Thêm chữ ký mới</Button> : null}

                    <SignatureSearch token={this.props.token} SignatureList={this.props.newSignature} />
                    <Table dataSource={this.props.newSignature}
                        loading={this.state.loading}
                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} >



                        <Column title="Số serial" dataIndex="serialNumber"
                            sorter={(a, b) => a.provider.localeCompare(b.provider)}
                            sortDirections={['descend', 'ascend']}
                            key="serialNumber" />

                        <Column title="Ngày hết hạn"
                            sorter={(a, b) => a.expired.localeCompare(b.expired)}
                            sortDirections={['descend', 'ascend']}
                            dataIndex="expirationDate" key="expirationDate" />
                        {/* <Column title="Trạng thái" dataIndex="status" key="status"
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
                        /> */}

                        <Column
                            title="Chi tiết"
                            key="action"
                            align="center"
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
                                     <DeleteOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={() => this.handleChangeS(record.id)} />
                                </Space>
                            )}
                        /></Table></div></FadeIn>
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
        newSignature: state.mySignatureReducer,
    }



}
export default connect(mapStateToProps, mapDispatchToProps)(SignatureList)