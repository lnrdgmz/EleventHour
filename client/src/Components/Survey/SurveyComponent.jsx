import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'semantic-ui-react';

const Survey = props => (
  <Form onSubmit={props.handleSubmit} className="ui form">
    <div className="field">
      <label htmlFor="display-name-input">
        Display name
        <Input
          id="display-name-input"
          name="display_name"
          onChange={props.handleInputChange}
          type="text"
          value={props.answers.display_name}
        />
      </label>
    </div>
    <div className="field">
      <label htmlFor="phone-number-input">
        Phone number
        <Input
          id="phone-number-input"
          name="contact_number"
          onChange={props.handleInputChange}
          type="tel"
          value={props.answers.contact_number}
        />
      </label>
    </div>
    <div className="field">
      <label htmlFor="email-input">
        Email addres
        <Input
          id="email-input"
          name="email"
          onChange={props.handleInputChange}
          type="email"
          value={props.answers.email}
        />
      </label>
    </div>
    <div className="field">
      <label htmlFor="bio-input">
        Bio
        <Input
          id="bio-input"
          name="bio"
          onChange={props.handleInputChange}
          type="text"
          value={props.answers.bio}
        />
      </label>
    </div>
    <div className="field">
      <label htmlFor="age-input">
        Age
        <Input
          id="age-input"
          name="age"
          onChange={props.handleInputChange}
          type="number"
          min="18"
          max="120"
          value={props.answers.age}
        />
      </label>
    </div>
    <button className="ui button" type="submit" >Submit</button>
  </Form>
);

Survey.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  answers: PropTypes.object.isRequired,
};

export default Survey;
