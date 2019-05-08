import React from 'react';
import './Landing.scss'
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo-No-Bkg.png';
import * as ROUTES from '../../constants/routes';
import VRImg from '../../assets/vr-img.png';
import edge1 from '../../assets/landing-edge-1.png';
import edge2 from '../../assets/landing-edge-2.png';
import arrow from '../../assets/landing-arrow.png';

const Landing = () => (

    <div className="landing-parent">
      <div className="landing-img-div landing-child">
        <div className="landing-content">
          <div className="landing-content-inner">
            <div style={{textAlign: 'center'}}>
                <img src={Logo} style={{width: '100%', display: 'block', paddingLeft: '10%', paddingRight: '10%'}} />
                <p className="landing-section-text">An immersive counseling experience like no other. Completely anonymous.</p>
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
        <p className="landing-bottom-label" style={{color: '#ac9591'}}>Learn more</p>
        <img src={arrow} className="landing-bottom-arrow"/>
      </div>
      <div className="landing-child" style={{backgroundColor: 'white'}}>
        <img src={edge1} className="landing-edge-1"/>
        <img src={edge2} className="landing-edge-2"/>
        <div className="landing-content-inner" style={{height: 'auto', padding: '0px 20%'}}>
          <p className="landing-big-text">We are using VR to reimagine the emotional care space.</p>
        </div>
        <p className="landing-bottom-label">The Sunrose Conversation</p>
        <img src={arrow} className="landing-bottom-arrow"/>
      </div>
      <div className="landing-child landing-bkg2">
        <div className="landing-content-inner">
          <div className="landing-child-row">
            <div className="landing-child-col"></div>
            <div className="landing-child-col">
              <div style={{padding: '50px 20px', backgroundColor: 'rgba(0,0,0,0.4)'}}>
                <p className="landing-section-title" style={{color: 'white'}}>Discover an immersive alternative to traditional anonymous phone counseling services.</p>
                <p className="landing-section-text" style={{color: 'white'}}>In Sunrose, conversations with a counselor take place in virtual reality environments. These environments are designed to feel fully immersive, tranquil, safe, and private. With Sunrose, you can maintain anonymity while being able to engage and feel heard as if the counselor was right there with you.</p>
              </div>
            </div>
           
          </div>
          <p className="landing-bottom-label">How it works</p>
          <img src={arrow} className="landing-bottom-arrow"/>
        </div>

      </div>
      <div className="landing-child">
        <div className="landing-content-inner">
          <div className="landing-child-row">
            <div className="landing-child-col">
              <p className="landing-section-title" style={{color: '#019388'}}>What you do</p>
              <p className="landing-section-text" style={{color: '#019388'}}>Open the Sunrose VR app, and select any environment you’d like. You can move around and explore the space using your controller (point & click trackpad).</p>
              <p className="landing-section-text" style={{color: '#019388'}}>Once you’re all settled in, you can call a counselor, and the counselor will join your environment.  </p>
              <p className="landing-section-text" style={{color: '#019388'}}>You and the counselor will both appear as abstract cubes with hands. You’ll be able to hear each other’s voice, and see each other’s hand gestures and movement within the space. </p>
              <p className="landing-section-text" style={{color: '#019388'}}>Once the conversation is done, either you or the counselor can end the call.</p>
            </div>
            <div className="landing-child-col" style={{alignItems: 'center'}}>
              <img src={VRImg} style={{width: '90%', padding:'20px 20px'}}/>
            </div>
          </div>
        </div>
        <p className="landing-bottom-label">Our Philosophy</p>
        <img src={arrow} className="landing-bottom-arrow"/>
      </div>
      <div className="landing-child landing-bkg3">
        <div className="landing-content-inner">
          <div className="landing-child-row">
            <div className="landing-child-col">
              <div style={{padding: '70px 20px', backgroundColor: 'rgba(0,0,0,0.4)'}}>
                <p className="landing-section-title" style={{color :'white'}}>Be heard while staying anonymous.</p>
                <p className="landing-section-text" style={{color :'white'}}>You won’t need to make an account or sign in to speak with a counselor in one of our environments—our goal is to help people find support and feel heard with as little friction as possible. We don’t store any information that can be tied to your identity, and the counselor on the other end doesn’t have any information about you or your headset details and location.</p>
              </div>
            </div>
            <div className="landing-child-col"></div>
          </div>
        </div>
        <p className="landing-bottom-label">Get started today</p>
        <img src={arrow} className="landing-bottom-arrow"/>
      </div>
      <div className= "landing-child">
        <div className="landing-content-inner" style={{height: 'auto', padding: '0px 20%'}}>
          <div style={{textAlign: 'center'}}>
            <p className="landing-big-text">Discover a place for your thoughts.</p>
            <Link to={ROUTES.SCHEDULE}>
                      <a href="#" className="fancy-button pop-onhover gradient">
                        <span>Try Sunrose for free</span>
                      </a>
            </Link>
          </div>
      </div>
      </div>
    </div>
    
);

export default Landing;
