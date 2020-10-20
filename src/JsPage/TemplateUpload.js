import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Select, DatePicker } from 'antd';
import { List, Avatar, Button, Skeleton, Checkbox } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
const { Option } = Select;
class TemplateUpload extends React.Component {
    constructor() {
        super();

        this.state = {
            approvalBeforeSign: false,
            approverList: [],

        };

        this.handleChange = this.handleChange.bind(this);
        this.ChooseApproval = this.ChooseApproval.bind(this);

    }
    handleChange(value) {
        console.log(value)
        if (value === "yes") {
            this.setState({
                approvalBeforeSign: true,
            })
        } else {
            this.setState({
                approvalBeforeSign: false,
            })
        }

    }
    ChooseApproval(value) {


        this.setState({
            approverList: this.state.approverList.concat(value)
        })
    }

    render() {


        return (
            <div style={{ height: "100vh" }}>

                <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                <link rel="shortcut icon" href="http://localhost:3001/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta name="description" content="Web site created using create-react-app" />
                <link rel="apple-touch-icon" href="http://localhost:3001/logo192.png" />
                <title>PDF Signaturer</title>
                <style
                    data-styled
                    data-styled-version="4.4.0"
                    dangerouslySetInnerHTML={{
                        __html:
                            "\n/* sc-component-id: sc-bdVaJa */\n.ftKihC{padding-top:20px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;} .ftKihC canvas{border:3px solid #eee;border-radius:4px;background:white;width:100%;height:100%;padding:3px;} .ftKihC div{padding:10px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;} .ftKihC div button{background:#1a82cc;border:0;padding:15px;margin-left:10px;border-radius:4px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}\n/* sc-component-id: sc-bwzfXH */\n.bzSLKe{padding-top:20px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;} .bzSLKe iframe{border:3px solid #eee;border-radius:4px;background:white;width:100%;height:100%;min-height:500px;padding:3px;}\n/* sc-component-id: sc-htpNat */\n.hpgyVh[disabled]{cursor:not-allowed;opacity:0.6;}\n/* sc-component-id: sc-bxivhb */\n.cDZPnc{max-width:700px;background:#fff;border-radius:4px;box-shadow:0 0 20px rgba(0,0,0,0.1);padding:30px;margin:80px auto;} .cDZPnc h1{font-size:20px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;} .cDZPnc h1 svg{margin-right:10px;} .cDZPnc h1 input{-webkit-flex:1;-ms-flex:1;flex:1;border:3px solid #eee;margin-left:10%;padding:10px 15px;border-radius:4px;font-size:16px;}\n/* sc-component-id: sc-global-3878584262 */\n*{margin:0;padding:0;outline:0;box-sizing:border-box;} html,body,#root{min-height:100%;} body{background:#1A82CC;-webkit-font-smoothing:antialiased !important;} body,input,button{color:#222;font-size:14px;font-family:Arial,Helvetica,sans-serif;} button{cursor:pointer;}"
                    }}
                />
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <div id="">
                    <div className="sc-bxivhb cDZPnc">
                        <h1>
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth={0}
                                viewBox="0 0 576 512"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M218.17 424.14c-2.95-5.92-8.09-6.52-10.17-6.52s-7.22.59-10.02 6.19l-7.67 15.34c-6.37 12.78-25.03 11.37-29.48-2.09L144 386.59l-10.61 31.88c-5.89 17.66-22.38 29.53-41 29.53H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h12.39c4.83 0 9.11-3.08 10.64-7.66l18.19-54.64c3.3-9.81 12.44-16.41 22.78-16.41s19.48 6.59 22.77 16.41l13.88 41.64c19.75-16.19 54.06-9.7 66 14.16 1.89 3.78 5.49 5.95 9.36 6.26v-82.12l128-127.09V160H248c-13.2 0-24-10.8-24-24V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24v-40l-128-.11c-16.12-.31-30.58-9.28-37.83-23.75zM384 121.9c0-6.3-2.5-12.4-7-16.9L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1zm-96 225.06V416h68.99l161.68-162.78-67.88-67.88L288 346.96zm280.54-179.63l-31.87-31.87c-9.94-9.94-26.07-9.94-36.01 0l-27.25 27.25 67.88 67.88 27.25-27.25c9.95-9.94 9.95-26.07 0-36.01z" />
                            </svg>
            DOT template
            <input type="file" />
                        </h1>
                        <div className="sc-bwzfXH bzSLKe">
                            <iframe
                                title="pdframe"
                                src=""
                            />
                        </div>
                        <div className="sc-bdVaJa ftKihC">

                            <div>
                                <Button type="primary" >
                                    Nộp
                            </Button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );


    }
}

export default TemplateUpload