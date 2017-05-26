import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './createEvent.css';
import { createEvent } from '../../Actions/index';
import { Form, Input } from 'semantic-ui-react';
import moment from 'moment';


class CreateEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: '',
      title: '',
      time: '',
      skill_level: '',
      needs: '',
      description: '',
      dateFlag: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

// Action <Creator></Creator>
  handleCreateClick = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.createEvent(this.state);
    this.setState({ date: '', title: '', time: '', skill_level: '', needs: '', description: '', dateFlag: false });
  }

  handleChange(event) {
    const name = event.target.name;
    if (name === 'date' && moment(event.target.value).isBefore()) {
      this.setState({ dateFlag: true });
      return;
    } else if (name === 'date' && !moment(event.target.value).isSameOrBefore()) {
      this.setState({ dateFlag: false });
    }
    console.log(this.state);
    this.setState({ [name]: event.target.value });
  }


  render = () => {

    return (
      <div className="wrapper">
        <h1>Create a new Event</h1>
        <Form className="ui form" warning={this.state.dateFlag}>
          <Form.Field required>
            <label > Title</label>
            <Input name="title" type="text" placeholder="Name your event" required value={this.state.title} onChange={this.handleChange} />
          </Form.Field>
          <div className="equal width fields">
            <Form.Field error={this.state.dateFlag} required>
              <label htmlFor> Date</label>
              <Input name="date" type="date" required value={this.state.date} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field required >
              <label>Time</label>
              <Input name="time" type="time" required value={this.state.time} onChange={this.handleChange} />
            </Form.Field>
          </div>
          <Form.Field name="needs" className="six wide" label="Spots to be filled" value={this.state.needs} control="select" required onChange={this.handleChange}>
            <option value=""> Choose a number of spots...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Field>
          <Form.Field name="skill_level" className="six wide" label="Required ability" value={this.state.skill_level} control="select" required onChange={this.handleChange}>
            <option value=""> Choose a skill rating...</option>
            <option value="1">You merely need a body</option>
            <option value="2">That body needs to be able to breath</option>
            <option value="3">That body is capable of playing the game</option>
            <option value="4">You look at that body and think, "It probably played competitive once."</option>
            <option value="5">You're pretty sure that body was at least a minor league professional athelete at one point.</option>
          </Form.Field>
          <Form.Field >
              <label>Event Description</label>
              <textarea name="description" type="textarea" placeholder="Elaborate on the event.." value={this.state.description} rows="5" onChange={this.handleChange} />
            </Form.Field>
          <div className="ui warning message">
            <div className="content">
              <div className="header">Warning</div>
              <ul className="list">
                <li className="content">Please review and make sure the time is after today</li>
              </ul>
            </div>
          </div>
          <button
            type="submit"
            disabled={this.state.dateFlag || !this.state.date || !this.state.title || !this.state.time || !this.state.skill_level || !this.state.needs}
            className="ui button" 
            onClick={this.handleCreateClick}
          > Submit </button>
        </Form>
      </div>

    );
  }


}

const mapStateToProps = ({ events }) => ({
  eventList: events,
});

export default connect(
  mapStateToProps,
  {
    createEvent,
  },
)(CreateEvent);
