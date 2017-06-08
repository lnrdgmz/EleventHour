// Import React Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

// Import Semantic-UI Dependencies
import { Menu, Image, Button, Icon } from 'semantic-ui-react';
import EventForm from './EventForm.jsx';
import LoginModal from '../components/LoginModal';
import '../../public/styles/menuBar.scss';

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: '',
      menuButton: <Menu.Item name="status">Loading...</Menu.Item>,
    };

    this.getUserStatus = this.getUserStatus.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentWillMount = () => this.getUserStatus();

  getUserStatus= () => {
    let { activeItem } = this.state.activeItem;
    const eventForm = <EventForm />;
    const loginModal = <LoginModal />;
    const profileButton = <Menu.Item className="menuBarButton" name="profile" position="right" active={activeItem = 'profile'} onClick={this.handleItemClick}>Profile</Menu.Item>;
    const logOutButton = <Menu.Item className="menuBarButton" name="logout" position="right"><Button negative onClick={this.handleLogout}><Icon name="sign out" /> Logout</Button></Menu.Item>;
    fetch('/auth/loggedIn', { credentials: 'include' })
      .then(res => res.json())
      .then((data) => {
        if (data === false) {
          this.setState({
            activeItem: '',
            menuButton: <Menu.Item position="right">{loginModal}</Menu.Item>,
          });
        } else {
          this.setState({
            activeItem: '',
            menuButton: [eventForm, <Menu.Menu position="right">{profileButton} {logOutButton}</Menu.Menu>],
          });
        }
      })
      .catch(err => console.error('Error:', err, 'MenuBar.jsx (Line 42)'));
  }

  handleLogout = () => {
    const cookies = new Cookies();
    cookies.set('redirectTo', location.href, { path: '/' });
    location.href = location.href.split('#')[0] + 'auth/logout';
  }

  handleItemClick = (e, { name }) => {
    this.setState({
      activeItem: name,
      menuButton: this.state.menuButton,
    });
    if (name === 'profile') {
      window.location = '/#/profile';
    }
  }

  render= () => {
    const { activeItem } = this.state.activeItem;
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
          {this.state.menuButton}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(MenuBar);
