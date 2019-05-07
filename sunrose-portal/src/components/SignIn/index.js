import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Logo from '../../assets/Logo-No-Bkg-White.png';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import './SignIn.scss';
import { Link } from 'react-router-dom';
import BackBtn from '../../assets/back-btn.png';


const SignInPage = () => (
  <div className="landing-img-div">
    <div className="schedule-logo">
        <div className="schedule-logo-inner">
            <img src={Logo} style={{width: '300px'}}/>
        </div>
    </div>
    <div className="schedule-container-outer">
        <div className="schedule-container-inner">
          <div>
            <Link to={ROUTES.LANDING}><img src={BackBtn} className="back-btn"/></Link>
            <p className="sign-in-title">Welcome back.</p>
            <SignInForm />
            <PasswordForgetLink />
            <SignUpLink />
          </div>
        </div>
    </div>
  </div>
);

const SignUpLink = () => (
  <p className="signin-signup-link">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
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
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit} style={{display: 'flex', flexDirection: 'column'}}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          className="signin-input"
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          className="signin-input"
          type="password"
          placeholder="Password"
          style={{marginBottom: 25}}
        />
        <button disabled={isInvalid} type="submit" className="signin-btn">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}



const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm, SignUpLink };
