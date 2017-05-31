// Import React Components
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Semantic-UI and CSS Components
import { Grid, Image, Header, Segment, Container, Menu } from 'semantic-ui-react';

// Import Local Components
import MenuBar from '../presentational/MenuBar.jsx';
import { loginUser } from '../actions/actions.js';
import '../../public/styles/profile.scss';

class Profile extends Component {
  static propTypes = {
    user: PropTypes.object,
  }

  state = { activeItem: 'bio' };

  componentDidMount() {
    this.props.loginUser();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state;
    const { user } = this.props;
    let username = user.display_name;
    if (user.oauth_provider) {
      const name = user.display_name;
      const splitName = name.split(' ');
      const firstName = splitName[0];
      const lastName = splitName[splitName.length - 1];
      username = firstName + ' ' + lastName[0] + '.';
    }
    return (
      <div className="pageContainer">
        <MenuBar />
        <Container width={16} fluid textAlign="center">
          <Grid centered stackable>
            <Grid.Column width={4}>
              <Image shape="rounded" src={user.img_url} />
            </Grid.Column>
            <Grid.Column width={12} className="userInfo" verticalAlign="middle" textAlign="center">
              <Segment vertical>
                <Header as="h1" color="teal">
                  {username}
                </Header>
              </Segment>
              <Segment vertical>
                <Header as="h2" color="teal">
                  Age: {user.age}
                </Header>
              </Segment>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column width={4}>
              <Menu fluid vertical tabular>
                <Menu.Item name="bio" active={activeItem === 'bio'} onClick={this.handleItemClick} />
                <Menu.Item name="ratings" active={activeItem === 'ratings'} onClick={this.handleItemClick} />
                <Menu.Item name="events" active={activeItem === 'events'} onClick={this.handleItemClick} />
              </Menu>
            </Grid.Column>
            <Grid.Column stretched width={12}>
              <Segment>{user[this.state.activeItem]}</Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const user = state.user;
  return {
    user,
  };
};

export default connect(mapStateToProps, {
  loginUser,
})(Profile);
