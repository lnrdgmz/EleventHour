// Import React Dependencies
import React, { Component } from 'react';
// Import Semantic-UI Dependencies
<<<<<<< HEAD
import { Menu, Image } from 'semantic-ui-react';
import Modal from './Modal';

const OutlineModal = require('boron/OutlineModal');
=======
import { Menu, Image, Popup } from 'semantic-ui-react';
import Modal from './Modal.jsx';
import '../../public/styles/menuBar.scss';
>>>>>>> improvements

class MenuBar extends Component {
  state = {
    activeItem: '',
  }

  handleItemClick = (e, { name }) => {
    switch (name) {
      case 'profile':
        return <Modal />;
      case 'createEvent':
<<<<<<< HEAD
        OutlineModal.show();
=======
        return <Modal />;
>>>>>>> improvements
        break;
      default:
        window.location = '/';
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
<<<<<<< HEAD
        <Menu stackable>
          <Modal />
=======
      <div>
        <Menu stackable>
>>>>>>> improvements
          <Menu.Item
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            <Image src="http://i.imgur.com/MdYaRqm.png" size="mini" />
          </Menu.Item>
<<<<<<< HEAD
          <Menu.Item
            name='createEvent'
            active={activeItem === 'createEvent'}
            onClick={this.handleItemClick}
          >
            <OutlineModal />
          </Menu.Item>
=======
          <Modal />
>>>>>>> improvements
          <Menu.Item
            name='profile'
            active={activeItem === 'profile'}
            onClick={this.handleItemClick}
          >
            Profile
          </Menu.Item>
        </Menu>
<<<<<<< HEAD
=======
        </div>
>>>>>>> improvements
    );
  }
}

export default MenuBar;
