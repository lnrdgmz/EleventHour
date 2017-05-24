import React from 'react';
 // import {render} from 'react-dom';


 function Event(props){
   return(
     <section>
       <h3>{props.title}</h3>
       <p>{props.description}</p>
     </section>

   )
 }
 // class Event extends React.component{
 //   // constructor(props){
 //   //   super(props);
 //   //     // this.state = {event : {}}
 //   // }
 //   render() {
 //    return (
 //      <section>{this.props.events.title} <br/> {this.props.events.description} </section>
 //    )
 //  }
 // }

 export default Event;
