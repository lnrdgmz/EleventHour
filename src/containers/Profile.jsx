// Import React Components
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Semantic-UI and CSS Components
import { Grid, Image, Header, Segment, Container, Button, Icon, Menu, Input } from 'semantic-ui-react';

// Import Local Components
import MenuBar from '../components/MenuBar.jsx';
import UserEvents from './UserEvents';
import Survey from './Survey';
import { loginUser } from '../actions/actions.js';
import '../../public/styles/profile.scss';
import $ from 'jquery';
class Profile extends Component {
  static propTypes = {
    user: PropTypes.object,
  }

  state = { activeItem: 'bio' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  editProfile() {
    $('.profile-username').replaceWith(`<Input type="text" value=${$('.profile-username').text()}/>`);
    $('.profile-age').replaceWith(`<Input type="text" value=${$('.profile-age').text()}/>`);
  }
  renderTab() {
    if (this.state.activeItem === 'events') {
      return <UserEvents />;
    } else if (this.state.activeItem === 'edit') {
      return <Survey />;
    }
    return this.props.user[this.state.activeItem];
  }
  componentDidMount() {
    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
        scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
    });

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    // console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if (windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
  }
  }
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
      <div className="page-container-login">
        <MenuBar />
        <Container className="profile-page">
          <div className="homepage-hero-module">
            <div className="video-container">
              <div className="filter" />
                <video autoPlay loop className="fillWidth">
                  <source src="https://s1.webmshare.com/g87z3.webm" type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
                </video>
            </div>
          </div>
          <Container width={16} fluid textAlign="center" className="profile-container">
            <Grid centered stackable>
              <Grid.Column width={4}>
                <Image shape="rounded" src={user.img_url} />
              </Grid.Column>
              <Grid.Column width={12} className="userInfo" verticalAlign="middle" textAlign="center">
                <Segment vertical>
                  <Header as="h1" color="teal" className="profile-username">
                    {username}
                  </Header>
                </Segment>
                <Segment vertical>
                  <Header as="h2" color="teal">
                    Age: <span className="profile-age">{user.age}</span>
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
                  <Menu.Item name="edit" active={activeItem === 'edit'} onClick={this.handleItemClick} />
                </Menu>
                <Button color="blue" size="large" className="editProfile-button" onClick={this.editProfile}>
                  <Button.Content visible>
                    <Icon size="large" name='settings' />
                  </Button.Content>
                </Button>
              </Grid.Column>
              <Grid.Column stretched width={12}>
                <Segment>{this.renderTab()}</Segment>
              </Grid.Column>
            </Grid>
          </Container>
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
