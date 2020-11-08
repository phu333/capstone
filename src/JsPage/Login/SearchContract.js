import {
    ContainerOutlined,
    FileProtectOutlined, FolderViewOutlined
} from "@ant-design/icons";
import { Col, Input, Row, Table } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
const { Search } = Input;
const { Column } = Table;
const layout = {
    labelCol: {
        span: 6,

    },
    wrapperCol: {
        span: 14,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 10,
    },
};
const middleLayout = {
    wrapperCol: {
        offset: 6,
        span: 10,
    },
};
class SearchContractByCode extends React.Component {
    render() {
        const onSearch = value => console.log(value);
        return (
            <Row type="flex" justify="center" align="top" style={{ height: "100vh" }}>




                <Col span={10} > <Search placeholder="vui lòng nhập mã hợp đồng" onSearch={onSearch} enterButton />

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


                        <Column title="Ngày hết hạn" dataIndex="deadline" key="deadline"
                            sorter={(a, b) => a.deadline.localeCompare(b.deadline)}
                            sortDirections={['descend', 'ascend']}
                            render={(text, record) => (

                                <b>{text}</b>

                            )} />


                        <Column
                            title="Xem chi tiết"
                            key="action"
                            render={(text, record) => (

                                <FolderViewOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={
                                    () => this.setState({
                                        contract: text,
                                        showContract: true
                                    })
                                } />

                            )}
                        />


                    </Table>

                </Col></Row>
        );
    }
}
export default SearchContractByCode;