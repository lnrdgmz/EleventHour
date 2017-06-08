import React, { Component } from 'react';
import $ from 'jquery';
import '../../public/styles/chat.scss';

class Message extends Component {

  render() {
    console.log('MessageProps!', this.props);
    const fromMe = this.props.id === this.props.sender ? 'bubble bubble--alt' : 'bubble'; 
    return (
      <div className='chat-message'>
        <div className={`message-body ${fromMe}`}>
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
