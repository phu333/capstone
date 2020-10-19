import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Space, Breadcrumb, PageHeader } from 'antd';
class EmployeeSearch extends React.Component {
    

    render() {
        return (
            <div>





                <br />
                <div className="container">
                    <PageHeader
                        className="site-page-header"

                        title={[<Space size="large">

                            <Breadcrumb>
                                <Breadcrumb.Item>Tất cả</Breadcrumb.Item>
                              
                                <Breadcrumb.Item>đang có hiệu lực</Breadcrumb.Item>
                                <Breadcrumb.Item>hết hiệu lực</Breadcrumb.Item>
                            </Breadcrumb>

                        </Space>]}
                        extra={[

                            <Space size="large">
                                <input ref="searchInput" />
                                <Button type="primary" shape="circle" icon={<SearchOutlined />} />
                            </Space>
                        ]}
                    >



                    </PageHeader>

                </div>

            </div>);
    }
}
export default EmployeeSearch;