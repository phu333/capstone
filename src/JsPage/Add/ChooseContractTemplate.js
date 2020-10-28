
import { Table, Space, Button, PageHeader } from 'antd';
import CreateContract from '../Add/CreateContract';
import React from 'react';
import ContractTypeSearch from '../Search/ContractTypeSearch'
import ContractTable from '../Table/ContractTable'
import { UserAddOutlined, SearchOutlined, FileOutlined } from "@ant-design/icons"
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
const { Column } = Table;
const dataSource = [
    {
        key: '1',
        contract_type: 'Hop dong lao dong',

        fileName: 'template1.dot',
    },
    {
        key: '2',
        contract_type: 'Hop dong lao dong',

        fileName: 'template1.dot',
    },
];


class ChooseContractTemplate extends React.Component {
    constructor() {
        super();

        this.state = {
            showTemplateCreate: false,
            finish: false,
        };
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange() {
        this.setState({
            showTemplateCreate: true,
        })
    }
    Cancel = () => {
        this.setState({
            finish: true
        })




    };
    render() {
        if (this.state.finish) {
            return (<Router>
                <Redirect push to={"/capstone/contract" } />
                <Route exact path="/capstone/contract" render={() => <ContractTable  role={this.props.role} />
                } /></Router>);
        } else {
            if (this.state.showTemplateCreate) {
                return (
                    <Router>
                        <Redirect push to={"/capstone/createContract"} />
                        <Route exact path="/capstone/createContract" render={() => <CreateContract role={this.props.role} />
                        } /></Router>

                );
            } else {
                return (
                    <div style={{ height: "100vh" }}>
                        <Button type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
                    </Button>
                       <ContractTypeSearch/>
                        <Table dataSource={dataSource} >
                            <Column title="loại hợp đồng" dataIndex="contract_type" key="contract_type" />
                            <Column title="khóa" dataIndex="key" key="key" />
                            <Column title="Tên file" dataIndex="fileName" key="fileName" />


                            <Column
                                title="Chọn hợp đồng"
                                key="action"
                                render={(text, record) => (
                                    <Space size="middle">
                                        <Button type="primary" icon={<FileOutlined />} onClick={this.handleChange}>Tạo hợp đồng với mẫu này</Button>
                                    </Space>
                                )}
                            />
                        </Table></div>
                );
            }

        }
    }
}
export default ChooseContractTemplate