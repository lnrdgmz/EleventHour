import React, { Component } from 'react';

class Message extends Component {
  render() {
    // Was the message sent by the current user. If so, add a css class
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
