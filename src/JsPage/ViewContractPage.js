import React from 'react';
import ReactDOM from 'react-dom';
import {
    FileExcelOutlined, IdcardOutlined, BankOutlined, PhoneOutlined, PrinterOutlined, HomeOutlined, MailOutlined
    , ContactsOutlined, CalendarOutlined, DollarOutlined, DeleteOutlined, CloudUploadOutlined, AuditOutlined
} from '@ant-design/icons';
import ContractExtensionTable from './ContractExtensionTable'
import { Descriptions, InputNumber, Space, Button, DatePicker, Input, Card, Form, Select, Table, Comment, List, Avatar } from 'antd';
import ContractTable from './ContractTable'
import moment from 'moment'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;
const { TextArea } = Input;
const { Option } = Select;
const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

class ContractView extends React.Component {
    constructor() {
        super();

        this.state = {
            openExtension: false,
            openCommentSection: false,
            finish: false,
            showContent: "customer",
            comments: [],
            submitting: false,
            value: '',
            currentPage: 1,
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
        };

        this.OpenExtension = this.OpenExtension.bind(this)
        this.OpenCommentSection = this.OpenCommentSection.bind(this)
    }
    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                        author: 'Han Solo',

                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                    ...this.state.comments,
                ],
            });
        }, 1000);
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
    OpenExtension() {
        this.setState({
            openExtension: true
        })
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
    onFinishComment = () => {



    };
    onFinishCommenFailt = () => {



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
    render() {
        const { comments, submitting, value } = this.state;
        const Editor = ({ onChange, onSubmit, submitting, value }) => (
            <Form

                name="basic"
                className="lcontract-form"

                onFinish={this.onFinishComment}
                onFinishFailed={this.onFinishCommentFailed}

            >
                <Form.Item>
                    <TextArea rows={4} onChange={onChange} value={value} />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                        Yêu cầu sửa
                </Button>
                </Form.Item>
            </Form>
        );
        if (this.props.role === true) {

            if (this.state.openExtension) {
                return (
                    <Router>
                        <Redirect push to={"/capstone/viewContract/" + this.props.contract.id + "/viewExtension"} />
                        <Route exact path="/capstone/viewContract/:id/viewExtension" render={() => <ContractExtensionTable contractId={this.props.contract.id} role={this.props.role} />
                        } /></Router>
                );
            } else {
                if (this.state.finish) {
                    return (<ContractTable role={this.props.role} />);
                } else {
                    return (

                        <div style={{ height: "100vh" }}>
                            <br/>
                            <Button type="primary" value="cancel" onClick={this.Cancel}>
                                Trở về
                            </Button>
                            <h2 style={{ textAlign: 'center' }}>Hợp đồng </h2>
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
                                <Space title="Nội dung hợp đồng" direction="vertical"    >
                                    
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
                                    </Card> 
                                  
                                        <Card title="Tổng giá">



                                        </Card> 
                                        <Card title="Thuế">



                                        </Card> 
                                    
                                        <Card title="Phương thức thanh toán">
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


                                    </Card> 
                                        <Card title="Nghĩa vụ bên bán">
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
                                            
                                            
                                     </Card> 
                                        <Card title="Các trường hợp chấm dứt hợp đồng">
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



                                        </Card> 

                                </Space>
                                        <Space size="large">
                                        {comments.length > 0 && <CommentList comments={comments} />}
                                            {this.props.contract.status == "pending" ? <Button type="primary" value="Sign" onClick={this.onFinish}>{/*Nút này xuất hiện khi chưa ai kí hợp đồng nhưng chỉ có director mới thấy*/}
                                                        Kí
                                                    </Button> : this.props.contract.status == "waiting for sign" ? <Button type="primary" value="Sign" onClick={this.onFinish}>{/*Nút này xuất hiện khi chưa ai kí hợp đồng nhưng chỉ có director mới thấy*/}
                                                        Kí
                                                    </Button> : null}
                                            {this.props.contract.status == "pending" ? <Comment
                                                avatar={
                                                    <Avatar
                                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                                        alt="Han Solo"
                                                    />
                                                }
                                                content={
                                                    <Editor
                                                        onChange={this.handleChange}
                                                        onSubmit={this.handleSubmit}
                                                        submitting={submitting}
                                                        value={value}
                                                    />
                                                }
                                            /> : null}
                                            {this.props.contract.status == "pending" ? <Button type="primary" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            Sửa
                                                    </Button> : null}
                                            {this.props.contract.status == "active" ? <Button type="primary" onClick={this.OpenExtension} value="ViewExtension">{/*nút này xuất hiện khi 2 bên đã kí hợp đồng này*/}
                                                            Xem phụ lục
                                                    </Button> : null}
                                            {this.props.contract.status == "deactive" ? <Button type="primary" onClick={this.OpenExtension} value="ViewExtension">{/*nút này xuất hiện khi 2 bên đã kí hợp đồng này*/}
                                                            Xem phụ lục
                                                        </Button> : null}
                                            {this.props.contract.status == "waiting for sign" ? <Button type="primary" value="reject">{/*nút này xuất hiện khi 2 bên đã kí hợp đồng này*/}
                                                            Reject
                                                        </Button> : null}
                                        </Space>
                                    </Form>
                                </Card>

                            </Space>
                        </div>

                    );
                }
            }

        } else {



            if (this.state.openExtension) {
                return (<ContractExtensionTable role={this.props.role} />);
            } else {
                if (this.state.finish) {
                    return (<ContractTable role={this.props.role} />);
                } else {
                    return (
                        <div style={{ height: "100vh" }}>
                            <Button type="primary" value="cancel" onClick={this.Cancel}>
                                Trở về
              </Button>
                            <h2 style={{ textAlign: 'center' }}>Hợp đồng </h2>
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
                                <Space title="Nội dung hợp đồng" direction="vertical"    >
                                    
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
                                    </Card> 
                                  
                                        <Card title="Tổng giá">



                                        </Card> 
                                        <Card title="Thuế">



                                        </Card> 
                                    
                                        <Card title="Phương thức thanh toán">
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


                                    </Card> 
                                        <Card title="Nghĩa vụ bên bán">
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
                                            
                                            
                                     </Card> 
                                        <Card title="Các trường hợp chấm dứt hợp đồng">
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



                                        </Card> 

                                </Space>
                                        <Space size="large">
                                        {comments.length > 0 && <CommentList comments={comments} />}
                                            
                                            
                                            {this.props.contract.status == "pending" ? <Button type="primary" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            Sửa
                                                    </Button> : null}
                                            {this.props.contract.status == "active" ? <Button type="primary" onClick={this.OpenExtension} value="ViewExtension">{/*nút này xuất hiện khi 2 bên đã kí hợp đồng này*/}
                                                            Xem phụ lục
                                                    </Button> : null}
                                            {this.props.contract.status == "deactive" ? <Button type="primary" onClick={this.OpenExtension} value="ViewExtension">{/*nút này xuất hiện khi 2 bên đã kí hợp đồng này*/}
                                                            Xem phụ lục
                                                        </Button> : null}
                                            
                                        </Space>
                                    </Form>
                                </Card>

                            </Space>


                        </div>

                    );
                }
            }
        }
    }
}
export default ContractView