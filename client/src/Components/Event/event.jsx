import React from 'react';
 // import {render} from 'react-dom';
import {Router, Link } from 'react-router-dom';
import Details from '.././Details/details.jsx';



function Event(props) {
  return (
    <section>
      <h3>
        {props.event.title}
        </h3>

      <p> {props.event.description} </p>
    </section>

  )
 }


 export default Event;
