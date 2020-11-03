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
      markdown: ''
    };
  }

  componentDidMount() {
    this.renderMD();
  }

  renderMD() {
    let input = $('#editor')[0].value;
    let markdown = md.render(input);
    this.setState({
      markdown
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
        <span style={{ float: 'right', width: '50%' }}>
          <Display dangerouslySetInnerHTML={this.createMarkup.call(this, this.state.markdown)} ></Display>
        </span>
      </div>
    );
  }
}

export default Document;