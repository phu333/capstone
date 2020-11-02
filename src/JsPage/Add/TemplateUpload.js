import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Space, Checkbox, Dropdown, Select, Form, Input } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { FormBuilder } from 'react-formio';
import EditorJs from 'react-editor-js';
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
// import { Editor } from '@tinymce/tinymce-react';
// import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import JoditEditor from "jodit-react";


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const { Option } = Select;
class TemplateUpload extends React.Component {
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
            contractContent: ""

        };
        // this.handleChange = this.handleChange.bind(this);
        // this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.rteChange = this.rteChange.bind(this);

    }
    // handleEditorChange(e) {
    //     console.log('Content was updated:', e.target.getContent());
    //     this.setState({ content: e.target.getContent() });
    // }
    // onEditorStateChange(editorState) {
    //     console.log(editorState)
    //     console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    //     this.setState({
    //         editorState: editorState,
    //     });
    // };
    rteChange = (value) => {
        console.log(value); // HTML/rich text
        this.setState({
            contractContent: value
        })

    }
    onFinish = (values) => {


    };
    render() {
        const config = {
            readonly: false // all options from https://xdsoft.net/jodit/doc/
        }
        // const content = <p>This is the initial content of the editor</p>;

        // const EDITOR_JS_TOOLS = {
        //     embed: Embed,
        //     table: Table,

        //     list: List,
        //     warning: Warning,
        //     Paragraph: Paragraph,
        //     linkTool: LinkTool,


        //     header: Header,



        // };


        return (
            <div style={{ backgroundColor: "white" }}>
                 <Button style={{ width: '80px' }} type="primary" value="cancel" onClick={this.Cancel}>
                        Trở về
              </Button>
                    <h2 style={{ textAlign: 'center' }}>Tạo Mẫu hợp đồng</h2>
                {/* <Form>
                    <Editor
                        initialValue={content}
                        init={{
                            plugins: 'link image code',
                            toolbar: 'undo redo | bold italic| alignleft aligncenter alignright | code'
                        }}
                        onChange={this.handleEditorChange} />

                    <div className="col-md-3">
                        <Button className="btn btn-block btn-primary btn-lg" type="submit">Lưu</Button>
                    </div>
                </Form> */}
                {/* <Editor
                    editorState={this.state.editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                /> */}
                {/* <ReactQuill modules={this.modules}
                    formats={this.formats}
                    onChange={this.rteChange}
                    value={this.state.contractContent} >

                </ReactQuill> */}
                <Form

                    name="basic"
                    className="lcontract-form"

                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}

                >
                    <Form.Item
                        label="Tên mẫu"
                        name="templateName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Tên mẫu',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                Nội dung mẫu
                <JoditEditor

                        value={this.state.contractContent}
                        config={config}
                        tabIndex={1} // tabIndex of textarea

                        onChange={this.rteChange}
                    />



                    <Space size="large">

                        <Button type="primary" htmlType="submit" value="Edit">{/*Nút này xuất hiện khi chưa ai kí hợp đồng*/}
                        nộp
                </Button>




                    </Space>
                </Form>
                {/* <EditorJs
                    autofocus={true}
                    tools={EDITOR_JS_TOOLS}
                /> */}
                {/* <FormBuilder
                    form={{ display: 'form' }}
                    onChange={(schema) => console.log(schema)}
                /> */}
            </div>
        );


    }
}

var mapStateToProps = state => {
    console.log(state.myLoginReducer)
    return {
        myLoginReducer: state.myLoginReducer
    }
}
export default connect(mapStateToProps, null)(TemplateUpload)