import React from 'react';
import css from './details.css';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

function Details(props){
  return (
      <div>
         <h1> Event Details </h1>
           <p>{console.log(props)}</p>
           <p>{props.title}</p>
          //  <p>{props.description}</p>
          //  <p>{props.date_time}</p>
          //  <p>{props.needs}</p>
          //  <p>{props.location}</p>
          //  <p>{props.skill_level}</p>
      
       </div>
     )
}

 export default Details;