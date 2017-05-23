// Import CSS
import 'semantic-ui-react';
// import './styles/style.css';

// Import React Components
import React from 'react';
import { render } from 'react-dom';
import App from './Components/AppComponent/App.jsx';
import Events from './Components/EventsComponent/Events.jsx'
import {
  HashRouter,
  Route,
  Link
} from 'react-router-dom';



render(
<HashRouter>
  {/*<Route path="/" component={App} />*/}
  <Route path="/events" component={Events}/>
</HashRouter>,
  


  document.getElementById('app')

);
