import React from 'react';
import { createContract, contractInformation, } from '../../actions/ContractAction'
import { Select, DatePicker, Descriptions, Space, Button, InputNumber, Form, Table, Input, Col, Card, AutoComplete } from 'antd';
import { connect } from 'react-redux'
import ContractTable from '../Table/ContractTable'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'


import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios'
import 'react-quill/dist/quill.snow.css';
import JoditEditor from "jodit-react";
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;
const options = [
    {
        value: 'Công ty tnhh Microsoft',
    },
    {
        value: 'Công ty tnvh google',
    },
    {
        value: 'Công ty cổ phần amazon',
    },
];


class CreateContract extends React.Component {
    constructor() {
        super();
        this.modules = {
            toolbar: [
                [{ 'font': [] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                [{ 'color': [] }, { 'background': [] }],
                ['clean']
            ]
        };

        this.formats = [
            'font',
            'size',
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'align',
            'color', 'background'
        ];
        this.state = {
            contractContent: '<p class="ql-align-justify"><strong>Điều 1. Đối tượng của hợp đồng:</strong></p><p class="ql-align-justify">Theo yêu cầu của bên A về việc thực hiện hoạt động môi giới thương mại … (ghi rõ các nội dung hoạt động môi giới thương mại, như: làm trung gian cho các bên mua bán hàng hoá, cung ứng dịch vụ trong việc đàm phán, giao kết hợp đồng mua bán hàng hoá, dịch vụ, …), bên B đảm nhận và thực hiện …</p><p class="ql-align-justify">(Đối tượng của hợp đồng môi giới thương mại là công việc có thể thực hiện được, không vi phạm điều cấm của luật, không trái đạo đức xã hội).</p><p class="ql-align-justify"><strong>Điều 2. Thời hạn thực hiện hợp đồng:</strong></p><p class="ql-align-justify">Hợp đồng này được thực hiện kể từ ngày … / …/ …</p><p class="ql-align-justify">Thời gian dự kiến hoàn thành: là … ngày, kể từ ngày …/ …/ … đến hết ngày ngày …/ …/ …</p><p class="ql-align-justify">(Bên A và bên B thoả thuận thời hạn cụ thể và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>Điều 3. Nghĩa vụ và quyền của bên A:</strong></p><p class="ql-align-justify"><strong>1. Nghĩa vụ của bên A:</strong></p><p class="ql-align-justify">a) Cung cấp các thông tin, tài liệu, phương tiện cần thiết liên quan đến hàng hoá, dịch vụ;</p><p class="ql-align-justify">b) Trả thù lao môi giới và các chi phí hợp lý khác cho bên môi giới.</p><p class="ql-align-justify">(Bên A và bên B thoả thuận các nghĩa vụ cụ thể khác và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>2. Quyền của bên A:</strong></p><p class="ql-align-justify">Yêu cầu bên B thực hiện hoạt động môi giới thương mại theo đúng các nội dung đã thỏa thuận tại Điều 1 của hợp đồng này.</p><p class="ql-align-justify">Trường hợp bên B vi phạm nghiêm trọng nghĩa vụ hoặc quy định tại hợp đồng này, thì bên A có quyền đơn phương chấm dứt thực hiện hợp đồng và yêu cầu bồi thường thiệt hại.</p><p class="ql-align-justify">(Bên A và bên B thoả thuận các quyền cụ thể khác và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>Điều 4. Nghĩa vụ và quyền của bên B:</strong></p><p class="ql-align-justify"><strong>1. Nghĩa vụ của bên B:</strong></p><p class="ql-align-justify">Bảo quản các mẫu hàng hoá, tài liệu được giao để thực hiện việc môi giới và phải hoàn trả cho bên được môi giới sau khi hoàn thành việc môi giới;</p><p class="ql-align-justify">Không được tiết lộ, cung cấp thông tin làm phương hại đến lợi ích của bên được môi giới;</p><p class="ql-align-justify">Chịu trách nhiệm về tư cách pháp lý của các bên được môi giới, nhưng không chịu trách nhiệm về khả năng thanh toán của họ;</p><p class="ql-align-justify">Không được tham gia thực hiện hợp đồng giữa các bên được môi giới, trừ trường hợp có uỷ quyền của bên được môi giới.</p><p class="ql-align-justify">(Bên A và bên B thoả thuận các nghĩa vụ cụ thể khác và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>2. Quyền của bên B:</strong></p><p class="ql-align-justify">Yêu cầu bên A cung cấp thông tin, tài liệu và phương tiện để thực hiện công việc.</p><p class="ql-align-justify">Được tiến hành các nghiệp vụ trung gian môi giới thương mai, như: … (tuỳ theo từng nội dung hoạt động môi giới thương mại quy định tại Điều 1 của hợp đồng này).</p><p class="ql-align-justify">Yêu cầu bên A trả tiền thù lao môi giới theo quy định tại Điều 5 của hợp đồng này.</p><p class="ql-align-justify">(Bên A và bên B thoả thuận các quyền cụ thể khác và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>Điều 5. Tiền thù lao môi giới và phương thức thanh toán:</strong></p><p class="ql-align-justify">1. Tiền thù lao môi giới: Thực hiện công việc tại Điều 1 là: … đồng (Bằng chữ: …), đã bao gồm … % tiền thuế giá trị gia tăng.</p><p class="ql-align-justify">2. Phương thức thanh toán: …</p><p class="ql-align-justify">(Bên A và bên B thoả thuận cụ thể về phương thức thanh toán và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>Điều 6. Chi phí khác:</strong></p><p class="ql-align-justify">Bên A phải thanh toán các chi phí phát sinh hợp lý liên quan đến việc môi giới, kể cả khi việc môi giới không mang lại kết quả cho bên A.</p><p class="ql-align-justify">Chi phí khác hai bên thỏa thuận bổ sung nếu xét thấy cần thiết và đúng quy định của pháp luật.</p><p class="ql-align-justify"><strong>Điều 7. Đơn phương chấm dứt thực hiện hợp đồng:</strong></p><p class="ql-align-justify">1. Trường hợp việc tiếp tục thực hiện hoạt động môi giới thương mại hoặc công việc không có lợi cho bên A thì bên A có quyền đơn phương chấm dứt thực hiện hợp đồng, nhưng phải báo cho bên B biết trước … ngày. Bên A phải trả tiền thù lao môi giới theo phần hoạt động môi giới thương mại hoặc công việc mà bên B đã thực hiện và bồi thường thiệt hại (theo thoả thuận nếu có).</p><p class="ql-align-justify">2. Trường hợp bên A vi phạm nghiêm trọng nghĩa vụ hoặc quy định tại hợp đồng này thì bên B có quyền đơn phương chấm dứt thực hiện hợp đồng và yêu cầu bồi thường thiệt hại.</p><p class="ql-align-justify"><strong>Điều 8. Phương thực giải quyết tranh chấp:</strong></p><p class="ql-align-justify">Trong quá trình thực hiện hợp đồng, nếu có vấn đề phát sinh cần giải quyết, thì hai bên tiến hành thỏa thuận và thống nhất giải quyết kịp thời, hợp tình và hợp lý. Trường hợp không thỏa thuận được thì một trong các bên có quyền khởi kiện tại tòa án có thẩm quyền giải quyết vụ việc theo quy định của pháp luật.</p><p class="ql-align-justify"><strong>Điều 9. Các thoả thuận khác:</strong></p><p class="ql-align-justify">Bên A và bên B đồng ý đã hiểu rõ quyền, nghĩa vụ, lợi ích hợp pháp của mình và hậu quả pháp lý của việc giao kết hợp đồng này.</p><p class="ql-align-justify">Bên A và bên B đồng ý thực hiện theo đúng các điều khoản trong hợp đồng này và không nêu thêm điều kiện gì khác.</p><p class="ql-align-justify">Hợp đồng này được lập thành … bản, mỗi bản gồm … trang, có giá trị pháp lý như nhau và được giao cho bên A … bản, bên B … bản./.</p><p><br></p>',
            BSide: {
                Name: "",
                MST: "",
                Phone: "",
                Address: "",
                Email: "",
                Representative: "",
                Position: "",
                BusinessLicensce: "",
                YoB: "",
                BankAccount: "",
            },
            ASide: {
                Name: "",
                MST: "",
                Phone: "",
                Address: "",
                Email: "",
                Representative: "",
                Position: "",
                BusinessLicensce: "",
                YoB: "",
                BankAccount: "",
            },
            contractNum:"",
            contractName:"",
            contractValue:0,
           
            finish: false,
            contractTitle:"",
            contractPlace:"",
            contractExpiredDate:"",
        };
        this.handleChange = this.handleChange.bind(this);
       
        this.rteChange = this.rteChange.bind(this);
    }
    
    rteChange = (value) => {
        console.log(value); // HTML/rich text
    }
    onFinish = (values) => {
        contract={
            contractTitle:this.state.contractTitle,
            contractNum:this.state.contractNum,
            contractName:this.state.contractName,
            contractPlace:this.state.contractPlace,
            contractCreateDate:"",
            contractExpiredDate:this.state.contractExpiredDate,
            ASide:this.state.ASide,
            BSide:this.state.BSide,
            contractValue:this.state.contractValue,
            contractContent:this.state.contractContent,
        }
        axios({
            url: '',
            method: "POST",
            data: contract
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {

                

            })
            .catch(error => {

                if (error.response.status === 500) {
                    message.error(error.response.status + ' Server under maintainence');
                } else if (error.response.status === 404) {
                    message.error(error.response.status + ' Server not found');
                }

            });
        this.setState({
            finish: true
        })


       

    };
    Cancel = () => {
        this.setState({
            finish: true
        })




    };
    
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    handleChange(value) {
        this.setState({
            BSide: {
                Name: value,
                MST: "mst",
                Phone: "điện thoại",
                Address: "địa chỉ",
                Email: "email",
                Representative: "người đại diện",
                Position: "Chức vụ",
                BusinessLicensce: "Giấy phép kinh doanh",
                YoB: "năm sinh",
                BankAccount: "tài khoản ngân hàng",
            },
        })
    }
    
    render() {
        const config = {
            readonly: false // all options from https://xdsoft.net/jodit/doc/
        }
        if (this.state.finish) {
            return (
                <Router>
                    <Redirect push to={"/capstone/contract"} />
                    <Route exact path="/capstone/contract" render={() => <ContractTable role={this.props.role} />
                    } /></Router>
            );
        } else {


            return (

                <div style={{ fontSize: 14, height: "100vh" }} >
                    <Button type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>

                    <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >

                        <Space direction="vertical" align="center" style={{ backgroundColor: "white" }}  >
                            <Card bordered={false} >
                                <h6 style={{ textAlign: 'center', fontSize: 14 }}>Cộng hòa xã hội chủ nghĩa Việt Nam</h6>
                                <h6 style={{ textAlign: 'center', fontSize: 14 }}>Độc lập-tự do-hạnh phúc</h6>
                                <br />
                                <h2 style={{ textAlign: 'center', fontSize: 16, fontWeight: "bold" }}>Hợp đồng mua bán</h2>
                                <h6 style={{ textAlign: 'center', fontSize: 14 }}>Số<Input style={{width:"30px"}}  size="small" />/<Input style={{width:"30px"}}  size="small" /></h6>
                                <h6 style={{ fontSize: 14 }}>Hôm nay, ngày 3 tháng 11 năm 2020,
                                tại<Input style={{width:"100px"}}  size="small" />, chúng tôi gồm
                            </h6>
                            </Card>
                            <Card bordered={false}>
                                <Descriptions size="small" column={2} title={"Thông tin bên A"}  >
                                    <Descriptions.Item label={(<><b>{"Công ty/Tổ chức:"}</b></>)}>Công ty cổ phần HiSign
                                        </Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Địa chỉ:"}</b></>)}>asdasdasd</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Điện thoại:"}</b></>)}>123123123123</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Địa chỉ Email:"}</b></>)}>sfds@gmail.com</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Giấy phép kinh doanh:"}</b></>)}>123123123123</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Mã số thuế:"}</b></>)}>123123123123</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Tài khoản số:"}</b></>)}>123123123123</Descriptions.Item>
                                    {/* <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item> */}
                                    <Descriptions.Item label={(<><b>{"Do ông(bà):"}</b></>)} span={2}>Usada Pekora</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Năm sinh:"}</b></>)} span={2}>
                                        1998
                        </Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Chức vụ"}</b></>)} span={2}>
                                        Giám đốc làm đại diện
                        </Descriptions.Item>


                                </Descriptions>


                                <Descriptions title="" size="small" column={2} title="Thông tin bên B"
                                
                                >

                                    <Descriptions.Item label={(<><b>{"Công ty/Tổ chức:"}</b></>)}>
                                        <AutoComplete
                                            style={{
                                                width: 200,
                                            }}
                                            options={options}
                                        >
                                            <Input onClick={this.handleChange} size="small" placeholder="nhập tên doanh nghiệp" enterButton />
                                        </AutoComplete></Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Địa chỉ:"}</b></>)}>{this.state.BSide.Address}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Điện thoại:"}</b></>)}>{this.state.BSide.Phone}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Địa chỉ Email:"}</b></>)}>{this.state.BSide.Email}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Giấy phép kinh doanh:"}</b></>)}>{this.state.BSide.BusinessLicensce}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Mã số thuế:"}</b></>)}>{this.state.BSide.MST}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Tài khoản số:"}</b></>)}>{this.state.BSide.BankAccount}</Descriptions.Item>
                                    {/* <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item> */}
                                    <Descriptions.Item label={(<><b>{"Do ông(bà):"}</b></>)} span={2}>{this.state.BSide.Representative}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Năm sinh:"}</b></>)} span={2}>
                                        {this.state.BSide.YoB}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{"Chức vụ"}</b></>)} span={2}>
                                        {this.state.BSide.Position} làm đại diện
                        </Descriptions.Item>


                                </Descriptions>
                            </Card>
                        </Space>

                        <Space direction="vertical" style={{ backgroundColor: "white" }} >
                        <InputNumber
                        prefix="Giá trị hợp đồng"
                                title="Giá trị hợp đồng"
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                
                            />
                            <h6 style={{ fontSize: 16 }}>Chúng tôi thỏa thuận với các điều khoản sau
                            </h6>
                            <JoditEditor

                                value={this.state.contractContent}
                                config={config}
                                tabIndex={1} // tabIndex of textarea

                                onChange={this.rteChange}
                            />
                            <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                                <Card bordered={false}>

                                    <Form

                                        name="basic"
                                        className="lcontract-form"

                                        onFinish={this.onFinish}
                                        onFinishFailed={this.onFinishFailed}

                                    >

                                        <h6 style={{ fontSize: 14 }}>Hợp đồng có hiệu lực kể từ ngày 3 tháng 11 năm 2020 đến
                                        <DatePicker size="small" bordered={false} />
                            </h6>
                                        <Space size="large">

                                            <Button type="primary" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            nộp
                                                    </Button>

                                            <Button type="primary" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            Lưu
                                                    </Button>


                                        </Space>
                                    </Form>

                                </Card>
                            </Space>
                        </Space>

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