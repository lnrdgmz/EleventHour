import React from 'react';

const Survey = props => (
  <form onSubmit={props.handleSubmit}>
    <label>
      Display name
      <input
        name="display_name"
        onChange={props.handleInputChange}
        type="text"
      />
    </label>
    <label>
      Phone number
      <input
        name="contact_number"
        onChange={props.handleInputChange}
        type="text"
      />
    </label>
    <label>
      Email addres
      <input
        name="email"
        onChange={props.handleInputChange}
        type="text"
      />
    </label>
    <label>
      Bio
      <input
        name="bio"
        onChange={props.handleInputChange}
        type="text"
      />
    </label>
    <label>
      Age
      <input
        name="age"
        onChange={props.handleInputChange}
        type="text"
      />
    </label>
  </form>
);

export default Survey;
