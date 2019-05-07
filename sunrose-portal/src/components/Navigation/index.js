import React from 'react';

import './Navigation.scss';

import SignOutButton from '../SignOut';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <div></div>
);

const NavigationNonAuth = () => (
  <Link to={ROUTES.SIGN_IN} className="nav-signed-out">Are you a counselor?</Link>
);

export default Navigation;
