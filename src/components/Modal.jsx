import '../../public/styles/modal.scss';
import React, { Component } from 'react';
const OutlineModal = require('boron/OutlineModal');
import { Header, Menu, Input, Grid } from 'semantic-ui-react';
import $ from 'jquery';
class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalText: 'Name Your Event',
      nextOrCloseText: 'Next',
      placeHolderText: 'Laughing at Duncan...',
    }
    this.showModal = this.showModal.bind(this);
    this.nextOrClose = this.nextOrClose.bind(this);
  }
  showModal() {
    this.refs.modal.show();
  }
  nextOrClose() {
    if (this.state.modalText === 'Name Your Event') {
      this.refs.modal.hide();
      setTimeout(() => {
        this.setState({
          modalText: 'When is Your Event?',
          nextOrCloseText: 'Next',
          placeHolderText: 'All the Time!',
        });
        $('.modal-container').removeClass('animated slideOutRight').addClass('animated slideInLeft');
        this.refs.modal.show();
      }, 500);
    } else if (this.state.modalText === 'When is Your Event?') {
      this.refs.modal.hide();
      setTimeout(() => {
        this.setState({
          modalText: "Where is Your Event?",
          nextOrCloseText: 'Next',
          placeHolderText: '369 Lexington Ave',
        });
        this.refs.modal.show();
      }, 500);
    } else if (this.state.modalText === 'Where is Your Event?') {
      this.refs.modal.hide();
      setTimeout(() => {
        this.setState({
          modalText: "How Many People Are You Looking For?",
          nextOrCloseText: 'Close',
          placeHolderText: '1 - 1,000,000,000',
        });
        this.refs.modal.show();
      }, 500);
    } else {
      this.refs.modal.hide();
      setTimeout(() => {
        this.setState({
          modalText: "Name Your Event",
          nextOrCloseText: 'Next',
          placeHolderText: 'Laughing at Duncan...',
        });
      }, 500);
    }
  }
  render() {
    return (
      <div>
        <Menu.Item
          name="events"
          onClick={this.showModal}
        >
        Create an Event
        </Menu.Item>
        <OutlineModal ref="modal" className="modal-container">
          <Grid className="modal" centered stretched textAlign="center" verticalAlign="top">
            <Grid.Row centered>
              <Header as='h1'textAlign="center" className="modalHeader">{this.state.modalText}</Header>
            </Grid.Row>
            <Grid.Row centered>
              <Input focus placeholder={this.state.placeHolderText} size="huge" className="modalInput" />
            </Grid.Row>
            <button onClick={this.nextOrClose}>{this.state.nextOrCloseText}</button>
          </Grid>
        </OutlineModal>
      </div>
    );
  }
};

export default Modal;