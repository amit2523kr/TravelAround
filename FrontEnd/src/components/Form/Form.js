import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';
const Form = () => {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    try{
      await axios.post("http://localhost:8000/message/",{
        email,number,message
      })
    }
    catch(e){
      console.log(e);
    }
  };

  return (
    <>
    
    <form id="contact_form" onSubmit={handleSubmit}>
    <h4>For Any Queries  Contact Us.</h4>
      <div>
        <input
          className='form_input'
          type="email"
          id="email"
          placeholder='Enter your Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
        className='form_input'
          type="number"
          id="number"
          placeholder='Enter your Number'
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          className='form_input'
          id="message"
          placeholder='Type your Message Here..'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button id="formSubmit_btn" type="submit">Submit</button>
    </form>
    </>
  );
};

export default Form;
