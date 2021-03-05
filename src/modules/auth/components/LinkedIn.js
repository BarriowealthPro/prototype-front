import React, { useState } from 'react';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import linkedInDefaultBtn from '../../../shared/assets/Sign-In-Large---Default.png';

const LinkedInComponent = (props) => {
  /** USE STATE */
  const [linkedInState, setLinkedInState] = useState({
    code: '',
    errorMessage: '',
  });

  /** DESTRUCTURING */
  const { code, errorMessage } = linkedInState;

  /** FUNCTIONS */
  const handleSuccess = (data) => {
    this.setState({
      code: data.code,
      errorMessage: '',
    });
  }

  const handleFailure = (error) => {
    this.setState({
      code: '',
      errorMessage: error.errorMessage,
    });
  }

  /** COMPONENTS */
  return (
    <div>
      <LinkedIn
          clientId={process.env.REACT_APP_LINKEDIN_CLIENT_ID}
          onFailure={handleFailure}
          onSuccess={handleSuccess}
          redirectUri="http://localhost:3000/linkedin"
        >
          <img
            src={linkedInDefaultBtn} 
            alt="Log in with Linked In" 
            style={{ maxWidth: '180px' }} 
          />
        </LinkedIn>
        {!code && <div>No code</div>}
        {code && <div>Code: {code}</div>}
        {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}

export default LinkedInComponent;