import React, { Component } from 'react';

import Message from './Message';

class MessageList extends Component {

  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    let myArray = [];
    // Loop through all the messages in the state and create a Message component
    const messages = this.props.messages.map((message, i) => {
      if (myArray.indexOf(message.sender_id) === -1 && message.sender_id !== this.props.userId) {
        myArray.push(message.sender_id);
      }
      if (message.sender_id === this.props.userId) {
        return (
          <Message
            key={i}
            username={this.props.userName}
            message={message.message}
            recipient={message.recipient_id}
            sender={this.props.userId}
            id={this.props.userId}
          />
        );
      }
      return (
        <Message
          username={message.userName}
          message={message.message}
          recipient={message.recipient_id}
          sender={message.sender_id}
          id={this.props.id}
        />
      );
    });
    console.log(myArray);
    return (
      <div className='messages' id='messageList'>
        { messages }
      </div>
    );
  }
}

MessageList.defaultProps = {
  messages: [],
};

export default MessageList;
