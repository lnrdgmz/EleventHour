import React, { Component } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { Card } from 'semantic-ui-react';
import $ from 'jquery';
class ChatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersList: [],
    };
    this.loadConvo = this.loadConvo.bind(this);
  }

  loadConvo(convo) {
    let userInfo = $(convo.currentTarget).text().split("");
    let userId = '';
    for (let i = 0; i < userInfo.length; i++) {
      if (Number(userInfo[i])) {
        userId += userInfo[i];
      }
    }
    let messages = [];
    fetch(`/messages/${userId}`, { credentials: 'include' })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        messages.push(data);
      });
    return (
          <div className="container">
            <MessageList messages={messages} />
            <ChatInput onSend={this.sendHandler} />
          </div>
      );
  }
  render() {
    let myArray = [];
    // Loop through all the messages in the state and create a Message component
    const userCards = this.props.messages.map((message) => {
      if (this.state.usersList.indexOf(message.sender_id) === -1 && message.sender_id !== this.props.userId) {
        this.state.usersList.push(message.sender_id);
        return (
          <Card
            header={message.userName}
            meta={message.sender_id}
            onClick={this.props.switchToMessages}
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
