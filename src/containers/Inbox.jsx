import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { Container, Header } from 'semantic-ui-react';
import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import ChatList from '../components/ChatList';
import { sendMessage } from '../actions/actions';
import { Message } from 'semantic-ui-react';
import { sendToUser, getUserMessages } from '../utils/utils';


class Inbox extends Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [], flag: false, recipient_id: 161, otherUser: '' };
    this.sendHandler = this.sendHandler.bind(this);
    this.newMessage = this.newMessage.bind(this);
    this.usersOrMessages = this.usersOrMessages.bind(this);
    this.switchToMessages = this.switchToMessages.bind(this);
    this.showMessages = this.showMessages.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    // Connect to the server
    this.socket = io(`${process.env.HOST}:${process.env.HOST}`, { query: `username=${this.props.display_name}` }).connect();
    this.socket.on('server:message', message => {
      $('.typingAlert').css("visibility", "hidden");
      this.newMessage(message);
    });
    this.socket.on('user:isTyping', data => {
        $('.typingAlert').css("visibility", "visible");
        setTimeout(() => {
          $('.typingAlert').css("visibility", "hidden");
        }, 3000);
      });
    // Listen for messages from the server
  }

  componentWillMount() {
    let newProps;
    let messages = [];
    fetch(`/messages/${this.props.id}`, { credentials: 'include' })
      .then(res => res.json())
      .then((data) => {
        this.setState({ messages: data });
      });
  }

  newMessage(message) {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  sendHandler(message) {
    const messageObject = {
      message,
      sender_id: this.props.id,
      userName: this.props.display_name,
      recipient_id: this.state.recipient_id,
    };

  // Emit the message to the server
    this.addMessage(messageObject);
  }

  changeHandler() {
    this.socket.emit('user:typing', `${this.state.otherUser} is typing...`);
  }

  addMessage(message) {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
    // Append the message to the component state
    fetch(`users/${message.sender_id}`, { credentials: 'include' })
      .then(res => res.json())
      .then((data) => {
        message.userName = data.display_name;
        this.props.sendMsg(message);
        this.props.toTarget(message);
        return message;
      });

      this.socket.emit('send:message', message);
  }
  switchToMessages(e) {
    const filter = this.state.messages.filter((msg) => {
      if (msg.sender_id === parseInt(e, 10)) {
        this.setState({ otherUser: msg.userName})
      }
      return (msg.sender_id === parseInt(e, 10) && msg.recipient_id === this.props.id)
          || (msg.sender_id === this.props.id && msg.recipient_id === parseInt(e, 10));
    });
    const recipient = Number(e);
    return this.showMessages(filter, recipient);
  }

  showMessages(arr, otherUser) {
    this.setState({ messages: arr, flag: true, recipient_id: otherUser });
  }

  changeHandler() {
    this.socket.emit('user:typing', `${this.state.otherUser} is typing...`);
  }

  usersOrMessages() {
    return this.state.flag === false ? (
      <div className="container">
        <Header as="h2" style={{ textAlign: 'center' }}>Your Chat List</Header>
        <ChatList
          messages={this.state.messages}
          switchToMessages={this.switchToMessages}
          userName={this.props.display_name} 
          userId={this.props.id} 
        />
      </div>
    ) : (
      <div className="container">
        <h2>Chatting with {this.state.otherUser} </h2>
        <MessageList
          messages={this.state.messages}
          userName={this.props.display_name}
          userId={this.props.id}
        />
        <ChatInput onSend={this.sendHandler} onChange={this.changeHandler} />
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        {this.usersOrMessages()}
      </div>
    );
  }

}

const mapStateToProps = state => state.user;

const mapDispatchToProps = (dispatch) => {
  return {
    sendMsg: (message) => {
      dispatch(sendMessage(message));
    },
    toTarget: (message) => {
      dispatch(sendToUser(message));
    },
    getMessages: (userId) => {
      dispatch(getUserMessages(userId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inbox);
