import React from 'react';
import ReactDOM from 'react-dom';
import {
    FileExcelOutlined, IdcardOutlined, BankOutlined, PhoneOutlined, PrinterOutlined, HomeOutlined, MailOutlined
    , ContactsOutlined, CalendarOutlined, DollarOutlined, DeleteOutlined, CloudUploadOutlined, AuditOutlined
} from '@ant-design/icons';
import ContractExtensionTable from '../Table/ContractExtensionTable'
import { Descriptions, InputNumber, Space, Button, DatePicker, Input, Card, Form, Select, Table, Comment, List, Avatar, Pagination } from 'antd';
import ContractTable from '../Table/ContractTable'
import moment from 'moment'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { parse } from 'semver';
import JoditEditor from "jodit-react";
const dateFormat = 'YYYY-MM-DD';
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
        this.modules = {
            toolbar: [

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
            editorState: EditorState.createEmpty(),
            contractContent: '<p class="ql-align-justify"><strong>Điều 1. Đối tượng của hợp đồng:</strong></p><p class="ql-align-justify">Theo yêu cầu của bên A về việc thực hiện hoạt động môi giới thương mại … (ghi rõ các nội dung hoạt động môi giới thương mại, như: làm trung gian cho các bên mua bán hàng hoá, cung ứng dịch vụ trong việc đàm phán, giao kết hợp đồng mua bán hàng hoá, dịch vụ, …), bên B đảm nhận và thực hiện …</p><p class="ql-align-justify">(Đối tượng của hợp đồng môi giới thương mại là công việc có thể thực hiện được, không vi phạm điều cấm của luật, không trái đạo đức xã hội).</p><p class="ql-align-justify"><strong>Điều 2. Thời hạn thực hiện hợp đồng:</strong></p><p class="ql-align-justify">Hợp đồng này được thực hiện kể từ ngày … / …/ …</p><p class="ql-align-justify">Thời gian dự kiến hoàn thành: là … ngày, kể từ ngày …/ …/ … đến hết ngày ngày …/ …/ …</p><p class="ql-align-justify">(Bên A và bên B thoả thuận thời hạn cụ thể và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>Điều 3. Nghĩa vụ và quyền của bên A:</strong></p><p class="ql-align-justify"><strong>1. Nghĩa vụ của bên A:</strong></p><p class="ql-align-justify">a) Cung cấp các thông tin, tài liệu, phương tiện cần thiết liên quan đến hàng hoá, dịch vụ;</p><p class="ql-align-justify">b) Trả thù lao môi giới và các chi phí hợp lý khác cho bên môi giới.</p><p class="ql-align-justify">(Bên A và bên B thoả thuận các nghĩa vụ cụ thể khác và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>2. Quyền của bên A:</strong></p><p class="ql-align-justify">Yêu cầu bên B thực hiện hoạt động môi giới thương mại theo đúng các nội dung đã thỏa thuận tại Điều 1 của hợp đồng này.</p><p class="ql-align-justify">Trường hợp bên B vi phạm nghiêm trọng nghĩa vụ hoặc quy định tại hợp đồng này, thì bên A có quyền đơn phương chấm dứt thực hiện hợp đồng và yêu cầu bồi thường thiệt hại.</p><p class="ql-align-justify">(Bên A và bên B thoả thuận các quyền cụ thể khác và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>Điều 4. Nghĩa vụ và quyền của bên B:</strong></p><p class="ql-align-justify"><strong>1. Nghĩa vụ của bên B:</strong></p><p class="ql-align-justify">Bảo quản các mẫu hàng hoá, tài liệu được giao để thực hiện việc môi giới và phải hoàn trả cho bên được môi giới sau khi hoàn thành việc môi giới;</p><p class="ql-align-justify">Không được tiết lộ, cung cấp thông tin làm phương hại đến lợi ích của bên được môi giới;</p><p class="ql-align-justify">Chịu trách nhiệm về tư cách pháp lý của các bên được môi giới, nhưng không chịu trách nhiệm về khả năng thanh toán của họ;</p><p class="ql-align-justify">Không được tham gia thực hiện hợp đồng giữa các bên được môi giới, trừ trường hợp có uỷ quyền của bên được môi giới.</p><p class="ql-align-justify">(Bên A và bên B thoả thuận các nghĩa vụ cụ thể khác và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>2. Quyền của bên B:</strong></p><p class="ql-align-justify">Yêu cầu bên A cung cấp thông tin, tài liệu và phương tiện để thực hiện công việc.</p><p class="ql-align-justify">Được tiến hành các nghiệp vụ trung gian môi giới thương mai, như: … (tuỳ theo từng nội dung hoạt động môi giới thương mại quy định tại Điều 1 của hợp đồng này).</p><p class="ql-align-justify">Yêu cầu bên A trả tiền thù lao môi giới theo quy định tại Điều 5 của hợp đồng này.</p><p class="ql-align-justify">(Bên A và bên B thoả thuận các quyền cụ thể khác và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>Điều 5. Tiền thù lao môi giới và phương thức thanh toán:</strong></p><p class="ql-align-justify">1. Tiền thù lao môi giới: Thực hiện công việc tại Điều 1 là: … đồng (Bằng chữ: …), đã bao gồm … % tiền thuế giá trị gia tăng.</p><p class="ql-align-justify">2. Phương thức thanh toán: …</p><p class="ql-align-justify">(Bên A và bên B thoả thuận cụ thể về phương thức thanh toán và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>Điều 6. Chi phí khác:</strong></p><p class="ql-align-justify">Bên A phải thanh toán các chi phí phát sinh hợp lý liên quan đến việc môi giới, kể cả khi việc môi giới không mang lại kết quả cho bên A.</p><p class="ql-align-justify">Chi phí khác hai bên thỏa thuận bổ sung nếu xét thấy cần thiết và đúng quy định của pháp luật.</p><p class="ql-align-justify"><strong>Điều 7. Đơn phương chấm dứt thực hiện hợp đồng:</strong></p><p class="ql-align-justify">1. Trường hợp việc tiếp tục thực hiện hoạt động môi giới thương mại hoặc công việc không có lợi cho bên A thì bên A có quyền đơn phương chấm dứt thực hiện hợp đồng, nhưng phải báo cho bên B biết trước … ngày. Bên A phải trả tiền thù lao môi giới theo phần hoạt động môi giới thương mại hoặc công việc mà bên B đã thực hiện và bồi thường thiệt hại (theo thoả thuận nếu có).</p><p class="ql-align-justify">2. Trường hợp bên A vi phạm nghiêm trọng nghĩa vụ hoặc quy định tại hợp đồng này thì bên B có quyền đơn phương chấm dứt thực hiện hợp đồng và yêu cầu bồi thường thiệt hại.</p><p class="ql-align-justify"><strong>Điều 8. Phương thực giải quyết tranh chấp:</strong></p><p class="ql-align-justify">Trong quá trình thực hiện hợp đồng, nếu có vấn đề phát sinh cần giải quyết, thì hai bên tiến hành thỏa thuận và thống nhất giải quyết kịp thời, hợp tình và hợp lý. Trường hợp không thỏa thuận được thì một trong các bên có quyền khởi kiện tại tòa án có thẩm quyền giải quyết vụ việc theo quy định của pháp luật.</p><p class="ql-align-justify"><strong>Điều 9. Các thoả thuận khác:</strong></p><p class="ql-align-justify">Bên A và bên B đồng ý đã hiểu rõ quyền, nghĩa vụ, lợi ích hợp pháp của mình và hậu quả pháp lý của việc giao kết hợp đồng này.</p><p class="ql-align-justify">Bên A và bên B đồng ý thực hiện theo đúng các điều khoản trong hợp đồng này và không nêu thêm điều kiện gì khác.</p><p class="ql-align-justify">Hợp đồng này được lập thành … bản, mỗi bản gồm … trang, có giá trị pháp lý như nhau và được giao cho bên A … bản, bên B … bản./.</p><p><br></p>',
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
            isEdit: false,
        };

        this.OpenExtension = this.OpenExtension.bind(this)
        this.OpenCommentSection = this.OpenCommentSection.bind(this)
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }
    onEditorStateChange(editorState) {
        console.log(editorState)
        this.setState({
            editorState: editorState,
        });
    };
    onEdit = (values) => {
        this.setState({
            isEdit: true
        })




    };
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
    onPageChange = page => {
        console.log(page);
        this.setState({
            currentPage: page,
        });
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
        const config = {
            readonly: true, // all options from https://xdsoft.net/jodit/doc/
            toolbar:false
        }
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
                    return (
                        <Router>
                            <Redirect push to={"/capstone/" + this.state.showComponent} />
                            <Route exact path="/capstone/contract" render={() => <ContractTable role={this.props.role} />
                            } /></Router>
                    );
                } else {
                    return (

<<<<<<< HEAD
                        <div style={{ height: "100vh" }}>
                            <br/>
=======
                        <div style={{ height: "100vh", fontSize: 14 }}>
>>>>>>> origin/main
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

                                    <JoditEditor

                                        value={this.state.contractContent}
                                        config={config}
                                        tabIndex={1} // tabIndex of textarea


                                    />
                                </Space>
                                <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                                    <Card>

                                        <Form

                                            name="basic"
                                            className="lcontract-form"

                                            onFinish={this.onFinish}
                                            onFinishFailed={this.onFinishFailed}

                                        >

                                            <Space size="large">
                                                {comments.length > 0 && <CommentList comments={comments} />}
                                                {this.props.contract.status == "pending" && this.state.isEdit === false ? <Button type="primary" value="Sign" onClick={this.onFinish}>{/*Nút này xuất hiện khi chưa ai kí hợp đồng nhưng chỉ có director mới thấy*/}
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
                                                {this.props.contract.status == "pending" && this.state.isEdit === false ? <Button type="primary" onClick={this.onEdit} value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            Sửa
                                                    </Button> : null}
                                                {this.props.contract.status == "pending" && this.state.isEdit === true ? <Button type="primary" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            nộp
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
                            </Space>
                        </div>

                    );
                }
            }

        } else {



            if (this.state.openExtension) {
                return (
                    <Router>
                        <Redirect push to={"/capstone/viewContract/" + this.props.contract.id + "/viewExtension"} />
                        <Route exact path="/capstone/viewContract/:id/viewExtension" render={() => <ContractExtensionTable contractId={this.props.contract.id} role={this.props.role} />
                        } /></Router>
                );
            } else {
                if (this.state.finish) {
                    return (
                        <Router>
                            <Redirect push to={"/capstone/" + this.state.showComponent} />
                            <Route exact path="/capstone/contract" render={() => <ContractTable role={this.props.role} />
                            } /></Router>
                    );
                } else {
                    return (
                        <div style={{ height: "100vh" }}>
                            <Button type="primary" value="cancel" onClick={this.Cancel}>
                                Trở về
              </Button>
                            <h2 style={{ textAlign: 'center' }}>Hợp đồng </h2>
                            <Space direction="vertical" align="start" >
                                <Space direction="vertical" align="start" style={{ backgroundColor: "white" }} >
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
                                <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >

                                    <JoditEditor

                                        value={this.state.contractContent}
                                        config={config}
                                        tabIndex={1} // tabIndex of textarea


                                    />
                                </Space>
                                <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                                    <Card>

                                        <Form

                                            name="basic"
                                            className="lcontract-form"

                                            onFinish={this.onFinish}
                                            onFinishFailed={this.onFinishFailed}

                                        >


                                            <Space size="large">
                                                {comments.length > 0 && <CommentList comments={comments} />}
                                                {this.props.contract.status == "pending" && this.state.isEdit === true ? <Button type="primary" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            nộp
                                                    </Button> : null}

                                                {this.props.contract.status == "pending" && this.state.isEdit === false ? <Button type="primary" onClick={this.onEdit} value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
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
                            </Space>


                        </div>

                    );
                }
            }
        }
    }
}
export default ContractView