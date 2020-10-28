import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Select, DatePicker } from 'antd';
import {  Avatar, Button, Skeleton, Checkbox } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import {FormBuilder} from 'react-formio';
import EditorJs from 'react-editor-js';
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'

// import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
// import Quote from '@editorjs/quote'
// import Marker from '@editorjs/marker'


class TemplateUpload extends React.Component {
    constructor() {
        super();

        this.state = {
            

        };

        this.handleChange = this.handleChange.bind(this);
        
    }
    handleChange(value) {
        

    }
    

    render() {
        const EDITOR_JS_TOOLS = {
            embed: Embed,
            table: Table,
           
            list: List,
            warning: Warning,
            Paragraph: Paragraph,
            linkTool: LinkTool,
           
            
            header: Header,
            
            
            
          };

        return (
            <div style={{backgroundColor:"white"}}>
            <EditorJs
            autofocus={true}
            tools={EDITOR_JS_TOOLS}
            />
            {/* // <FormBuilder  */}
            {/* //    form={{ display: 'form' }}
            //    onChange={(schema) => console.log(schema)}
            // /> */}
            </div>
        );


    }
}

export default TemplateUpload