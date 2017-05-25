import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './createEvent.css';
import { createEvent } from '../../Actions/index';
import { Form, Input } from 'semantic-ui-react';


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
    };

    this.handleChange = this.handleChange.bind(this);
  }

// Action <Creator></Creator>
  handleCreateClick = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.createEvent(this.state);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }


  render = () => {
    return (
      <div className="wrapper">
        <h1>Create a new Event</h1>
        <form className="ui form">
          <Form.Field required>
            <label > Title</label>
            <Input name="title" type="text" placeholder="Name your event" required value={this.state.title} onChange={this.handleChange} />
          </Form.Field>
          <div className="equal width fields">
            <Form.Field>
              <label htmlFor> Date</label>
              <Input name="date" type="date" required onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Time</label>
              <Input name="time" type="time" required onChange={this.handleChange} />
            </Form.Field>
          </div>
          <Form.Field name="needs" className="six wide" label="Spots to be filled" control="select" required onChange={this.handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Field>
          <Form.Field name="skill_level" className="six wide" label="Required ability" control="select" required onChange={this.handleChange}>
            <option value="1">You merely need a body</option>
            <option value="2">That body needs to be able to breath</option>
            <option value="3">That body is capable of playing the game</option>
            <option value="4">You look at that body and think, "It probably played competitive once."</option>
            <option value="5">You're pretty sure that body was at least a minor league professional athelete at one point.</option>
          </Form.Field>
          <button type="submit" className="ui button" onClick={this.handleCreateClick} > Submit </button>
        </form>
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
