import React from 'react';
import DocLine from './DocLine.jsx';
import styled from 'styled-components';
import MarkdownIt from 'markdown-it';
const md = require('markdown-it')({
  html: true,
  xhtmlOut: true,
  breaks: true,
  langPrefix: 'language-english',
  linkify: true,
  typographer: true,
});

const Display = styled.div`
  max-width: 100%;
  min-height: 60vh;
  max-height: 80vh;
  padding: 20px;
  text-align: left;
`;

const Editor = styled.textarea`
  list-style-type: none;
  width: 80%;
  min-height: 60vh;
  max-height: 80vh;
  padding: 20px;
`;

class Document extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      markdown: '',
      file: {}
    };
  }

  componentDidMount() {
    this.renderMD();
  }

  renderMD() {
    let input = $('#editor')[0].value;
    let markdown = md.render(input);
    var blob = new Blob([input], { type: 'text/plain' });
    var file = window.URL.createObjectURL(blob);
    this.setState({
      markdown,
      file
    });
  }

  createMarkup(markdown) {
    return {__html: markdown};
  }

  render() {
    let textList = '';
    for (let key in this.props.selected) {
      let message = this.props.selected[key];
      textList += message.message + '\n';
    }
    return (
      <div>
        <span style={{ float: 'left', width: '50%' }}>
          <Editor onChange={this.renderMD.bind(this)} defaultValue={textList} id='editor'></Editor>
        </span>
        <span style={{ float: 'right', width: '50%', textAlign: 'right' }}>
          <Display dangerouslySetInnerHTML={this.createMarkup.call(this, this.state.markdown)} ></Display>
          <a download href={this.state.file}>Download</a>
        </span>
      </div>
    );
  }
}

export default Document;