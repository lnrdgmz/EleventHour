import React, { Component } from 'react';
import $ from 'jquery';
class Message extends Component {
  render() {
    console.log(this.props);
    // if (this.props.creator.display_name === this.props.username) {
    //   $('.username').css('color', 'blue');
    // } else {
    //   $('.username').css('color', 'green');
    // }
    return (
      <div className={`message`}>
        <div className='username'>
          { this.props.username }
        </div>
        <div className='message-body'>
          { this.props.message }
        </div>
      </div>
    );
  }
}

Message.defaultProps = {
  message: '',
  username: '',
};

export default Message;
