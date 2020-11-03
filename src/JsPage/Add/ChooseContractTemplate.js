
import { Table, Space, Button, PageHeader } from 'antd';
import CreateContract from '../Add/CreateContract';
import React from 'react';
import ContractTypeSearch from '../Search/ContractTypeSearch'
import ContractTable from '../Table/ContractTable'
import { UserAddOutlined, SearchOutlined, FileOutlined } from "@ant-design/icons"
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import JoditEditor from "jodit-react";
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
            contractContent: '<p class="ql-align-justify"><strong>Điều 1. Đối tượng của hợp đồng:</strong></p><p class="ql-align-justify">Theo yêu cầu của bên A về việc thực hiện hoạt động môi giới thương mại … (ghi rõ các nội dung hoạt động môi giới thương mại, như: làm trung gian cho các bên mua bán hàng hoá, cung ứng dịch vụ trong việc đàm phán, giao kết hợp đồng mua bán hàng hoá, dịch vụ, …), bên B đảm nhận và thực hiện …</p><p class="ql-align-justify">(Đối tượng của hợp đồng môi giới thương mại là công việc có thể thực hiện được, không vi phạm điều cấm của luật, không trái đạo đức xã hội).</p><p class="ql-align-justify"><strong>Điều 2. Thời hạn thực hiện hợp đồng:</strong></p><p class="ql-align-justify">Hợp đồng này được thực hiện kể từ ngày … / …/ …</p><p class="ql-align-justify">Thời gian dự kiến hoàn thành: là … ngày, kể từ ngày …/ …/ … đến hết ngày ngày …/ …/ …</p><p class="ql-align-justify">(Bên A và bên B thoả thuận thời hạn cụ thể và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>Điều 3. Nghĩa vụ và quyền của bên A:</strong></p><p class="ql-align-justify"><strong>1. Nghĩa vụ của bên A:</strong></p><p class="ql-align-justify">a) Cung cấp các thông tin, tài liệu, phương tiện cần thiết liên quan đến hàng hoá, dịch vụ;</p><p class="ql-align-justify">b) Trả thù lao môi giới và các chi phí hợp lý khác cho bên môi giới.</p><p class="ql-align-justify">(Bên A và bên B thoả thuận các nghĩa vụ cụ thể khác và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>2. Quyền của bên A:</strong></p><p class="ql-align-justify">Yêu cầu bên B thực hiện hoạt động môi giới thương mại theo đúng các nội dung đã thỏa thuận tại Điều 1 của hợp đồng này.</p><p class="ql-align-justify">Trường hợp bên B vi phạm nghiêm trọng nghĩa vụ hoặc quy định tại hợp đồng này, thì bên A có quyền đơn phương chấm dứt thực hiện hợp đồng và yêu cầu bồi thường thiệt hại.</p><p class="ql-align-justify">(Bên A và bên B thoả thuận các quyền cụ thể khác và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>Điều 4. Nghĩa vụ và quyền của bên B:</strong></p><p class="ql-align-justify"><strong>1. Nghĩa vụ của bên B:</strong></p><p class="ql-align-justify">Bảo quản các mẫu hàng hoá, tài liệu được giao để thực hiện việc môi giới và phải hoàn trả cho bên được môi giới sau khi hoàn thành việc môi giới;</p><p class="ql-align-justify">Không được tiết lộ, cung cấp thông tin làm phương hại đến lợi ích của bên được môi giới;</p><p class="ql-align-justify">Chịu trách nhiệm về tư cách pháp lý của các bên được môi giới, nhưng không chịu trách nhiệm về khả năng thanh toán của họ;</p><p class="ql-align-justify">Không được tham gia thực hiện hợp đồng giữa các bên được môi giới, trừ trường hợp có uỷ quyền của bên được môi giới.</p><p class="ql-align-justify">(Bên A và bên B thoả thuận các nghĩa vụ cụ thể khác và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>2. Quyền của bên B:</strong></p><p class="ql-align-justify">Yêu cầu bên A cung cấp thông tin, tài liệu và phương tiện để thực hiện công việc.</p><p class="ql-align-justify">Được tiến hành các nghiệp vụ trung gian môi giới thương mai, như: … (tuỳ theo từng nội dung hoạt động môi giới thương mại quy định tại Điều 1 của hợp đồng này).</p><p class="ql-align-justify">Yêu cầu bên A trả tiền thù lao môi giới theo quy định tại Điều 5 của hợp đồng này.</p><p class="ql-align-justify">(Bên A và bên B thoả thuận các quyền cụ thể khác và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>Điều 5. Tiền thù lao môi giới và phương thức thanh toán:</strong></p><p class="ql-align-justify">1. Tiền thù lao môi giới: Thực hiện công việc tại Điều 1 là: … đồng (Bằng chữ: …), đã bao gồm … % tiền thuế giá trị gia tăng.</p><p class="ql-align-justify">2. Phương thức thanh toán: …</p><p class="ql-align-justify">(Bên A và bên B thoả thuận cụ thể về phương thức thanh toán và ghi vào trong hợp đồng này).</p><p class="ql-align-justify"><strong>Điều 6. Chi phí khác:</strong></p><p class="ql-align-justify">Bên A phải thanh toán các chi phí phát sinh hợp lý liên quan đến việc môi giới, kể cả khi việc môi giới không mang lại kết quả cho bên A.</p><p class="ql-align-justify">Chi phí khác hai bên thỏa thuận bổ sung nếu xét thấy cần thiết và đúng quy định của pháp luật.</p><p class="ql-align-justify"><strong>Điều 7. Đơn phương chấm dứt thực hiện hợp đồng:</strong></p><p class="ql-align-justify">1. Trường hợp việc tiếp tục thực hiện hoạt động môi giới thương mại hoặc công việc không có lợi cho bên A thì bên A có quyền đơn phương chấm dứt thực hiện hợp đồng, nhưng phải báo cho bên B biết trước … ngày. Bên A phải trả tiền thù lao môi giới theo phần hoạt động môi giới thương mại hoặc công việc mà bên B đã thực hiện và bồi thường thiệt hại (theo thoả thuận nếu có).</p><p class="ql-align-justify">2. Trường hợp bên A vi phạm nghiêm trọng nghĩa vụ hoặc quy định tại hợp đồng này thì bên B có quyền đơn phương chấm dứt thực hiện hợp đồng và yêu cầu bồi thường thiệt hại.</p><p class="ql-align-justify"><strong>Điều 8. Phương thực giải quyết tranh chấp:</strong></p><p class="ql-align-justify">Trong quá trình thực hiện hợp đồng, nếu có vấn đề phát sinh cần giải quyết, thì hai bên tiến hành thỏa thuận và thống nhất giải quyết kịp thời, hợp tình và hợp lý. Trường hợp không thỏa thuận được thì một trong các bên có quyền khởi kiện tại tòa án có thẩm quyền giải quyết vụ việc theo quy định của pháp luật.</p><p class="ql-align-justify"><strong>Điều 9. Các thoả thuận khác:</strong></p><p class="ql-align-justify">Bên A và bên B đồng ý đã hiểu rõ quyền, nghĩa vụ, lợi ích hợp pháp của mình và hậu quả pháp lý của việc giao kết hợp đồng này.</p><p class="ql-align-justify">Bên A và bên B đồng ý thực hiện theo đúng các điều khoản trong hợp đồng này và không nêu thêm điều kiện gì khác.</p><p class="ql-align-justify">Hợp đồng này được lập thành … bản, mỗi bản gồm … trang, có giá trị pháp lý như nhau và được giao cho bên A … bản, bên B … bản./.</p><p><br></p>',
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
        const config = {
            readonly: true, // all options from https://xdsoft.net/jodit/doc/
            toolbar:false
        }
        if (this.state.finish) {
            return (<Router>
                <Redirect push to={"/capstone/contract"} />
                <Route exact path="/capstone/contract" render={() => <ContractTable role={this.props.role} />
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
                        <ContractTypeSearch />
                        <Table dataSource={dataSource} >
                            <Column title="loại hợp đồng" dataIndex="contract_type" key="contract_type" />
                            <Column title="khóa" dataIndex="key" key="key" />
                            <Column title="Tên file" dataIndex="fileName" key="fileName" />

                            <Column
                                title="Xem trước"
                                key="action"
                                render={(text, record) => (
                                    <Space size="middle">
                                        <Popup trigger={<Button type="primary" icon={<FileOutlined />} >Xem trước</Button>} position="right center">
                                            <JoditEditor

                                                value={this.state.contractContent}
                                                config={config}
                                                tabIndex={1} // tabIndex of textarea


                                            />
                                        </Popup>

                                    </Space>
                                )}
                            />
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