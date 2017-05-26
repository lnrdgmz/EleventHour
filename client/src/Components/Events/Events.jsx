import React from 'react';
import { render } from 'react-dom';
import css from './events.css';
import Event from '.././Event/event.jsx';
import Menu from '.././MenuBar/MenuBar.jsx';
import {Link} from 'react-router-dom';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import SearchBar from '.././SearchBar/searchBar.jsx';

 class Events extends React.Component {
   constructor(props){
     super(props);
     this.state={
       events: [],
       filteredEvents: [],
       toggle : false,
       filterByTitle :""
     };
     this.onFilterEvents = this.onFilterEvents.bind(this);
   }


   componentDidMount(){
     fetch('/events?page=5').then((response) => {
       return response.json()
     }).then((parsedData)=> {
       
       this.setState({events : parsedData});
     })
   }
   onFilterEvents(event){
     console.log(event.target.value);
     this.setState({filterByTitle : event.target.value})
   }

  showEvent(){
    let searchResults = [];
    this.state.events.forEach((event)=>{
        if(event.title.indexOf(this.state.filterByTitle) !== -1){
      searchResults.push(event);
    }
    })
  
    this.setState({events : searchResults});
  }

   render() {
     let searchResults = [];
     const eventsToShow = this.state.events.filter(ev => ev.title.indexOf(this.state.filterByTitle) > -1)
     return (
       <div>
           <Menu />
         <h1> Events </h1>
         < SearchBar 
           filterBy={this.state.filterByTitle}
           onChange={this.onFilterEvents}
           onFilterEvents={this.onFilterEvents}
         /> <br />
         
         <article>
           {  eventsToShow.map((eventObject)=> (     
              <div>
               <Modal trigger={<button className="btn"><Event title={"Title:" + eventObject.title} description={eventObject.description} /></button>}>
                <Header content='Event Description' />
                <Modal.Content>
                <p> {eventObject.title}</p>
                <p>{eventObject.description}</p>
                <p>{eventObject.needs}</p>
                <p>{eventObject.location}</p>
                <p>{eventObject.skill_level}</p>
               </Modal.Content>
                </Modal>
            </div> ))}
        
           </article>
       </div>
     )    
   }
 }
 export default Events;

 