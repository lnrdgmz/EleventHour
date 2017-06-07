import React, { Component } from 'react';
import io from 'socket.io-client';
import MessageList from '../components/MessageList';
import ChatInput from '../components/ChatInput';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/actions';
import { sendToUser, getUserMessages } from '../utils/utils';
import $ from 'jquery';
import '../../public/styles/chat.scss';
class NewChat extends Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [], flag: false, recipient_id: Number(this.props.recipient) };
    this.sendHandler = this.sendHandler.bind(this);
    this.newMessage = this.newMessage.bind(this);
    this.switchToMessages = this.switchToMessages.bind(this);
    this.showMessages = this.showMessages.bind(this);
    // Connect to the server
    this.socket = io('localhost:3000', { query: `username=${this.props.display_name}` }).connect();
    this.socket.on('server:message', message => {
      this.newMessage(message);
    });
    // Listen for messages from the server
  }

  componentWillMount() {
    let newProps;
    let messages = [];
    fetch(`/messages/${this.props.id}`, { credentials: 'include' })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ messages: data });
      });
    // if(this.props.messages.length > 15) {
    //   newProps = this.props.messages.slice(15);
    //   newProps = newProps.split("}");
    //   newProps.forEach((message) => {
    //     if(message.length > 0) {
    //       message += '}';
    //       messages.push(JSON.parse(message));
    //     }
    //   });
    // }
  }
  newMessage(message) {
    console.log('SOCKET.IO TRIGGERED')
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

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
    fetch(`users/${message.sender_id}`, { credentials: 'include' })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        message.userName = data.display_name;
        this.props.sendMsg(message);
        this.props.toTarget(message);
        return message;
      })
      console.log(message);
      this.socket.emit('send:message', message);
  }
  switchToMessages(e) {
    const filter = this.state.messages.filter((msg) => {
      return (msg.sender_id == $(e.target).text() && msg.recipient_id === this.props.userId) || (msg.recipient_id == $(e.target).text() && msg.sender_id === this.props.userId);
    });
    let newArray = [];
    const recipient = Number($(e.target).text());
    console.log(this.state.messages);
    console.log('New Recipient', recipient);
    return this.showMessages(filter, recipient);
  }
  showMessages(arr, otherUser) {
    this.setState({ messages: arr, flag: true, recipient_id: '' });
  }

  render() {
    return (
      <div className="chat-container">
        <h3>New Chat with Someone!</h3>
        <MessageList messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
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
)(NewChat);
