import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Skeleton, Checkbox, Dropdown, Select, Form, Input } from 'antd';
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
// import Quote from '@editorjs/quote'
// import Marker from '@editorjs/marker'
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

        this.state = {
            editorState: EditorState.createEmpty(),

        };
        // this.handleChange = this.handleChange.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);


    }
    // handleEditorChange(e) {
    //     console.log('Content was updated:', e.target.getContent());
    //     this.setState({ content: e.target.getContent() });
    // }
    onEditorStateChange(editorState) {
        console.log(editorState)
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        this.setState({
            editorState: editorState,
        });
    };

    render() {
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
                <Editor
                    editorState={this.state.editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                />
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

export default TemplateUpload