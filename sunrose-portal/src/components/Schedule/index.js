import React from 'react';
import Logo from '../../assets/Logo-No-Bkg-White.png';
import './Schedule.css';

const Schedule = () => (
  <div className="landing-img-div">
        <div className="schedule-logo">
            <div className="schedule-logo-inner">
                <img src={Logo} style={{width: '300px'}}/>
            </div>
        </div>
        <div className="schedule-container-outer">
            <div className="schedule-container-inner">
                <p>There are counselors available to chat now.</p>
                <p>When would you like to chat?</p>
                <div>
                    <button className="schedule-btn">As soon as possible</button>
                    <button className="schedule-btn">Later</button>
                </div>
            </div>
        </div>
  </div>
);

export default Schedule;