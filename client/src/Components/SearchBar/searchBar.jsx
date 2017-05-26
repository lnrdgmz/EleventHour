import React from 'react';
import PropTypes from 'prop-types'

// import { Label } from 'semantic-ui-react'

class SearchBar extends React.Component {
    constructor(props){
        super(props);
    }
    handleInputText = (e) => {
      this.props.onFilterEvents(e);
      // console.log(e);
  }
// handleInputText
    render(){
     return (
       <div>
        <div className="ui grid">
          <div className="eight wide column">
            <div className="ui category search">
            <div className="ui icon input">
            <input type="text" 
            placeholder="Search..." 
            className="prompt" 
            tabIndex="0" 
            autoComplete="off" 
            value={this.props.filterBy}
            onChange={this.handleInputText}
            />
            <i aria-hidden="true" className="search icon"></i></div>
            <div className="results transition"><div className="message empty"><div className="header">No results found.</div></div>
            </div>
            </div>
            </div>
          </div>
        </div>

     )  


    }
}

export default SearchBar;