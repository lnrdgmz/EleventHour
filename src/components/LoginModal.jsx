// Import React Dependencies
import React from 'react';

// Import Semantic-UI Dependencies
import { Card, Button, Divider, Modal } from 'semantic-ui-react';

// Import Third-Party Dependencies
import Cookies from 'universal-cookie';

// Import Local Dependencies
import '../../public/styles/loginModal.scss';

function LoginModal() {
  const setCookie = () => {
    const cookies = new Cookies();
    cookies.set('redirectTo', location.href, { path: '/' });
  };

  const modalStyle = {
    top: 'auto !important',
    height: 'auto !important',
  };

  return (
    <Modal
      style={modalStyle}
      dimmer="blurring"
      size="small"
      basic
      className="normal-modal"
      trigger={<Button color="blue" onClick={() => setCookie()} content="Login" />}
    >
      <Card centered raised>
        <Card.Content>
          <Card.Header className="login-title">
            Select a Login Provider
          </Card.Header>
          <Card.Description className="login-description">
            Please sign in with your Google or Facebook account. We need to verify you're a real person!
          </Card.Description>
          <Button fluid className="loginButton">
            <a href="/auth/facebook" className="facebook-login-button" />
          </Button>
          <Divider horizontal>Or</Divider>
          <Button fluid className="loginButton">
            <a href="/auth/google" className="google-login-button" />
          </Button>
        </Card.Content>
      </Card>
    </Modal>
  );
}

export default LoginModal;
