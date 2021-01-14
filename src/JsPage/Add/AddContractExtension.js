import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import {
    FileExcelOutlined, IdcardOutlined, BankOutlined, PhoneOutlined, PrinterOutlined, HomeOutlined, MailOutlined
    , ContactsOutlined, CalendarOutlined, DollarOutlined, DeleteOutlined, CloudUploadOutlined, AuditOutlined
} from '@ant-design/icons';
import { FileSaver } from 'file-saver';
import ContractExtensionTable from '../Table/ContractExtensionTable'
import { Descriptions, InputNumber, Space, Button, DatePicker, Input, Card, Form, Select, Table, message, List, Avatar, Pagination } from 'antd';
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

var hash = require('object-hash')




class AddContractExtension extends React.Component {
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


            
            finish: false,
           
           
           
            isEdit: false,
            company: {},
            
            customers: [],
            validSignature: false,
            contractNum: "",
            contractName: "",
            contractValue: 0,
            contractContent: "",
           
            contractTitle: "",
            contractPlace: "",
            contractExpiredDate: "",
        };

       
    }
   
    componentDidMount() {
        this.setState({
            contractNum: this.props.contract.contractNum,
            contractName: this.props.contract.contractName,
            contractValue: this.props.contract.contractValue,
            contractContent: this.props.contract.contractContent,

            contractTitle: this.props.contract.contractTitle,
            contractPlace: this.props.contract.contractPlace,
            contractExpiredDate: this.props.contract.contractExpiredDate,
        })
        axios({
            url: '/api/v1/Contract/a-side-info',
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            },
            params: {
                id: this.props.contract.id,
            }
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                console.log(data.companyId)
                this.setState({
                    creator: data.companyId
                })


            })
            .catch(error => {
                console.log(error)


            });
        axios({
            url: '/api/v1/Customer',
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

            }
        })
            .then((response) => {

                return response.data;
            })
            .then((data) => {
                console.log(data.data)
                this.setState({
                    customers: data.data.filter(
                        customer => customer.id === this.props.contract.customer.id
            
            
            
                    ),
                })


            })
            .catch(error => {
                console.log(error)


            });
        axios({
            url: '/api/v1/Company/info',
            method: "PUT",
            headers: {
                Authorization: 'Bearer ' + this.props.token,

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
                
            })
            .catch(error => {
                console.log(error)


            });

    }
    
    onFinish = () => {
        console.log(this.state.company.taxCode)
        console.log(this.state.customers[0].taxCode)
        var header = "<p style='margin: 0px; padding: 8px 0px 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; font-size: 16px; line-height: 25px; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; text-align: center;'><span style='margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: 16px !important; line-height: 25px; font-family: inherit; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0);'><strong style='margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: bold; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline;'>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong></span></p><p style='margin: 0px; padding: 8px 0px 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; font-size: 16px; line-height: 25px; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; text-align: center;'><span style='margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: 16px !important; line-height: 25px; font-family: inherit; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0);'>Độ<u style='margin: 0px; padding: 0px; border: 0px; font: inherit; vertical-align: baseline;'>c lập - Tự do - Hạnh ph</u>úc</span></p><p style='margin: 0px; padding: 8px 0px 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; font-size: 16px; line-height: 25px; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; text-align: right;'><br></p><p style='margin: 0px; padding: 8px 0px 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: 400; font-stretch: inherit; font-size: 16px; line-height: 25px; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; text-align: center;'><span style='margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; font-size: 16px !important; line-height: 25px; font-family: inherit; vertical-align: baseline; min-height: 10px; color: rgb(0, 0, 0);'><strong style='margin: 0px; padding: 0px; border: 0px; font-style: inherit; font-variant: inherit; font-weight: bold; font-stretch: inherit; font-size: inherit; line-height: inherit; font-family: inherit; vertical-align: baseline;'>" + this.props.template.name + "</strong></span></p></br><h6 style='box-sizing: border-box; margin-top: 0px; margin-bottom: 0.5em; font-weight: 500; line-height: 1.2; font-size: 14px; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; text-align: center;'>Số<span>&nbsp;</span>" + this.state.contractNum + "</h6><h6 style='box-sizing: border-box; margin-top: 0px; margin-bottom: 0.5em; font-weight: 500; line-height: 1.2; font-size: 14px; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>Hôm nay, ngày 3 tháng 11 năm 2020, tại<span>&nbsp;</span>" + this.state.contractPlace + ", chúng tôi gồm</h6>"
        var aInformation = '<p><strong style="margin: 0px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; font-size: 16px; line-height: inherit; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Bên A : </strong><span style="color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;"></span><strong style="margin: 0px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; font-size: 16px; line-height: inherit; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></strong></p></br><table style="box-sizing: border-box; border-collapse: collapse; width: 500px; table-layout: fixed; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><tbody style="box-sizing: border-box;"><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Công ty/Tổ chức:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.name + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Địa chỉ:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.address + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Điện thoại:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.phoneNumber + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Địa chỉ Email:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.email + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Giấy phép kinh doanh:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.businessLicense + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Mã số thuế:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.taxCode + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Tài khoản số:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.bankAccount + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Do ông(bà):</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.company.name + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box; border-bottom: none;"><td class="ant-descriptions-item" colspan="2" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Chức vụ</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">........làm đại diện</span></div></td></tr></tbody></table>'
        var bInformation = '<p><strong style="margin: 0px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; font-size: 16px; line-height: inherit; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Bên B : </strong><span style="color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;"></span><strong style="margin: 0px; padding: 0px; border: 0px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; font-size: 16px; line-height: inherit; font-family: Arial, Helvetica, sans-serif; vertical-align: baseline; color: rgb(0, 0, 0); letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"></strong></p></br><table style="box-sizing: border-box; border-collapse: collapse; width: 500px; table-layout: fixed; color: rgba(0, 0, 0, 0.85); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><tbody style="box-sizing: border-box;"><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Công ty/Tổ chức:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.Name + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Địa chỉ:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.Address + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Điện thoại:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.Phone + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Địa chỉ Email:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.Email + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Giấy phép kinh doanh:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.BusinessLicensce + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Mã số thuế:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.MST + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box;"><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Tài khoản số:</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.BankAccount + '</span></div></td><td class="ant-descriptions-item" colspan="1" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Do ông(bà):</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">' + this.state.BSide.Representative + '</span></div></td></tr><tr class="ant-descriptions-row" style="box-sizing: border-box; border-bottom: none;"><td class="ant-descriptions-item" colspan="2" style="box-sizing: border-box; padding-bottom: 8px; vertical-align: top;"><div class="ant-descriptions-item-container" style="box-sizing: border-box; display: flex;"><span class="ant-descriptions-item-label" style="box-sizing: border-box; color: rgba(0, 0, 0, 0.85); font-weight: normal; font-size: 14px; line-height: 1.5715; text-align: start;"><b style="box-sizing: border-box; font-weight: bolder;">Chức vụ</b></span><span class="ant-descriptions-item-content" style="box-sizing: border-box; display: table-cell; flex: 1 1 0%; color: rgba(0, 0, 0, 0.85); font-size: 14px; line-height: 1.5715; overflow-wrap: break-word;">........làm đại diện</span></div></td></tr></tbody></table>'
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
            isMainContract:false,
            belongToContractId:this.props.contract.id
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
                this.setState({
                    finish: true
                })
                message.success("tao thanh cong")

            })
            .catch(error => {
                message.error("vui long kiem tra thong tin va ket noi mang")
                console.log(error)

            });



    };
   
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    render() {
        
         
        console.log(this.state.customers)
        const bside = this.state.customers.map(customer => (
            <Descriptions title="" size="small" column={2} title="Thông tin bên B"

            >

                <Descriptions.Item label={(<><b>{"Công ty/Tổ chức"}</b></>)}>
                    {customer.name}
                </Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Địa chỉ"}</b></>)}>{customer.address}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Điện thoại"}</b></>)}>{customer.phoneNumber}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Địa chỉ Email"}</b></>)}>{customer.email}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Giấy phép kinh doanh"}</b></>)}>{customer.businessLicense}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Mã số thuế"}</b></>)}>{customer.taxCode}
                
                </Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Tài khoản số"}</b></>)}>{customer.bankAccount}</Descriptions.Item>
                {/* <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item> */}
                <Descriptions.Item label={(<><b>{"Do ông(bà):"}</b></>)} span={2}>{customer.name}</Descriptions.Item>

                <Descriptions.Item label={(<><b>{"Chức vụ"}</b></>)} span={2}>
                    làm đại diện
                        </Descriptions.Item>


            </Descriptions>
        ))
        const aside = this.state.customers.map(customer => (
            <Descriptions title="" size="small" column={2} title="Thông tin bên A"

            >

                <Descriptions.Item label={(<><b>{"Công ty/Tổ chức"}</b></>)}>
                    {customer.name}
                </Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Địa chỉ"}</b></>)}>{customer.address}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Điện thoại"}</b></>)}>{customer.phoneNumber}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Địa chỉ Email"}</b></>)}>{customer.email}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Giấy phép kinh doanh"}</b></>)}>{customer.businessLicense}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Mã số thuế"}</b></>)}>{customer.taxCode}</Descriptions.Item>
                <Descriptions.Item label={(<><b>{"Tài khoản số"}</b></>)}>{customer.bankAccount}</Descriptions.Item>
                {/* <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item> */}
                <Descriptions.Item label={(<><b>{"Do ông(bà):"}</b></>)} span={2}>{customer.name}</Descriptions.Item>

                <Descriptions.Item label={(<><b>{"Chức vụ"}</b></>)} span={2}>
                    làm đại diện
                        </Descriptions.Item>


            </Descriptions>
        ))
        const config = {
            readonly: false, // all options from https://xdsoft.net/jodit/doc/
            toolbar: true
        }
       


        
            if (this.state.finish) {
                return (
                    <Router>
                    <Redirect push to={"/capstone/viewContract/" + hash.sha1(this.props.contract.id) + "/viewExtension"} />
                    <Route exact path="/capstone/viewContract/:id/viewExtension" render={() => <ContractExtensionTable contract={this.props.contract}  role={this.props.role} />
                    } /></Router>
                );
            } else {
                return (

                    <div style={{ height: "100vh", fontSize: 14 }}>
                        <Button type="primary" value="cancel" onClick={this.Cancel}>
                            Trở về
                            </Button>

                        <Space direction="vertical" align="center" >

                            <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                                <Card bordered={false} >
                                    <h6 style={{ textAlign: 'center', fontSize: 14 }}>Cộng hòa xã hội chủ nghĩa Việt Nam</h6>
                                    <h6 style={{ textAlign: 'center', fontSize: 14 }}>Độc lập-tự do-hạnh phúc</h6>
                                    <br />
                                    <h2 style={{ textAlign: 'center', fontSize: 16, fontWeight: "bold" }}>{this.props.contract.contractName}</h2>
                                    <h6 style={{ textAlign: 'center', fontSize: 14 }}>Số {this.props.contract.contractNum}</h6>
                                    <h6 style={{ fontSize: 14 }}>Hôm nay, ngày 3 tháng 11 năm 2020,
                                    tại {this.props.contract.contractPlace}, chúng tôi gồm
                            </h6>
                                </Card>
                                {this.state.company.id === this.state.creator ? <Card>

                                    <Descriptions size="small" column={2} title={"Thông tin bên A"}  >
                                        <Descriptions.Item label={(<><b>{"Công ty/Tổ chức"}</b></>)}>{this.state.company.name}
                                        </Descriptions.Item>
                                        <Descriptions.Item label={(<><b>{"Địa chỉ"}</b></>)}>{this.state.company.address}</Descriptions.Item>
                                        <Descriptions.Item label={(<><b>{"Điện thoại"}</b></>)}>{this.state.company.phoneNumber}</Descriptions.Item>
                                        <Descriptions.Item label={(<><b>{"Địa chỉ Email"}</b></>)}>{this.state.company.email}</Descriptions.Item>
                                        <Descriptions.Item label={(<><b>{"Giấy phép kinh doanh"}</b></>)}>{this.state.company.businessLicense}</Descriptions.Item>
                                        <Descriptions.Item label={(<><b>{"Mã số thuế"}</b></>)}>{this.state.company.taxCode}</Descriptions.Item>
                                        <Descriptions.Item label={(<><b>{"Tài khoản số"}</b></>)}>{this.state.company.bankAccount}</Descriptions.Item>
                                        {/* <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item> */}
                                        <Descriptions.Item label={(<><b>{"Do ông(bà)"}</b></>)} span={2}>{this.state.company.name}</Descriptions.Item>

                                        <Descriptions.Item label={(<><b>{"Chức vụ"}</b></>)} span={2}>
                                            Giám đốc làm đại diện
                        </Descriptions.Item>


                                    </Descriptions>
                                    {bside}


                                </Card> :
                                    <Card>
                                        {aside}
                                        <Descriptions size="small" column={2} title={"Thông tin bên B"}  >
                                            <Descriptions.Item label={(<><b>{"Công ty/Tổ chức"}</b></>)}>{this.state.company.name}
                                            </Descriptions.Item>
                                            <Descriptions.Item label={(<><b>{"Địa chỉ"}</b></>)}>{this.state.company.address}</Descriptions.Item>
                                            <Descriptions.Item label={(<><b>{"Điện thoại"}</b></>)}>{this.state.company.phoneNumber}</Descriptions.Item>
                                            <Descriptions.Item label={(<><b>{"Địa chỉ Email"}</b></>)}>{this.state.company.email}</Descriptions.Item>
                                            <Descriptions.Item label={(<><b>{"Giấy phép kinh doanh"}</b></>)}>{this.state.company.businessLicense}</Descriptions.Item>
                                            <Descriptions.Item label={(<><b>{"Mã số thuế"}</b></>)}>{this.state.company.taxCode}</Descriptions.Item>
                                            <Descriptions.Item label={(<><b>{"Tài khoản số"}</b></>)}>{this.state.company.bankAccount}</Descriptions.Item>
                                            {/* <Descriptions.Item label={(<b><PrinterOutlined />{"Số Fax:"}</b>)}>123123123123</Descriptions.Item> */}
                                            <Descriptions.Item label={(<><b>{"Do ông(bà)"}</b></>)} span={2}>{this.state.company.name}</Descriptions.Item>

                                            <Descriptions.Item label={(<><b>{"Chức vụ"}</b></>)} span={2}>
                                                Giám đốc làm đại diện
                    </Descriptions.Item>


                                        </Descriptions>



                                    </Card>
                                }

                            </Space>
                            <Space direction="vertical" align="center" style={{ backgroundColor: "white" }} >
                                Giá trị hợp đồng:{this.props.contract.contractValue}
                                <JoditEditor

                                    value={this.props.contract.contractContent}
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
                                       <h6 style={{ fontSize: 14 }}>Hợp đồng có hiệu lực kể từ ngày(Sẽ hiển thị khi hợp đồng có hiệu lực) đến
                                        <input
                                                type="text"
                                                onChange={value => this.setState({
                                                    contractExpiredDate: value.target.value
                                                })}
                                            />
                                        </h6>
                                        <Space size="large">
                                          

                                           <Button type="primary" value="Sign" onClick={this.onFinish}>{/*Nút này xuất hiện khi chưa ai kí hợp đồng nhưng chỉ có director mới thấy*/}
                                                       nộp
                                                    </Button> 
                                          


                                           <Button type="primary" value="reject">{/*nút này xuất hiện khi 2 bên đã kí hợp đồng này*/}
                                                            hủy
                                                        </Button> 
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
export default AddContractExtension