import React from 'react';
import { UserAddOutlined, SearchOutlined, FileOutlined } from "@ant-design/icons"
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { Select, DatePicker, Descriptions, Space, Button, InputNumber, Table, PageHeader, Row, Col } from 'antd';
import ContractExtensionTable from './ContractExtensionTable'
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

const { Option } = Select;
const { RangePicker } = DatePicker;




class AddContractExtension extends React.Component {
    constructor() {
        super();

        this.state = {
            option: "DeadLineExtend",
            NewContent: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.ChooseOption = this.ChooseOption.bind(this);

    }
    handleChange(value) {
        this.setState({
            NewContent: "NewContent"
        })
    }
    Cancel = () => {
        this.setState({
            finish: true
        })




    };
    log = (type) => console.log.bind(console, type);
    onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    onOk(value) {
        console.log('onOk: ', value);
    }
    ChooseOption(value) {

        this.setState({
            option: value
        })
        if (value === "DeadLineExtend") {
            this.setState({
                NewContent: ""
            })
        }
    }
    render() {
        if (this.state.finish) {
            return (
                <Router>
                    <Redirect push to={"/capstone/viewContract/"+ this.props.contractId} />
                    <Route exact path="/capstone/viewContract/:id" render={() =>   <ContractExtensionTable contractId={this.props.contractId} role={this.props.role} />
                    } /></Router>
            );
        } else {
            return (
                <div style={{ border: "solid", backgroundColor: "white",height: "100vh" }} >
                    <br/>
                    <Button type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>

                    <h2 style={{ textAlign: 'center' }}>phụ lục hợp đồng</h2>
                    <Row>
                        <Col span={3} order={1} />
                        <Col span={20} order={2}>
                            <div id="approver">Lý do tạo:

                        <Select defaultValue={this.state.option} style={{ width: 200 }}
                                    onChange={this.ChooseOption}>
                                    <Option value="DeadLineExtend">Gia hạn hợp đồng</Option>
                                    <Option value="ChangePolicy">Thay đổi Giá trị</Option>{/*khi chọn cái này thì cái RangePicker sẽ hide và show cái table để chọn template*/}
                                    <Option value="Both">Cả hai</Option>{/*khi chọn cái này thì cái này show cái table để chọn template*/}
                                </Select>
                            </div>
                            <Descriptions title="Noi dung thay doi" size="small" column={1} >
                                {this.state.option === "DeadLineExtend" ? <Descriptions.Item><RangePicker
                                    showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD HH:mm"
                                    onChange={this.onChange}
                                    onOk={this.onOk}
                                /></Descriptions.Item> : null}
                                {this.state.option === "ChangePolicy" ? <Descriptions.Item><Table dataSource={dataSource} >
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
                                </Table> </Descriptions.Item> : null}
                                {this.state.option === "Both" ? <Descriptions.Item> <RangePicker
                                    showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD HH:mm"
                                    onChange={this.onChange}
                                    onOk={this.onOk}
                                /></Descriptions.Item> : null}
                                {this.state.option === "Both" ? <Descriptions.Item> <Table dataSource={dataSource} >
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
                                </Table> </Descriptions.Item> : null}
                                {this.state.NewContent === "NewContent" ? <>
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
                                    </Descriptions.Item></> : null}



                            </Descriptions>
                            <Space size="large">
                                <Button type="primary" value="Signed">
                                    Lưu
                        </Button>


                            </Space>
                        </Col>
                    </Row>
                </div>

            );
        }
    }
}
export default AddContractExtension