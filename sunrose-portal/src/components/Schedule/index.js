import React, { Component } from 'react';
import Logo from '../../assets/Logo-No-Bkg-White.png';
import BackBtn from '../../assets/back-btn.png';
import './Schedule.css';

import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import { withStyles } from '@material-ui/core/styles';
import InputMask from 'react-input-mask';
import TextField from '@material-ui/core/TextField';


class CallNow extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{width: '80%', padding: '30px 10%'}}>
                <img src={BackBtn} className="back-btn" onClick={() => this.props.toggleNow()}/>
                <p className="schedule-text">There are counselors available to chat now.</p>
                <p className="schedule-text bold">Please head over to the Sunrose VR app and call when you're ready.</p>
                <Link to={ROUTES.LANDING}><button className="schedule-btn">Learn More</button></Link>
            </div>
        );
    }
}
    


class AskChat extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (  
            <div style={{width: '80%', padding: '30px 10%'}}>  
                <Link to={ROUTES.LANDING}><img src={BackBtn} className="back-btn"/></Link>
                <p className="schedule-text">There are counselors available to chat now.</p>
                <p className="schedule-text bold">When would you like to chat?</p>
                <div>
                    <button 
                        className="schedule-btn"
                        onClick={() => this.props.toggleNow()}
                        >
                        As soon as possible
                    </button>
                    <button 
                        onClick={() => this.props.toggleLater()} 
                        className={this.props.showLater ? "schedule-btn-active" : "schedule-btn"}
                        >
                        Later
                    </button>
                </div>
                {this.props.showLater && 
                (
                <div>
                    <p className="schedule-text bold">You can use the Sunrose VR app to call in anytime.</p>
                    <p className="schedule-text">If you'd like, we can let you know when someone is available.</p>
                    <p className="schedule-text bold">Around when would you like to chat?</p>
                    <TextField
                        id="time"
                        type="time"
                        defaultValue="19:30"
                        style={{display: 'block'}}
                        inputProps={{
                        step: 900, // 5 min
                        }}
                    />
                    <button 
                        className="schedule-btn"  
                        style={{marginTop: 25}}
                        onClick={() => this.props.togglePhone()}>
                        Next
                    </button>

                </div>
                )}
            </div>
        );
    }
}
  

class EnterPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {phone: null};
    }
    render() {
        return (
            <div style={{width: '80%', padding: '30px 10%'}}>  
                <img src={BackBtn} className="back-btn" onClick={() => this.props.togglePhone()}/>
                <p className="schedule-text bold">Leave your phone number and we'll text you when a counselor becomes available.</p>
                <p className="schedule-text">Don't worry - this text is automated so no one will see this number.</p>
                <TextField
                        error
                        id="phoneNum"
                        type="number"
                        style={{display: 'block'}}
                >
                    <InputMask mask="+1\(999) 999-9999" maskChar=" " value={this.state.phone} />
                </TextField>
                <p className="schedule-text bold">Sit back, relax, and we'll take care of the rest.</p>
                <Link to={ROUTES.LANDING}><button className="schedule-btn">Done</button></Link> 
            </div>
        );
    }
}
  



class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state={showLater: false, showCallNow: false, showPhone: false};
        this.toggleLater = this.toggleLater.bind(this);
        this.toggleNow = this.toggleNow.bind(this);
        this.togglePhone = this.togglePhone.bind(this);
    }

    toggleLater() {
        const later = this.state.showLater;
        this.setState({showLater: !later});
    }

    toggleNow() {
        const now = this.state.showCallNow;
        this.setState({showCallNow: !now});
    }

    togglePhone() {
        const phone = this.state.showPhone;
        this.setState({showPhone: !phone});
    }

    render () {
        return (
            <div className="landing-img-div">
                    <div className="schedule-logo">
                        <div className="schedule-logo-inner">
                            <img src={Logo} style={{width: '300px'}}/>
                        </div>
                    </div>
                    <div className="schedule-container-outer">
                        <div className="schedule-container-inner">
                            {!this.state.showCallNow && !this.state.showPhone && 
                                <AskChat 
                                    toggleLater={this.toggleLater} 
                                    toggleNow = {this.toggleNow}
                                    togglePhone = {this.togglePhone}
                                    showLater = {this.state.showLater}/>
                            }
                            {this.state.showCallNow &&
                                <CallNow
                                    toggleNow={this.toggleNow}
                                />
                            }
                            {this.state.showPhone && 
                                <EnterPhone 
                                    togglePhone={this.togglePhone}
                                    />
                            }
                        </div>
                    </div>
            </div>

        );
    }
}



export default Schedule;