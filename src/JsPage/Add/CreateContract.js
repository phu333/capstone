import React from 'react';
import { createContract, contractInformation, } from '../../actions/ContractAction'
import { Select, DatePicker, Descriptions, Space, Button, InputNumber, Form, Table, Input, Col, Card, Pagination } from 'antd';
import { connect } from 'react-redux'
import ContractTable from '../Table/ContractTable'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import {
    DeleteOutlined, IdcardOutlined, BankOutlined, PhoneOutlined, PrinterOutlined, HomeOutlined, MailOutlined
    , ContactsOutlined, CalendarOutlined, DollarOutlined, CloudDownloadOutlined, CloudUploadOutlined, AuditOutlined
} from '@ant-design/icons';
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;



class CreateContract extends React.Component {
    constructor() {
        super();

        this.state = {

            TheChooseOne: {
                Name: "",
                MST: "",
                Address: "",
                Email: "",
                Owner: "",
            },
            currntPage:1,
            products: [
                {
                    key: 1,
                    product_name: "abc",
                    unit: 1,
                    quantitve: 2,
                    price: 1000,
                },
                {
                    key: 2,
                    product_name: "abc",
                    unit: 1,
                    quantitve: 2,
                    price: 1000,
                }
            ],
            finish: false,
            showContent: "customer"
        };
        this.handleChange = this.handleChange.bind(this);

    }
    onFinish = (values) => {
        this.setState({
            finish: true
        })


        const contract = {

            contract_name: 'Hop dong lao dong',
            status: "pending",
            ben_tao_hd: 'HiSign',
            ben_tham_gia: 'cty 369',
            nguoi_tao_hd: "Nguyen Ngoc Phu",
            deadline: "12/12/2022",

        }
        this.props.onSubmit(contract)

    };
    Cancel = () => {
        this.setState({
            finish: true
        })




    };
    ShowCustomer = () => {
        this.setState({
            showContent: "customer"
        })
    };
    ShowContent = () => {
        this.setState({
            showContent: "content"
        })
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    handleChange(value) {
        this.setState({
            TheChooseOne: {
                Name: "Company name here",
                MST: "Tax code here",
                Address: "address here",
                Email: "email here",
                Owner: "owner here",
            },
        })
    }
    log = (type) => console.log.bind(console, type);
    onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }
    onPageChange = page => {
        console.log(page);
        this.setState({
            currntPage: page,
        });
      };
    onOk(value) {
        console.log('onOk: ', value);
    }
    render() {

        if (this.state.finish) {
            return (
                <Router>
                    <Redirect push to={"/capstone/contract"} />
                    <Route exact path="/capstone/contract" render={() => <ContractTable role={this.props.role} />
                    } /></Router>
            );
        } else {


            return (

                <div >
                    <Button type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>

                    <h2 style={{ textAlign: 'center' }}>Hợp đồng <Input></Input></h2>
                    <Space direction="vertical" align="start" >
                        <Space direction="vertical" align="start" style={{ backgroundColor:"white" }} >
                            <Card>
                                <Descriptions size="small" column={2} title={"Thông tin bên A"}  >
                                    <Descriptions.Item label={(<b><IdcardOutlined />{"Công ty/Tổ chức:"}</b>)}>HiSign</Descriptions.Item>
                                    <Descriptions.Item label={(<b><HomeOutlined />{"Địa chỉ:"}</b>)}>asdasdasd</Descriptions.Item>
                                    <Descriptions.Item label={(<b><PhoneOutlined />{"Điện thoại:"}</b>)}>123123123123</Descriptions.Item>
                                    <Descriptions.Item label={(<b><MailOutlined />{"Địa chỉ Email:"}</b>)}>sfds@gmail.com</Descriptions.Item>
                                    <Descriptions.Item label={(<b><BankOutlined />{"Giấy phép kinh doanh:"}</b>)}>123123123123</Descriptions.Item>
                                    <Descriptions.Item label={(<b><BankOutlined />{"Mã số thuế:"}</b>)}>123123123123</Descriptions.Item>
                                    <Descriptions.Item label={(<b><BankOutlined />{"Tài khoản số:"}</b>)}>123123123123</Descriptions.Item>
                                    <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item>
                                    <Descriptions.Item label={(<b><ContactsOutlined />{"Do ông(bà):"}</b>)} span={2}>Usada Pekora</Descriptions.Item>
                                    <Descriptions.Item label={(<b><ContactsOutlined />{"Năm sinh:"}</b>)} span={2}>
                                       1998
                        </Descriptions.Item>
                                    <Descriptions.Item label={(<b><ContactsOutlined />{"Chức vụ"}</b>)} span={2}>
                                        Giám đốc
                        </Descriptions.Item>
                        <Descriptions.Item label={(<h><ContactsOutlined />{"làm đại diện"}</h>)} span={2}>
                                        
                        </Descriptions.Item>

                                </Descriptions>
                            

                                <Descriptions title="" size="small" column={2} title="Thông tin bên B"
                                extra={[<Select defaultValue="NO" onChange={this.handleChange}>
                                <Option value="NO">Please select your customer</Option>
                                <Option value="PR001">Usada construction</Option>
                                <Option value="PR002">Anukin corp</Option>
                                <Option value="PR003">The circus</Option>
                            </Select>]}
                                >
                                    
                                    <Descriptions.Item label={(<b><IdcardOutlined />{"Công ty/Tổ chức:"}</b>)}>HiSign</Descriptions.Item>
                                    <Descriptions.Item label={(<b><HomeOutlined />{"Địa chỉ:"}</b>)}>asdasdasd</Descriptions.Item>
                                    <Descriptions.Item label={(<b><PhoneOutlined />{"Điện thoại:"}</b>)}>123123123123</Descriptions.Item>
                                    <Descriptions.Item label={(<b><MailOutlined />{"Địa chỉ Email:"}</b>)}>sfds@gmail.com</Descriptions.Item>
                                    <Descriptions.Item label={(<b><BankOutlined />{"Giấy phép kinh doanh:"}</b>)}>123123123123</Descriptions.Item>
                                    <Descriptions.Item label={(<b><BankOutlined />{"Mã số thuế:"}</b>)}>123123123123</Descriptions.Item>
                                    <Descriptions.Item label={(<b><BankOutlined />{"Tài khoản số:"}</b>)}>123123123123</Descriptions.Item>
                                    <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item>
                                    <Descriptions.Item label={(<b><ContactsOutlined />{"Do ông(bà):"}</b>)} span={2}>Usada Pekora</Descriptions.Item>
                                    <Descriptions.Item label={(<b><ContactsOutlined />{"Năm sinh:"}</b>)} span={2}>
                                       1998
                        </Descriptions.Item>
                                    <Descriptions.Item label={(<b><ContactsOutlined />{"Chức vụ"}</b>)} span={2}>
                                        Giám đốc
                        </Descriptions.Item>
                        <Descriptions.Item label={(<h><ContactsOutlined />{"làm đại diện"}</h>)} span={2}>
                                        
                                        </Descriptions.Item>

                                </Descriptions>
                            </Card>
                        </Space>


                        <Card>

                            <Form

                                name="basic"
                                className="lcontract-form"

                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}

                            >
                                <Space title="Nội dung hợp đồng" direction="vertical" style={{width:"100%"}}   >
                                    
                                     {this.state.currntPage === 1 ? <>
                                     <Card title="thời hạn hợp đồng"> <RangePicker
                                            showTime={{ format: 'HH:mm' }}
                                            format="YYYY-MM-DD HH:mm"
                                            onChange={this.onChange}
                                            onOk={this.onOk}
                                        /></Card> 
                                   
                                        <Card title="Hàng hóa">
                                            <Table dataSource={this.state.products}
                                                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}>
                                                <Column title="stt" dataIndex="key" key="key"
                                                    render={(text, record) => (

                                                        <a>{text}</a>

                                                    )}
                                                />

                                                <Column title="tên hàng hóa" dataIndex="product_name" key="product_name"
                                                    render={(text, record) => (

                                                        <b>{text}</b>

                                                    )} />
                                                <Column title="đơn vị" dataIndex="unit" key="unit"
                                                    render={(text, record) => (

                                                        <b>{text}</b>

                                                    )} />
                                                <Column title="số lượng" dataIndex="quantitve" key="quantitve"
                                                    render={(text, record) => (

                                                        <b>{text}</b>

                                                    )} />
                                                <Column title="Giá" dataIndex="price" key="price"
                                                    render={(text, record) => (

                                                        <Form.Item

                                                            name="value"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Vui lòng nhập Giá trị:',
                                                                },
                                                            ]}
                                                        >
                                                            <InputNumber

                                                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}

