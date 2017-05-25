import React from 'react';
 // import {render} from 'react-dom';
import {Router, Link } from 'react-router-dom';
import Details from '.././Details/details.jsx';


function Event(props) {
   return (
     <section>
       <h3>{props.title} </h3>
       <p> {props.description} </p>
     </section>

   )
 }


 export default Event;
