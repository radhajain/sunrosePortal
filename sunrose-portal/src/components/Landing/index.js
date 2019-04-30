import React from 'react';
import './Landing.css'
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo-No-Bkg.png';
import * as ROUTES from '../../constants/routes';

const Landing = () => (
    <div className="landing-img-div">
      <div className="landing-content">
        <div className="landing-content-inner">
          <div style={{textAlign: 'center'}}>
            <img src={Logo} style={{width: '80%', display: 'block', paddingLeft: '10%', paddingRight: '10%', paddingBottom: 30}} />
            <Link to={ROUTES.SCHEDULE}><button className="landing-btn-usr">Click here to chat</button></Link>
          </div>
          
        </div>
      </div>
    </div>
    
);

export default Landing;
