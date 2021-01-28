import axios from 'axios'
import { Table, Space, Button, message } from 'antd';
import CreateContract from '../Add/CreateContract';
import React from 'react';
import ContractTypeSearch from '../Search/ContractTypeSearch'
import ContractTable from '../Table/ContractTable'
import { UserAddOutlined, SearchOutlined, FileOutlined } from "@ant-design/icons"
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import JoditEditor from "jodit-react";
import FadeIn from 'react-fade-in'
const { Column } = Table;



class ChooseContractTemplate extends React.Component {
    constructor() {
        super();

        this.state = {
            showTemplateCreate: false,
            template: {},
            finish: false,
            loading: false,
            templateList: []
        };
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(value) {
        this.setState({
            showTemplateCreate: true,
            template: value,
        })
        
    }
    Cancel = () => {
        this.setState({
            finish: true
        })




    };
    componentDidMount() {
        this.setState({
            loading: true
        })
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
                    templateList: data.data,
                    loading: false,
                })

            })
            .catch(error => {


            });
    }
    render() {
        const config = {
            readonly: true, // all options from https://xdsoft.net/jodit/doc/
            toolbar: false
        }
        if (this.state.finish) {
            return (<Router>
                <Redirect push to={"/capstone/contract"} />
                <Route exact path="/capstone/contract" render={() => <ContractTable Sign={this.props.Sign} GetContractList={this.props.GetContractList} UpdateContract={this.props.UpdateContract} ActiveDeactiveContract={this.props.ActiveDeactiveContract} CreateContract={this.props.CreateContract} token={this.props.token} role={this.props.role} />
                } /></Router>);
        } else {
            if (this.state.showTemplateCreate) {
                return (
                    <Router>
                        <Redirect push to={"/capstone/createContract"} />
                        <Route exact path="/capstone/createContract" render={() => <CreateContract Sign={this.props.Sign} GetContractList={this.props.GetContractList} UpdateContract={this.props.UpdateContract} ActiveDeactiveContract={this.props.ActiveDeactiveContract} CreateContract={this.props.CreateContract} template={this.state.template} token={this.props.token} role={this.props.role} />
                        } /></Router>

                );
            } else {
                return (
                    <div style={{ height: "100vh" }}>
                        <Button type="primary" value="cancel" onClick={this.Cancel}>
                            Trở về
                    </Button>
                        <ContractTypeSearch /><FadeIn>
                            <Table dataSource={this.state.templateList} loading={this.state.loading} >
                                <Column title="Stt" dataIndex="id" key="id" />
                                <Column title="loại hợp đồng" dataIndex="name" key="name" />



                                <Column
                                    title="Xem trước"
                                    key="action"
                                    render={(text, record) => (
                                        <Space size="middle">
                                            <Popup trigger={<Button type="primary" icon={<FileOutlined />} >Xem trước</Button>} position="right center">
                                                <JoditEditor

                                                    value={text.content}
                                                    config={config}
                                                    tabIndex={1} // tabIndex of textarea


                                                />
                                            </Popup>

                                        </Space>
                                    )}
                                />
                                <Column
                                    title="Chọn hợp đồng"
                                    key="action"
                                    fixed="right"
                                    render={(text, record) => (
                                        <Space size="middle">
                                            <Button type="primary" icon={<FileOutlined />} onClick={() => {
                                                this.setState({
                                                    showTemplateCreate: true,
                                                    template: text,
                                                })
                                                
                                            }}>Tạo hợp đồng với mẫu này</Button>
                                        </Space>
                                    )}
                                />
                            </Table></FadeIn></div>
                );
            }

        }
    }
}
export default ChooseContractTemplate