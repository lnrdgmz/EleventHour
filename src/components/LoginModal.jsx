import '../../public/styles/modal.scss';
import React, { Component } from 'react';
const OutlineModal = require('boron/OutlineModal');
import { Header, Menu, Input, Grid, Button, Segment, Divider } from 'semantic-ui-react';
import $ from 'jquery';
import '../../public/styles/loginModal.scss';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showModal() {
    this.refs.modal.show();
  }

  closeModal() {
    this.refs.modal.hide();
  }

  render() {
    return (
      <div>
        <Button onClick={this.showModal} className="splash-button">
          I'm Ready!
        </Button>
        <OutlineModal ref="modal" className="modal-container">
          <Grid className="modal" centered stretched textAlign="center" verticalAlign="top">
            <Grid.Row centered>
              <Header as='h1'textAlign="center" className="modalHeader">Select a Login Provider</Header>
            </Grid.Row>
            <Segment raised className="login-segment">
              <Button fluid className="loginButton">
                <a href="/auth/facebook" className="facebook-login-button" />
              </Button>
              <Divider horizontal>Or</Divider>
              <Button fluid className="loginButton"><a href="/auth/google" className="google-login-button" /></Button>
            </Segment>
          </Grid>
        </OutlineModal>
      </div>
    );
  }
};

export default LoginModal;
