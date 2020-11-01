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
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;



class CreateContract extends React.Component {
    constructor() {
        super();

        this.state = {
            editorState: EditorState.createWithContent(
                ContentState.createFromBlockArray(
                  convertFromHTML('<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;"><strong>Điều 1. Đối tượng của hợp đồng:</strong></span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">Theo yêu cầu của bên A về việc thực hiện hoạt động môi giới thương mại … (ghi rõ các nội dung hoạt động môi giới thương mại, như: làm trung gian cho các bên mua bán hàng hoá, cung ứng dịch vụ trong việc đàm phán, giao kết hợp đồng mua bán hàng hoá, dịch vụ, …), bên B đảm nhận và thực hiện …</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">(Đối tượng của hợp đồng môi giới thương mại là công việc có thể thực hiện được, không vi phạm điều cấm của luật, không trái đạo đức xã hội).</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;"><strong>Điều 2. Thời hạn thực hiện hợp đồng:</strong></span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">Hợp đồng này được thực hiện kể từ ngày … / …/ …</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">Thời gian dự kiến hoàn thành: là … ngày, kể từ ngày …/ …/ … đến hết ngày ngày …/ …/ …</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">(Bên A và bên B thoả thuận thời hạn cụ thể và ghi vào trong hợp đồng này).</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;"><strong>Điều 3. Nghĩa vụ và quyền của bên A:</strong></span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;"><strong>1. Nghĩa vụ của bên A:</strong></span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">a) Cung cấp các thông tin, tài liệu, phương tiện cần thiết liên quan đến hàng hoá, dịch vụ;</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">b) Trả thù lao môi giới và các chi phí hợp lý khác cho bên môi giới.</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">(Bên A và bên B thoả thuận các nghĩa vụ cụ thể khác và ghi vào trong hợp đồng này).</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;"><strong>2. Quyền của bên A:</strong></span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">Yêu cầu bên B thực hiện hoạt động môi giới thương mại theo đúng các nội dung đã thỏa thuận tại Điều 1 của hợp đồng này.</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">Trường hợp bên B vi phạm nghiêm trọng nghĩa vụ hoặc quy định tại hợp đồng này, thì bên A có quyền đơn phương chấm dứt thực hiện hợp đồng và yêu cầu bồi thường thiệt hại.</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">(Bên A và bên B thoả thuận các quyền cụ thể khác và ghi vào trong hợp đồng này).</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;"><strong>Điều 4. Nghĩa vụ và quyền của bên B:</strong></span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;"><strong>1. Nghĩa vụ của bên B:</strong></span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">Bảo quản các mẫu hàng hoá, tài liệu được giao để thực hiện việc môi giới và phải hoàn trả cho bên được môi giới sau khi hoàn thành việc môi giới;</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">Không được tiết lộ, cung cấp thông tin làm phương hại đến lợi ích của bên được môi giới;</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">Chịu trách nhiệm về tư cách pháp lý của các bên được môi giới, nhưng không chịu trách nhiệm về khả năng thanh toán của họ;</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">Không được tham gia thực hiện hợp đồng giữa các bên được môi giới, trừ trường hợp có uỷ quyền của bên được môi giới.</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">(Bên A và bên B thoả thuận các nghĩa vụ cụ thể khác và ghi vào trong hợp đồng này).</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;"><strong>2. Quyền của bên B:</strong></span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">Yêu cầu bên A cung cấp thông tin, tài liệu và phương tiện để thực hiện công việc.</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">Được tiến hành các nghiệp vụ trung gian môi giới thương mai, như: … (tuỳ theo từng nội dung hoạt động môi giới thương mại quy định tại Điều 1 của hợp đồng này).</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">Yêu cầu bên A trả tiền thù lao môi giới theo quy định tại Điều 5 của hợp đồng này.</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">(Bên A và bên B thoả thuận các quyền cụ thể khác và ghi vào trong hợp đồng này).</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;"><strong>Điều 5. Tiền thù lao môi giới và phương thức thanh toán:</strong></span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">1. Tiền thù lao môi giới: Thực hiện công việc tại Điều 1 là: … đồng (Bằng chữ: …), đã bao gồm … % tiền thuế giá trị gia tăng.</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">2. Phương thức thanh toán: …</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">(Bên A và bên B thoả thuận cụ thể về phương thức thanh toán và ghi vào trong hợp đồng này).</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;"><strong>Điều 6. Chi phí khác:</strong></span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">Bên A phải thanh toán các chi phí phát sinh hợp lý liên quan đến việc môi giới, kể cả khi việc môi giới không mang lại kết quả cho bên A.</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">Chi phí khác hai bên thỏa thuận bổ sung nếu xét thấy cần thiết và đúng quy định của pháp luật.</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;"><strong>Điều 7. Đơn phương chấm dứt thực hiện hợp đồng:</strong></span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">1. Trường hợp việc tiếp tục thực hiện hoạt động môi giới thương mại hoặc công việc không có lợi cho bên A thì bên A có quyền đơn phương chấm dứt thực hiện hợp đồng, nhưng phải báo cho bên B biết trước … ngày. Bên A phải trả tiền thù lao môi giới theo phần hoạt động môi giới thương mại hoặc công việc mà bên B đã thực hiện và bồi thường thiệt hại (theo thoả thuận nếu có).</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">2. Trường hợp bên A vi phạm nghiêm trọng nghĩa vụ hoặc quy định tại hợp đồng này thì bên B có quyền đơn phương chấm dứt thực hiện hợp đồng và yêu cầu bồi thường thiệt hại.</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;"><strong>Điều 8. Phương thực giải quyết tranh chấp:</strong></span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">Trong quá trình thực hiện hợp đồng, nếu có vấn đề phát sinh cần giải quyết, thì hai bên tiến hành thỏa thuận và thống nhất giải quyết kịp thời, hợp tình và hợp lý. Trường hợp không thỏa thuận được thì một trong các bên có quyền khởi kiện tại tòa án có thẩm quyền giải quyết vụ việc theo quy định của pháp luật.</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;"><strong>Điều 9. Các thoả thuận khác:</strong></span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">Bên A và bên B đồng ý đã hiểu rõ quyền, nghĩa vụ, lợi ích hợp pháp của mình và hậu quả pháp lý của việc giao kết hợp đồng này.</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">Bên A và bên B đồng ý thực hiện theo đúng các điều khoản trong hợp đồng này và không nêu thêm điều kiện gì khác.</span></p>'
                  +'<p style="text-align:justify;"><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, Helvetica, sans-serif;">Hợp đồng này được lập thành … bản, mỗi bản gồm … trang, có giá trị pháp lý như nhau và được giao cho bên A … bản, bên B … bản./.</span>&nbsp;</p>'
                  )
                )
              ),
            TheChooseOne: {
                Name: "",
                MST: "",
                Address: "",
                Email: "",
                Owner: "",
            },
            currntPage: 1,
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
        this.onEditorStateChange = this.onEditorStateChange.bind(this);

    }
    onEditorStateChange(editorState) {
        console.log(editorState)
        this.setState({
            editorState: editorState,
        });
    };
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

                <div style={{ fontSize: 14 }} >
                    <Button type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>

                    <Space direction="vertical" align="center" >

                        <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                            <Card>
                                <h6 style={{ textAlign: 'center', fontSize: 14 }}>Cộng hòa xã hội chủ nghĩa Việt Nam</h6>
                                <h6 style={{ textAlign: 'center', fontSize: 14 }}>Độc lập-tự do-hạnh phúc</h6>
                                <br />
                                <br />
                                <h2 style={{ textAlign: 'center', fontSize: 16, fontWeight: "bold" }}>Hợp đồng </h2>
                            </Card>
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

                        <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                             
                            <Editor
                                editorState={this.state.editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onEditorStateChange}
                            />
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