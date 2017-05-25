import React from 'react';
import Survey from './SurveyComponent.jsx';

class SurveyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: {
        display_name: '',
        contact_number: '',
        email: '',
        bio: '',
        age: null,
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState((prevState) => {
      return {
        answers: Object.assign(prevState.answers, { [name]: value }),
      };
    });
  }
  handleSubmit(event) {
    return event;
  }
  render() {
    return (
      <Survey
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default SurveyContainer;
