import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

const CLIENT_ID =
  '133014943302-9eeo0dlvod5thmsicbmtajeh4mo4ms61.apps.googleusercontent.com';

const GoogleAuth = props => {
  let authText, clickHandler;
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: CLIENT_ID,
          scope: 'email',
        })
        .then(() => {
          setAuth(window.gapi.auth2.getAuthInstance());
          setTextValues();
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
        });
    });
  }, []);

  const onAuthChange = isSignedIn => {
    setTextValues();
    if (isSignedIn) props.signIn(auth.currentUser.get().getId());
    else props.signOut();
  };

  const onSignIn = e => {
    e.preventDefault();
    if (!auth) return;
    auth.signIn();
  };

  const onSignOut = e => {
    e.preventDefault();
    auth.signOut();
  };

  const setTextValues = () => {
    clickHandler = props.auth.isSignedIn ? onSignOut : onSignIn;
    if (props.auth.isSignedIn !== null) {
      authText = props.auth.isSignedIn ? 'Sign-out' : 'Sign-in';
    } else {
      authText = 'Sign-in';
    }
  };

  return (
    <div>
      <button className="ui blue google button" onClick={clickHandler}>
        <i className="google icon" />
        {authText}
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
