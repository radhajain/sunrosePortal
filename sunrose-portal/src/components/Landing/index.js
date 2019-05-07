import React from 'react';
import './Landing.scss'
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo-No-Bkg.png';
import * as ROUTES from '../../constants/routes';

const Landing = () => (
    <div className="landing-img-div">
      <div className="landing-content">
        <div className="landing-content-inner">
          <div style={{textAlign: 'center'}}>
              <img src={Logo} style={{width: '100%', display: 'block', paddingLeft: '10%', paddingRight: '10%'}} />
              <p>An immersive counseling experience like no other. Completely anonymous.</p>
            <div className="landing-btn-wrapper">
              <Link to={ROUTES.SCHEDULE}>
                <a href="#" className="fancy-button pop-onhover gradient">
                  <span>Click here to chat</span>
                </a>
                </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    
);

export default Landing;
