import React from 'react';
import Survey from './SurveyComponent.jsx';

const emptyFormAnswers = {
  display_name: '',
  contact_number: '',
  email: '',
  bio: '',
  age: undefined,
};

class SurveyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: emptyFormAnswers,
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
    event.preventDefault();
    const surveyAnswers = Object.assign({}, this.state.answers);
    console.log(surveyAnswers);
    fetch('/users', {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(surveyAnswers),
    })
    .then((resp) => {
      if (resp.status !== 200) {
        console.error('Profile not updated');
        return;
      }
      return resp.json();
    })
    .then((body) => {
      this.setState({ 
        answers: emptyFormAnswers,
      });
      if (!body) {
        return;
      }
      console.log('Profile updated!');
      console.log(body);
    });
  }
  render() {
    return (
      <Survey
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        answers={this.state.answers}
      />
    );
  }
}

export default SurveyContainer;
