import 'antd/dist/antd.css';
import { Table,Space,Button,PageHeader } from 'antd';
import CreateContract from './CreateContract';
import React from 'react';
import ContractTypeSearch from './ContractTypeSearch'
import {UserAddOutlined,SearchOutlined ,FileOutlined} from "@ant-design/icons"
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
            showTemplateCreate: false
        };
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange() {
        this.setState({
            showTemplateCreate: true,
        })
    }
    render() {
        if (this.state.showTemplateCreate) {
            return (

                <CreateContract role={this.props.role} />
            );
        } else {
            return (
                <div style={{height: "100vh"}}>
                    <PageHeader
                        className="site-page-header"

                        title={[]}
                        extra={[

                            <Space size="large">
                                <input ref="searchInput" />
                                <Button type="primary" shape="circle" icon={<SearchOutlined />} />
                            </Space>
                        ]}
                    >



                    </PageHeader>
                    <Table dataSource={dataSource} >
                        <Column title="loại hợp đồng" dataIndex="contract_type" key="contract_type" />
                        <Column title="khóa" dataIndex="key" key="key" />
                        <Column title="Tên file" dataIndex="fileName" key="fileName" />
                        

                        <Column
                            title="Chọn hợp đồng"
                            key="action"
                            render={(text, record) => (
                                <Space size="middle">
                                    <Button type="primary" icon={<FileOutlined/>} onClick={this.handleChange}>Tạo hợp đồng với mẫu này</Button>
                                </Space>
                            )}
                        />
                    </Table></div>
            );
        }

    }
}
export default ChooseContractTemplate