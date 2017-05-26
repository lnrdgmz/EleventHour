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
       toggle : false,
       filterByTitle : ""
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
  //  showFilteredData(){
     
    //}
   
//  
   render() {
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
           {this.state.events.map((eventObject)=> (
            <div>
               <Event title={"Title:" + eventObject.title} description={eventObject.description} />
                <Modal trigger={<Button>Basic Modal</Button>} size='small'>
                <Header content='Event Description' />
                <Modal.Content>
                <p>{eventObject.title}</p>
                <p>{eventObject.description}</p>
                <p>{eventObject.needs}</p>
                <p>{eventObject.location}</p>
                <p>{eventObject.skill_level}</p>
               </Modal.Content>

                </Modal>
            </div>

         
           ))}

           <div>
           
           </div>
          
         </article>
       </div>
     )
   }
 }
 export default Events;
