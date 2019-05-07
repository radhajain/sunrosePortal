import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logo from '../../assets/Logo-No-Bkg-White.png';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import BackBtn from '../../assets/back-btn.png';

const SignUpPage = () => (
  <div className="landing-img-div">
  <div className="schedule-logo">
      <div className="schedule-logo-inner">
          <img src={Logo} style={{width: '300px'}}/>
      </div>
  </div>
  <div className="schedule-container-outer">
      <div className="schedule-container-inner">
        <Link to={ROUTES.SIGN_IN}><img src={BackBtn} className="back-btn"/></Link>
        <div>
          <p className="sign-in-title">Create an account</p>
          <SignUpForm />
        </div>
      </div>
  </div>
</div>
);

const INITIAL_STATE = {
  name: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { name, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // creates a user in Firebase Realtime Database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            name
        });

      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      name,
      email,
      validationCode,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      validationCode !== 'B19XCS210' ||
      email === '' ||
      name === '';

    return (
      <form onSubmit={this.onSubmit} style={{display: 'flex', flexDirection: 'column'}}>
        <input
          name="name"
          value={name}
          onChange={this.onChange}
          className="signin-input"
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          className="signin-input"
          type="text"
          placeholder="Email Address"
        />
        <input
          name="validationCode"
          value={validationCode}
          onChange={this.onChange}
          className="signin-input"
          type="text"
          placeholder="Organization Code"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          className="signin-input"
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          className="signin-input"
          type="password"
          placeholder="Confirm Password"
          style={{marginBottom: 25}}
        />
        <button disabled={isInvalid} type="submit" className="signin-btn">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}



const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm };
