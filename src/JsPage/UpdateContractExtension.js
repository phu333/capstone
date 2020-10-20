import React from 'react';
import ReactDOM from 'react-dom';
import { UserAddOutlined, SearchOutlined, FileOutlined } from "@ant-design/icons"
import ContractExtensionTable from './ContractExtensionTable'
import { Select, DatePicker, Descriptions, Space, Button, Row, Col, Table, InputNumber } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
const { Column } = Table;
const { Option } = Select;
const { RangePicker } = DatePicker;




class UpdateContractExtension extends React.Component {
    constructor() {
        super();

        this.state = {
            openCommentSection: false,
            finish: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.OpenCommentSection = this.OpenCommentSection.bind(this)
    }
    handleChange(value) {
        console.log(`selected ${value}`);
    }
    log = (type) => console.log.bind(console, type);
    onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    onOk(value) {
        console.log('onOk: ', value);
    }
    OpenCommentSection() {
        this.setState({
            openCommentSection: true
        })
    }
    onFinish = () => {
        this.setState({
            finish: true
        })


    };
    render() {



        if (this.state.finish) {
            return (<ContractExtensionTable role={this.props.role} />);
        } else {

            return (

                <div style={{ border: "solid",height: "100vh" }} >
                    <Button type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>

                    <h2 style={{ textAlign: 'center' }}>phụ lục hợp đồng</h2>
                    <Row>
                        <Col span={3} order={1} />
                        <Col span={20} order={2}>
                            <div id="approver">Lý do tạo:

                        {/* <Select defaultValue={this.state.option} style={{ width: 200 }}
                                onChange={this.ChooseOption}>
                                <Option value="DeadLineExtend">Gia hạn hợp đồng</Option>
                                <Option value="ChangePolicy">Thay đổi Giá trị</Option>
                                <Option value="Both">Cả hai</Option>
                            </Select> */}
                            </div>
                            <Descriptions title="Noi dung thay doi" size="small" column={1} >
                                <Descriptions.Item><RangePicker
                                    showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD HH:mm"
                                    onChange={this.onChange}
                                    onOk={this.onOk}
                                /></Descriptions.Item>
                                <Descriptions.Item label="Điều khoản:">
                                    <a>Dieu khoan 1:</a><br />
                                    <a>Dieu khoan 2:</a><br />
                                    <a>Dieu khoan 3:</a><br />
                                    <a>Dieu khoan 4:</a><br />
                                </Descriptions.Item>
                                <Descriptions.Item label="Giá trị:">

                                    <InputNumber
                                        defaultValue={1000}
                                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}

                                    />
                                </Descriptions.Item>
                                {/* {this.state.option === "DeadLineExtend" ? <Descriptions.Item><RangePicker
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                                onChange={this.onChange}
                                onOk={this.onOk}
                            /></Descriptions.Item> : null} */}
                                {/* {this.state.option === "ChangePolicy" ? <Descriptions.Item><Table dataSource={dataSource} >
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
                            </Table> </Descriptions.Item> : null} */}
                                {/* {this.state.option === "Both" ? <Descriptions.Item> <RangePicker
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                                onChange={this.onChange}
                                onOk={this.onOk}
                            /></Descriptions.Item> : null} */}
                                {/* {this.state.option === "Both" ? <Descriptions.Item> <Table dataSource={dataSource} >
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
                            </Table> </Descriptions.Item> : null} */}
                                {/* {this.state.NewContent === "NewContent" ?
                                <Descriptions.Item label="Gia tri:">
                                    <a>Dieu khoan 1:</a><br />
                                    <a>Dieu khoan 2:</a><br />
                                    <a>Dieu khoan 3:</a><br />
                                    <a>Dieu khoan 4:</a><br />
                                    <InputNumber
                                        defaultValue={1000}
                                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}

                                    />
                                </Descriptions.Item> : null} */}



                            </Descriptions>
                            <Space size="large">
                                {/* <Button type="primary" value="Signed">
                                Lưu
                        </Button> */}
                                <Space size="large">

                                    {this.props.contract.status == "pending" ? <Button type="primary" value="Sign" onClick={this.onFinish}>{/*Nút này xuất hiện khi chưa ai kí hợp đồng nhưng chỉ có director mới thấy*/}
    Kí
</Button> : null}
                                    {this.props.contract.status == "pending" ? <Button onClick={this.OpenCommentSection} type="primary" value="Update request">{/*Nút này xuất hiện khi chưa ai kí hợp đồng nhưng chỉ có director mới thấy*/}
    Yêu cầu sửa
</Button> : null}
                                    {this.props.contract.status == "pending" ? <Button type="primary" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
        Sửa
</Button> : null}

                                </Space>

                            </Space>
                        </Col>
                    </Row>
                </div>

            );
        }
    }
}

export default UpdateContractExtension