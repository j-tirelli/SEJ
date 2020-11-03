import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  list-style-type: none;
  margin: 0;
  max-height: calc(100vh - 41px);
  overflow-y: scroll;
  padding: 0;
`;

const clickHandler = (e, changeUser) => {
  let userName = e.currentTarget.children[1].value;
  changeUser(userName);
};

const Signon = ({ changeUser }) => {
  return (
    <div>
      <Form onSubmit={(e) => clickHandler(e, changeUser)}>
        <label htmlFor="username" >Username: </label>
        <input type="text" name="username"/>
        <input type="submit" name="submit" value="Login" />
      </Form>
    </div>
  );
};

export default Signon;