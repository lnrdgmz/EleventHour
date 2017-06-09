import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      messageCount: 0,
      userMessages: {},
    };

    this.loadConvo = this.loadConvo.bind(this);
  }

  loadConvo(userId) {
    const messages = [];
    fetch(`/messages/${userId}`, { credentials: 'include' })
      .then(res => res.json())
      .then((data) => {
        messages.push(data);
      });
    return (
      <div className="container">
        <MessageList messages={messages} id={this.props.userId} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    );
  }
  render() {
    let myArray = [];
    // Loop through all the messages in the state and create a Message component
    this.props.messages.forEach((message) => {
      if (!this.state.userMessages[message.sender_id] && message.sender_id !== this.props.userId) {
        this.state.userMessages[message.sender_id] = 1;
      } else {
        this.state.userMessages[message.sender_id] += 1;
      }
    });
    const userCards = this.props.messages.map((message) => {
      if (this.state.usersList.indexOf(message.sender_id) === -1 && message.sender_id !== this.props.userId) {
        this.state.usersList.push(message.sender_id);
        return (
          <Card
            key={message.id}
            header={message.userName}
            meta={this.state.userMessages[message.sender_id]}
            onClick={this.props.switchToMessages.bind(null, message.sender_id)}
            
          />
        );
      }
    });
    return (
      <div>
        { userCards }
      </div>
    );
  }
}

ChatList.defaultProps = {
  messages: [],
};

export default ChatList;
