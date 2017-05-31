// Import React Dependencies
import React, { Component } from 'react';
// Import Semantic-UI Dependencies
import { Menu, Image, Popup } from 'semantic-ui-react';
import Modal from './Modal.jsx';
import '../../public/styles/menuBar.scss';

class MenuBar extends Component {
  state = {
    activeItem: '',
  }

  handleItemClick = (e, { name }) => {
    switch (name) {
      case 'profile':
        return <Modal />;
      case 'createEvent':
        return <Modal />;
        break;
      default:
        window.location = '/';
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu stackable>
          <Menu.Item
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            <Image src="http://i.imgur.com/MdYaRqm.png" size="mini" />
          </Menu.Item>
          <Modal />
          <Menu.Item
            name='profile'
            active={activeItem === 'profile'}
            onClick={this.handleItemClick}
          >
            Profile
          </Menu.Item>
        </Menu>
        </div>
    );
  }
}

export default MenuBar;
