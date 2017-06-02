// Import React Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

// Import Semantic-UI Dependencies
import { Menu, Image, Popup } from 'semantic-ui-react';
import EventForm from './EventForm.jsx';
import LoginModal from '../components/LoginModal';
import '../../public/styles/menuBar.scss';

class MenuBar extends Component {
  // state = {
  //   activeItem: '',
  // }
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    const cookies = new Cookies();
    cookies.set('redirectTo', location.href, { path: '/' });
    location.href = location.href.split('#')[0] + 'auth/logout';
  }
  handleItemClick (e, { name }) {
    switch (name) {
      case 'profile':
        return <EventForm />;
      case 'createEvent':
        return <EventForm />;
      default:
        window.location = '/';
    }
  }

  render() {
    const { activeItem } = this.state;

    if (this.props.user.display_name) {
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
            <EventForm />
            <Menu.Item
              name="profile"
              active={activeItem === 'profile'}
              onClick={this.handleItemClick}
            >
              Profile
            </Menu.Item>
            <Menu.Item
              name="logout"
              onClick={this.handleLogout}
            >
              Log Out
            </Menu.Item>
          </Menu>
        </div>
      );
    } else {
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
            <Popup trigger={<LoginModal />} />
          </Menu>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(MenuBar);
