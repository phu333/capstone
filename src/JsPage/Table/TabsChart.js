import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tabs, Card, Select, Row, Col } from 'antd';
import 'ant-design-pro/dist/ant-design-pro.css';
import { Bar } from 'ant-design-pro/lib/Charts';
import Chart from './RevenueChart';
const { TabPane } = Tabs;
const salesMonth = [];
for (let i = 0; i < 12; i += 1) {
  salesMonth.push({
    x: `${i + 1}`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
const salesYear = [];
for (let i = 2015; i < 2020; i += 1) {
  salesYear.push({
    x: `${i + 1}`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
const { Option } = Select;

class TabsChart extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 'date'
    };

  }
  render() {
    return (
      <div style={{ backgroundColor: "white", paddingRight: "-10px" }}>
        <Row>       <Col span={14}>  < Tabs defaultActiveKey="1" >
          <TabPane tab=" Doanh thu theo tháng" key="1">


            <Bar height={200} title=" Doanh thu theo tháng" data={salesMonth} />


          </TabPane>
          <TabPane tab=" Doanh thu theo năm" key="2">

            <Bar height={200} title=" Doanh thu theo năm" data={salesYear} />
          </TabPane>
        </Tabs >   </Col>         <Col span={10}>
            <Card  style={{ width: 400,border:"thin" }}>
              <Select
                style={{ width: 200 }}
                placeholder="date"
                value={this.state.value}
                onChange={(event) => {
                  this.setState({ value: event });
                }}
              >
                <Option value="date">Date</Option>
                <Option value="month">Month</Option>
                <Option value="year">Year</Option>
              </Select>
              <p></p>
              <Chart ChartType={this.state.value} />
            </Card></Col></Row></div >)
  }
}

export default TabsChart