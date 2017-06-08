import React, { Component } from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import { Divider, Grid, Image, Header, Segment, Container, Menu } from 'semantic-ui-react';

import MenuBar from '../components/MenuBar';
import UserEvents from './UserEvents';
import EditForm from './EditForm';
import Inbox from './Inbox';
import EditProfile from './EditProfile';
// import '../../public/styles/profile.scss';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'events',
      edit: 'false',
    };
  }

  handleMenuClick = (e, { name }) => this.setState({ activeItem: name });

  editProfile = () => { window.location = '#/edit'; }

  renderComponent = () => {
    if (this.state.activeItem === 'events') {
      return <UserEvents />;
    } else if (this.state.activeItem === 'edit') {
      return <EditForm />;
    } else if (this.state.activeItem === 'inbox') {
      return <Inbox />;
    }
    return this.props.user[this.state.activeItem];
  }

  render = () => {
    if (!this.props.user.display_name) {
      return <Redirect to="/" />;
    }

    const { user } = this.props;
    const { activeItem } = this.state;
    let userName = user.display_name;

    if (user.oauth_provider) {
      const splitName = user.display_name.split(' ');
      userName = `${splitName[0]} ${splitName[splitName.length - 1]}`;
    }

    return (
      <div className="profile-page">
        <MenuBar />
        <Container>
          <Grid>
            <Grid.Column width={5}>
              <Segment>
                <Header className="user-name">{userName}</Header>
              </Segment>
              <Image fluid src={user.img_url} rounded />
              <Menu vertical stackable fluid>
                <Menu.Item
                  className="menu-item"
                  name="events"
                  active={activeItem === 'events'}
                  onClick={this.handleMenuClick}
                />
                <Menu.Item
                  className="menu-item"
                  name="inbox"
                  active={activeItem === 'inbox'}
                  onClick={this.handleMenuClick}
                > Inbox </Menu.Item>
                <Menu.Item
                  className="menu-item"
                  name="edit"
                  active={activeItem === 'edit'}
                  onClick={this.handleMenuClick}
                />
              </Menu>
            </Grid.Column>
            <Grid.Column width={11} className="component-segment">
              {this.renderComponent()}
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }

}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Profile);
