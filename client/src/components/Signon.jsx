import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import Cookie from './Cookie.jsx';

const Form = styled.form`
  list-style-type: none;
  margin: 0;
  max-height: calc(100vh - 41px);
  overflow-y: scroll;
  padding: 0;
`;

const clickHandler = (e, changeUser) => {
  let name = e.currentTarget.children[1].value;
  // var socket = io();
  socket.emit('Login', {name});
  changeUser(name);
};

// const socket = io();
const Signon = ({ changeUser }) => {

  // const useLocalStorage = (key, initialValue) => {
  //   const [storedValue, setStoredValue] = useState(() => {
  //     try {
  //       const item = window.localStorage.getItem(key);
  //       return item ? JSON.parse(item) : initialValue;
  //     } catch (error) {
  //       console.log(error);
  //       return initialValue;
  //     }
  //   });

  //   const setValue = (value) => {
  //     try {
  //       const valueToStore =
  //       value instanceof Function ? value(storedValue) : value;
  //       setStoredValue(valueToStore);
  //       window.localStorage.setItem(key, JSON.stringify(valueToStore));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   return [storedValue, setValue];
  // };

  // const [name, setName] = useLocalStorage('name', 'Bob');

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