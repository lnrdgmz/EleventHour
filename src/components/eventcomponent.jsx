import React from 'react';
import {Router, Link } from 'react-router-dom';
import {Button} from 'semantic-ui-react';

function Event(props) { return <section> <h3>{props.title} </h3>  <p> {props.description} </p> </section> }

 export default Event;