                                                            />
                                                        </Form.Item>

                                                    )} />

                                                <Column
                                                    title="Xóa"
                                                    key="action"
                                                    render={(text, record) => (

                                                        <DeleteOutlined style={{ fontSize: '30px', color: '#08c' }} theme="outlined" onClick={this.viewContract} />

                                                    )}
                                                />


                                            </Table>
                                        Giá cả trên chưa bao gồm thuế Giá  trị gia tăng.
Hàng hoá do Bên Bán cung cấp phải đảm bảo đúng chất lượng (Có Giấy chứng nhẫn hàng hoá cung cấp đạt tiêu chuẩn chất lượng của cơ quan Nhà nước có thẩm quyền)
                                    </Card></> :null}   
                                    {this.state.currntPage === 2 ? <><Card title="Tổng giá">

                                    <InputNumber

                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}/>     


                                    </Card> 
                                    <Card title="Thuế">
                                    <InputNumber
                                    defaultValue={100}
                                            min={0}
                                        max={100}
                                    formatter={value => `${value}%`}
                                            parser={value => value.replace('%', '')}
    
                                            />                  


    </Card> </> :null} 
                                        {this.state.currntPage === 3 ? <> <Card title="Phương thức thanh toán">
                                            Tổng số tiền Bên Mua phải Thanh toán cho Bên Bán là: <InputNumber

                                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}

                                            />đồng/ lô hàng

                                        Giá trên chưa bao gồm thuế giá trị gia tăng.
                                    </Card> 

                                        <Card title="Thời hạn và phương thức thanh toán">
                                            Phương thức thanh toán: Thanh toán bằng tiền mặt hoặc chuyển khoản.
                                            Khi Bên A thanh toán tiền hàng theo các lần thanh toán, Bên B có nghĩa vụ ghi hoá đơn, chứng từ chứng nhận việc đã thanh toán của Bên A theo qui định của pháp luật.


                                   </Card> 
                                        <Card title="Thời điểm và địa điểm chuyển giao">
                                            Bên bán chuyển giao tài sản cho Bên mua tại<Input /> trong thời hạn <Input /> ngày kể từ ngày ký kết hợp đồng;


                                    </Card>  </> :null} 
                                    {this.state.currntPage === 4? <> <Card title="Nghĩa vụ bên bán">
                                            5.1.	Bên Bán chịu trách nhiệm về số lượng, chất lượng đối với toàn bộ các sản phẩm do Bên Bán cung cấp cho tới khi hàng đến <Input />
                                        5.2.	Bên Bán có nghĩa vụ giao hàng cho Bên mua tại<Input />.
                                        5.3.	Bên Bán có nghĩa vụ cung cấp mọi chỉ dẫn cần thiết đối với việc bảo quản, sử dụng hàng hoá theo quy định của Hợp đồng này cho Bên mua.F


                                    </Card> 
                                        <Card title="Nghĩa vụ bên mua">
                                            6.1.	Bên mua có nghĩa vụ thanh toán toàn bộ chi phí vận chuyển từ  kho xưởng của mình đến <Input />
                                        6.2.	Tổ chức tiếp nhận nhanh, an toàn, dứt điểm cho từng lô hàng.
                                        6.3.	Thanh toán theo quy định tại Điều 7 Hợp đồng này.
                                        6.4.	Chịu chi phí bốc dỡ từ xe xuống khi Bên Bán vận chuyển hàng hoá đến
                                        <Input />

                                        </Card> 
                                        <Card title="Giải quyết tranh chấp">
                                            Đối với Bên Bán:
                                            -	Nếu Bên Bán không giao hàng đúng thời hạn quy định tại Hợp đồng này thì sẽ bị phạt số tiền là 0,05% Tổng giá trị Hợp đồng cho 01 ngày vi phạm.
                                            -	Nếu Bên Bán không giao đủ hàng đúng số lượng và chất lượng theo quy định tại Hợp đồng này thì sẽ phải cung cấp tiếp hàng hoá theo đúng quy định và bị phạt số tiền là 0,05% Tổng giá trị hàng hoá bị vi phạm cho 01 ngày chậm.
                                            Đối với bên mua:
                                            -	Nếu Bên mua không thực hiện đúng nghĩa vụ thanh toán theo qui định tại  Hợp đồng này thì sẽ bị phạt số tiền là 0,05% Tổng giá trị Hợp đồng cho 01 ngày vi phạm.
                                            -	Nếu Bên mua không thực hiện đúng nghĩa vụ tiếp nhận hàng theo qui định của Hợp đồng này thì sẽ bị phạt số tiền là 0,05% Tổng giá trị Hợp đồng cho 01 ngày vi phạm.
                                            
                                            
                                     </Card>  </> :null} 
                                     {this.state.currntPage === 5? <> <Card title="Các trường hợp chấm dứt hợp đồng">
                                            Trong qúa trình thực hiện Hợp đồng này nếu xảy ra bất kỳ sự bất đồng nào,
                                            Bên nảy sinh bất đồng sẽ thông báo cho bên kia bằng văn bản.
                                            Hai bên sẽ thương lượng để giải quyết các bất đồng đó.
                                            Trường hợp các bên không tự thương lượng được thì
                                            sự việc sẽ được đưa ra giải quyết theo qui định của pháp luật.
                                            Hợp đồng này sẽ được chấm dứt trong các trường hợp sau:
                                            -	Khi các Bên thực hiện xong các quyền và nghĩa vụ quy định trong Hợp đồng này.
                                            -	Khi một Bên vi phạm hợp đồng dẫn đến Hợp đồng không thể thực hiện được thì phía Bên kia có quyền đơn phương chấm dứt hợp đồng.
                                            -	 Hợp đồng có thể được chấm dứt do sự thỏa thuận của các Bên.
                                            
                                     </Card> 
                                        <Card title="Hiệu lực thi hành">



                                        </Card>   </> :null} 
                                       
                                        

                                </Space>
                                
                                <Space size="large">
                                    <Button type="primary" value="submit" htmlType="submit">
                                        Nộp
                  </Button>
                                </Space>
                            </Form>
                            <Pagination onChange={this.onPageChange} defaultCurrent={this.state.currntPage} total={50} />
                        </Card>

                    </Space>
                </div>




            );
        }
    }
}
var mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (contract) => {
            dispatch(createContract(contract))
        }
    }
}
export default connect(null, mapDispatchToProps)(CreateContract);