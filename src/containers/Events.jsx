// Import React and Redux Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//local dependencies
import MenuBar from '../components/MenuBar.jsx';
import EventPres from '../presentational/event';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import '../../public/styles/events.scss';
import {fetchEvents, receiveEvents } from '../actions/eventActions.js';
import {store } from '../index.jsx'

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // eventsToShow = (events, filter) => {
  //   switch(filter) {

  //     case 'SHOW_ALL' : 
  //     return componentDidMount()

  //     case "FILTER_BY_TITLE" : 
  //     return eventsToShow = this.state.events.filter(ev => ev.title.indexOf(this.state.filterByTitle) > -1);

  //   }

  // }
  render() {

    // const eventsToShow = this.props.events.events.filter(ev => ev.title.indexOf(this.state.filterByTitle) > -1);
      return (
        <div>
          <MenuBar />
          {this.props.events.events === undefined ? null : this.props.events.events.map((event) => {
            return (
              <EventPres title={event.title} description={event.description} />
            );
          })} 
         
        </div>
      )
   }
  }


const mapStatetoProps = function(state){
  return { events : state.events}
};

const mapDispatchtoProps = function(dispatch){
  return {
    fetchEvents
  }
}


export default connect(mapStatetoProps, mapDispatchtoProps)(Events);
