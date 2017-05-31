import React from 'react';
// import { Modal } from 'boron';
import {Modal, Button} from 'semantic-ui-react';
import eventDetails from '../containers/Events.jsx';
import MenuBar from './MenuBar.jsx';
import Event from './event.jsx';
import fetchEvents from '../actions/eventActions.js';
const PresentEvents = (props) => {
  return (
    <div>

      <MenuBar />

      {/*<Modal trigger={
        <button className="btn">
          <Event title={"Title: " + "props.eventDetails.title"} 
          description={"Event Details: <br />" + "props.eventDetails.description"}
          />
        </button>}>
      </Modal>*/}
      {/*<button onClick={console.log(fetchEvents)}>Click me to dispatch Action</button>*/}
    </div>
  )
}

export default PresentEvents;