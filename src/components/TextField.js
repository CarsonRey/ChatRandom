import React from 'react';

const TextField = ({handleChange}) => (
  <div>
    <input type="textfield" placeholder="Type here.." onChange={() => console.log("typing")}/>
    <div onClick={() => {console.log("sending")}}>Send</div>
  {/* // Typing in the text field will set off a handleChange function that will change the state (somewhere??) */}
  </div>
);

export default TextField;
