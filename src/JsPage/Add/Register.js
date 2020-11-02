import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Steps } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import AddUserAdmin from './AddUserAdmin';
import AddCompany from './AddCompany';

const { Step } = Steps;

class AddCompany extends React.Component {
    state = { current: 0 };
    render() {
        const { current } = this.state;
        let regis;
        if (current === 0) {
            regis = <AddCompany />
        }
        else if (current === 1) { 
            regis = <AddUserAdmin /> }
        return (
            <div>


                <Steps  current={current}>
                    <Step title="Đăng ký công ty" icon={<SolutionOutlined />} status={
                        current === 0 ? 'current' : current > 0 ? 'finish' : 'process'
                    } />
                    <Step title="Đăng ký Account chủ" icon={<UserOutlined />} />
                    <Step title="Done" icon={<SmileOutlined />} />

                </Steps>
                {regis}
                <Button onClick={() => { if (current == 0) { } else { this.setState({ current: current - 1 }) } }}>
                    Quay lại
        </Button>
                <Button onClick={() => this.setState({ current: current + 1 })}>
                    Tiếp theo
        </Button>
            </div>
        );
    }


}
export default AddCompany