import React from 'react';
import { render } from 'react-dom';
import css from './events.css';


class Events extends React.Component {
    render() {
        return (
        <h1>Hello, Event Page </h1>
        );
 {/*<div class="masonry">
   <div class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
   <div class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
   <div class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
   <div class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
   <div class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
   <div class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
   <div class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
   <div class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
  
 </div>*/}
        
    }
}
render(<Events />, document.getElementById('app'));