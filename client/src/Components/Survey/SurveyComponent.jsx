import React from 'react';
import PropTypes from 'prop-types';

const Survey = props => (
  <form onSubmit={props.handleSubmit}>
    <label htmlFor="display-name-input">
      Display name
      <input
        id="display-name-input"
        name="display_name"
        onChange={props.handleInputChange}
        type="text"
      />
    </label>
    <label htmlFor="phone-number-input">
      Phone number
      <input
        id="phone-number-input"
        name="contact_number"
        onChange={props.handleInputChange}
        type="tel"
      />
    </label>
    <label htmlFor="email-input">
      Email addres
      <input
        id="email-input"
        name="email"
        onChange={props.handleInputChange}
        type="email"
      />
    </label>
    <label htmlFor="bio-input">
      Bio
      <input
        id="bio-input"
        name="bio"
        onChange={props.handleInputChange}
        type="text"
      />
    </label>
    <label htmlFor="age-input">
      Age
      <input
        id="age-input"
        name="age"
        onChange={props.handleInputChange}
        type="number"
        min="18"
        max="120"
      />
    </label>
    <button type="submit" ></button>
  </form>
);

Survey.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Survey;
