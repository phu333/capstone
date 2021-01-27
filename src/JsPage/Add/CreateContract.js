import React from 'react';
import { createContract, contractInformation, } from '../../actions/ContractAction'
import { Select, Descriptions, Space, Button, InputNumber, Form, Table, Input, Col, Card, message } from 'antd';
import { connect } from 'react-redux'
import ContractTable from '../Table/ContractTable'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import Autocomplete from 'react-autocomplete';


import axios from 'axios'

import JoditEditor from 'jodit-react';




class CreateContract extends React.Component {
    constructor() {
        super();
        this.modules = {
            toolbar: [
                [{ "font": [] }],
                [{ "size": ["small", false, "large", "huge"] }],
                ["bold", "italic", "underline"],
                [{ "list": "ordered" }, { "list": "bullet" }],
                [{ "align": [] }],
                [{ "color": [] }, { "background": [] }],
                ["clean"]
            ]
        };

        this.formats = [
            "font",
            "size",
            "bold", "italic", "underline",
            "list", "bullet",
            "align",
            "color", "background"
        ];
        this.state = {

            BSide: {
               
            },
            
            finish: false,
            contractNum: "",
            contractName: "",
            contractValue: 0,
            contractContent: "",
            customerName: "",
            contractTitle: "",
            contractPlace: "",
            contractExpiredDate: "",
            customers: [],
            company: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleValue = this.handleValue.bind(this);

        this.rteChange = this.rteChange.bind(this);
    }

    rteChange = (value) => {
        this.setState({
            contractContent: value.replace(/"/g, "\'").trim()
        })

    }
    componentDidMount() {
        
        axios({
            url: "/api/v1/Customer",
            method: "GET",
            headers: {
                Authorization: "Bearer " + this.props.token,

            }
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                console.log(data.data)
                this.setState({
                    customers: data.data,
                })


            })
            .catch(error => {
                console.log(error)


            });
        axios({
            url: "/api/v1/Company/info",
            method: "PUT",
            headers: {
                Authorization: "Bearer " + this.props.token,

            }
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                console.log(data.data)
                this.setState({
                    company: data.data
                })
                console.log(this.state.company)
            })
            .catch(error => {
                console.log(error)


            });

    }
    onFinish = (values) => {
        var header = "<p style='margin: 0px; padding: 8px 0px 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; font-size: 16px; line-height: 25px; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; text-align: center;'><span style='margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: 16px !important; line-height: 25px; font-family: inherit; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0);'><strong style='margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: bold; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline;'>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></span></p><p style='margin: 0px; padding: 8px 0px 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; font-size: 16px; line-height: 25px; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; text-align: center;'><span style='margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: 16px !important; line-height: 25px; font-family: inherit; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0);'>Độ<u style='margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: baseline;'>c lập - Tự do - Hạnh ph</u>úc</span></p><p style='margin: 0px; padding: 8px 0px 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; font-size: 16px; line-height: 25px; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; text-align: right;'><br></p><p style='margin: 0px; padding: 8px 0px 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; font-size: 16px; line-height: 25px; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; text-align: center;'><span style='margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: 16px !important; line-height: 25px; font-family: inherit; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0);'><strong style='margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: bold; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline;'>" + this.props.template.name + "</strong></span></p></br><h6 style='box-sizing: border-box; margin-top: 0px; margin-bottom: 0.5em; font-weight: 500; line-height: 1.2; font-size: 14px; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; text-align: center;'>Số<span>&nbsp;</span>" + this.state.contractNum + "</h6><h6 style='box-sizing: border-box; margin-top: 0px; margin-bottom: 0.5em; font-weight: 500; line-height: 1.2; font-size: 14px; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>Hôm nay, ngày 3 tháng 11 năm 2020, tại<span>&nbsp;</span>" + this.state.contractPlace + ", chúng tôi gồm</h6>"
        var aInformation = '<p><strong style="margin: 0px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; font-size: 16px; line-height: inherit; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Bên A : </strong><span style="color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;"></span><strong style="margin: 0px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; font-size: 16px; line-height: inherit; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></strong></p></br><table style="box-sizing: border-box; border-collapse: collapse; width: 500px; table-layout: fixed; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><tbody style="box-sizing: border-box;"><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Công ty/Tổ chức:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.name + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Địa chỉ:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.address + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Điện thoại:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.phoneNumber + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Địa chỉ Email:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.email + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Giấy phép kinh doanh:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.businessLicense + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Mã số thuế:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.taxCode + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Tài khoản số:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.bankAccount + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Do ông(bà):</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.name + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box; border-bottom: none;"><td class="ant-descriptions-item" colspan="2" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Chức vụ</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">........làm đại diện</span></div></td></tr></tbody></table>'
        var bInformation = '<p><strong style="margin: 0px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; font-size: 16px; line-height: inherit; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Bên B : </strong><span style="color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;"></span><strong style="margin: 0px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; font-size: 16px; line-height: inherit; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></strong></p></br><table style="box-sizing: border-box; border-collapse: collapse; width: 500px; table-layout: fixed; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><tbody style="box-sizing: border-box;"><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Công ty/Tổ chức:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.name + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Địa chỉ:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.address + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Điện thoại:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.phoneNumber + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Địa chỉ Email:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.email + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Giấy phép kinh doanh:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.businessLicense + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Mã số thuế:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.taxCode + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Tài khoản số:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.bankAccount + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Do ông(bà):</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.name + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box; border-bottom: none;"><td class="ant-descriptions-item" colspan="2" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Chức vụ</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">........làm đại diện</span></div></td></tr></tbody></table>'
        var value = "<p><strong style='margin: 0px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; font-size: 16px; line-height: inherit; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>Giá trị hợp đồng : (</strong><span style='color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;'>" + this.state.contractValue + "</span><strong style='margin: 0px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; font-size: 16px; line-height: inherit; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>)</strong></p>"

        var footer = '<p>footer</p>'
        const contract = {
            contractTitle: this.props.template.name,
            contractNum: this.state.contractNum,
            contractName: this.props.template.name,
            contractPlace: this.state.contractPlace,
            contractExpiredDate: this.state.contractExpiredDate + 'T13:55:57.445Z',
            contractValue: this.state.contractValue,
            contractContent: this.state.contractContent,
            contractTypeId: this.props.template.id,
            customerId: this.state.BSide.id,
            header: header,
            aInformation: aInformation.replace(/"/g, "\'"),
            bInformation: bInformation.replace(/"/g, "\'"),
            value: value,
            contractLaw: this.state.contractContent,
            footer: footer,
            isMainContract: true,
        }
        console.log(contract)
        axios({
            url: "/api/v1/Contract",
            method: "POST",
            headers: {
                Authorization: "Bearer " + this.props.token,

            },
            data: contract
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                setTimeout(function () {
                    this.setState({
                        finish: true
                    })
                }.bind(this), 5000)
                message.success("taọ thành công")

            })
            .catch(error => {
                message.error("Đã có lỗi xảy ra vui lòng kiểm tra thông tin đã nhập và thử lại sau")
                console.log(error)

            });





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
        console.log(value);
        
    }
    handleValue(value) {
        console.log(value)
        this.setState({
            contractValue: parseFloat(value.target.value)
        })
    }
    render() {
        var today = new Date()
        const config = {
            readonly: false // all options from https://xdsoft.net/jodit/doc/
        }
        // const Complete = () => (
        //     <AutoComplete

        //     style={{ width: 400 }}
        //     placeholder='Chọn khách hàng'

        //     items={this.state.customers}

        //     getItemValue={(item) => item.name}
        //     renderItem={(item, isHighlighted) =>
        //         <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
        //           {item.name}
        //         </div>
        //       }
        //       value={this.state.BSide.Name}
        //       onChange={(e) =>  this.setState({
        //         customerName:e.target.value
        //       })}
        //       onSelect={(val) => this.setState({
        //           BSide:val
        //       })}
        // />


        //   );
        if (this.state.finish) {
            return (
                <Router>
                    <Redirect push to={'/capstone/contract'} />
                    <Route exact path='/capstone/contract' render={() => <ContractTable token={this.props.token} role={this.props.role} />
                    } /></Router>
            );
        } else {


            return (

                <div style={{ fontSize: 14, height: '100vh' }} >
                    <Button type='primary' value='cancel' onClick={this.Cancel}>
                        Trở về
              </Button>

                    <Space direction='vertical' align='center' style={{ backgroundColor: 'white' }} >

                        <Space direction='vertical' align='center' style={{ backgroundColor: 'white' }}  >
                            <Card bordered={false} >
                                <h6 style={{ textAlign: 'center', fontSize: 14 }}>Cộng hòa xã hội chủ nghĩa Việt Nam</h6>
                                <h6 style={{ textAlign: 'center', fontSize: 14 }}>Độc lập-tự do-hạnh phúc</h6>
                                <br />
                                <h2 style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>{this.props.template.name}</h2>
                                <h6 style={{ textAlign: 'center', fontSize: 14 }}>Số id/<Input style={{ width: '100px' }} size='small'
                                    onChange={(value) => {
                                        this.setState({
                                            contractNum: value.target.value
                                        })
                                    }} />
                                </h6>
                                <h6 style={{ fontSize: 14 }}>Hôm nay, (Ngày tháng sẽ được xác định khi hợp đồng có hiệu lực),
                                tại<Input style={{ width: '100px' }} size='small'
                                        onChange={(value) => {
                                            this.setState({
                                                contractPlace: value.target.value
                                            })
                                        }} />, chúng tôi gồm
                            </h6>
                            </Card>
                            <Card bordered={false}>
                                <Descriptions size='small' column={2} title={'Thông tin bên A'}  >
                                    <Descriptions.Item label={(<><b>{'Công ty/Tổ chức'}</b></>)}>{this.state.company.name}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Địa chỉ'}</b></>)}>{this.state.company.address}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Điện thoại'}</b></>)}>{this.state.company.phoneNumber}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Địa chỉ Email'}</b></>)}>{this.state.company.email}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Giấy phép kinh doanh'}</b></>)}>{this.state.company.businessLicense}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Mã số thuế'}</b></>)}>{this.state.company.taxCode}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Tài khoản số'}</b></>)}>{this.state.company.bankAccount}</Descriptions.Item>
                                    {/* <Descriptions.Item label={(<b><PrinterOutlined />{'Số Fax:'}</b>)}>123123123123</Descriptions.Item> */}
                                    <Descriptions.Item label={(<><b>{'Do ông(bà)'}</b></>)} span={2}>{this.state.company.name}</Descriptions.Item>

                                    <Descriptions.Item label={(<><b>{'Chức vụ'}</b></>)} span={2}>
                                        Giám đốc làm đại diện
                        </Descriptions.Item>


                                </Descriptions>


                                <Descriptions title='' size='small' column={2} title='Thông tin bên B'

                                >

                                    <Descriptions.Item label={(<><b>{'Công ty/Tổ chức'}</b></>)}>
                                       
                                        <Autocomplete
                                        
                                            value={this.state.customerName}
                                            items={this.state.customers}
                                            getItemValue={item => item.name}
                                            shouldItemRender={(state, val)=>
                                                state.name.toLowerCase().indexOf(val.toLowerCase()) !== -1
                                            }
                                            renderMenu={item => (
                                                <div className="dropdown">
                                                    {item}
                                                </div>
                                            )}
                                            renderItem={(item, isHighlighted) =>
                                                <div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
                                                    {item.name}
                                                </div>
                                            }
                                            onChange={(event, val) => this.setState({ customerName:val })}
                                            onSelect={val => this.setState({ customerName:val,BSide:this.state.customers.find(
                                                customer=>customer.name === val
                                                
                                                ) })}
                                        />
                                    </Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Địa chỉ'}</b></>)}>{this.state.BSide.address}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Điện thoại'}</b></>)}>{this.state.BSide.phoneNumber}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Địa chỉ Email'}</b></>)}>{this.state.BSide.email}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Giấy phép kinh doanh'}</b></>)}>{this.state.BSide.businessLicense}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Mã số thuế'}</b></>)}>{this.state.BSide.taxCode}</Descriptions.Item>
                                    <Descriptions.Item label={(<><b>{'Tài khoản số'}</b></>)}>{this.state.BSide.bankAccount}</Descriptions.Item>
                                    {/* <Descriptions.Item label={(<b><PrinterOutlined />{'Số Fax:'}</b>)}>123123123123</Descriptions.Item> */}
                                    <Descriptions.Item label={(<><b>{'Do ông(bà):'}</b></>)} span={2}>{this.state.BSide.name}</Descriptions.Item>

                                    <Descriptions.Item label={(<><b>{'Chức vụ'}</b></>)} span={2}>
                                        {this.state.BSide.Position} làm đại diện
                        </Descriptions.Item>


                                </Descriptions>
                            </Card>
                        </Space>

                        <Space direction='vertical' style={{ backgroundColor: 'white' }} >

                            <h6 style={{ fontSize: 16 }}>Chúng tôi thỏa thuận với các điều khoản sau
                            </h6>
                            <JoditEditor

                                value={this.props.template.content.trim()}
                                config={config}
                                tabIndex={1} // tabIndex of textarea

                                onChange={this.rteChange}
                            />
                            <Space direction='horizontal' align='center' style={{ backgroundColor: 'white' }} >
                                <Card bordered={false}>

                                    <Form

                                        name='basic'
                                        className='contract-form'

                                        onFinish={this.onFinish}
                                        onFinishFailed={this.onFinishFailed}

                                    >
                              <h6 style={{ fontSize: 14 }}>  Giá trị hợp đồng:<input type="text" pattern="[0-9]*" prefix="VND"
                                    onInput={this.handleValue} /> x1000 VNĐ</h6>
                                        <h6 style={{ fontSize: 14 }}>Hợp đồng có hiệu lực kể từ ngày(Sẽ hiển thị khi hợp đồng có hiệu lực) đến
                                        <input
                                                type="text"
                                                onChange={value => this.setState({
                                                    contractExpiredDate: value.target.value
                                                })}
                                            />
                                        </h6>
                                        <Space size='large'>

                                            <Button type='primary' htmlType='submit' value='Edit'>{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                                                            nộp
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