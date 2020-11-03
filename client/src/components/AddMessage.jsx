import React from 'react';
import styled from 'styled-components';

const FormInputWrapper = styled.span`
  float: left;
  width: 90%;
`;

const FormInput = styled.input`
  margin: 0;
  width: 100%;
`;

const SubmitButtonWrapper = styled.span`
  float: right;
  width: 10%;
`;

const AddMessage = (props) => {

    // let height = document.getElementById('messages').scrollHeight;
    // document.getElementById('messages').scrollTo(0,height);


  const messageHandler = (e) => {
    e.preventDefault();
    let message = e.target[0].value;
    e.target[0].value = '';
    props.submitHandler(message);
  }

  return (
    <div>
      <form action="" onSubmit={messageHandler}>
        <FormInputWrapper >
          <FormInput autoComplete="off" />
        </FormInputWrapper>
        <SubmitButtonWrapper >
          <input name="Submit" type="submit" />
        </SubmitButtonWrapper>
      </form>
    </div>
  )
}

export default AddMessage;