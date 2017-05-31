// Import React Components
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Semantic-UI and CSS Components
import { Grid, Image, Header, Segment, Container } from 'semantic-ui-react';

// Import Local Components
import MenuBar from '../presentational/MenuBar.jsx';
import { loginUser } from '../actions/actions.js';
import '../../public/styles/profile.scss';

const loadUser = () => {
  this.props.loginUser();
};

class Profile extends Component {
  static propTypes = {
    user: PropTypes.object,
  }
  componentWillReceiveProps() {
    loadUser();
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <MenuBar />
        <Container width={16}>
          <Grid stackable>
            <Grid.Column width={4}>
              <Image shape="rounded" src={user.img_url} />
            </Grid.Column>
            <Grid.Column width={12} className="userInfo" verticalAlign="middle" textAlign="center">
              <Segment vertical>
                <Header as="h1" color="teal">
                  {user.display_name}
                </Header>
              </Segment>
              <Segment vertical>
                <Header as="h2" color="teal">
                  {user.age}
                </Header>
              </Segment>
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
