import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: solid 1px black;
  padding: 5px 10px;
  user-select: none;
`;

const Button = styled.button`
  background: #FFF;
  border: solid 1px black;
  margin-left: 20px;
  padding: 5px 10px;
  &:hover {
    background: #eee;
  };
`;

const Close = styled.button`
  background: #FFF;
  border: solid 1px black;
  float: right;
  margin-left: 20px;
  padding: 5px 10px;
  &:hover {
    background: #eee;
  };
`;

const DocHeader = ({ docToggle, close, buttonMsg }) => {

  return (
    <Wrapper>
      <Button onClick={docToggle}>{buttonMsg}</Button><Close onClick={close}>Remove selected Documents</Close>
    </Wrapper>
  );
};

export default DocHeader;