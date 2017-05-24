import React from 'react';
 import { render } from 'react-dom';
 import css from './events.css';
 import Event from '.././Event/event.jsx';
 import Menu from '.././MenuBar/MenuBar.jsx';
//  import Tab from '.././MenuTabs/MenuTabs.jsx;
 // import fetch from 'react-redux-fetch';
 // import fetch from 'isomorphic-fetch';
 // import es6 from 'es6-promise';

 class Events extends React.Component {
   constructor(props){
     super(props);
     this.state={events: []};
   }


   componentDidMount(){
     fetch('/events?page=5').then((response) => {
       return response.json()
     }).then((parsedData)=> {

       this.setState({events : parsedData});
     })
   }
   render() {
     return (
      
       <div>
        <Menu />
         <h1> Events </h1>
         <article>
           {this.state.events.map((eventObject)=> (
             <Event title={"Title:" + eventObject.title} description={eventObject.description}/>
           ))}
         </article>
       </div>
     )
   }
 }
 export default Events;
