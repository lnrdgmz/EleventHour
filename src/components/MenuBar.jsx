// Import React Dependencies
import React, { Component } from 'react';
// Import Semantic-UI Dependencies
import { Menu, Image } from 'semantic-ui-react';
import Modal from './Modal';

const OutlineModal = require('boron/OutlineModal');

class MenuBar extends Component {
  state = {
    activeItem: '',
  }

  handleItemClick = (e, { name }) => {
    switch (name) {
      case 'profile':
        return <Modal />;
      case 'createEvent':
        OutlineModal.show();
        break;
      default:
        window.location = '/';
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
        <Menu stackable>
          <Modal />
          <Menu.Item
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            <Image src="http://i.imgur.com/MdYaRqm.png" size="mini" />
          </Menu.Item>
          <Menu.Item
            name='createEvent'
            active={activeItem === 'createEvent'}
            onClick={this.handleItemClick}
          >
            <OutlineModal />
          </Menu.Item>
          <Menu.Item
            name='profile'
            active={activeItem === 'profile'}
            onClick={this.handleItemClick}
          >
            Profile
          </Menu.Item>
        </Menu>
    );
  }
}

export default MenuBar;
