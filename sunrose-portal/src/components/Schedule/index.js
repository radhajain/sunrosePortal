import React, { Component } from 'react';
import Logo from '../../assets/Logo-No-Bkg-White.png';
import './Schedule.css';


const CallNow = () => (
    <div>
        <p>There are counselors available to chat now.</p>
        <p>Please head over to the Sunrose VR app and call when you're ready.</p>
        <button>Learn More</button>
    </div>
);

class AskChat extends Component {
    constructor(props) {
        super(props);
    }

    toggleLater = () => {
        this.props.toggleLater();
    }

    toggleNow = () => {
        this.props.toggleNow();
    }

    togglePhone = () => {
        this.props.togglePhone();
    }

    render() {
        return (
            <div style={{paddingTop: 30}}>  
                <p>There are counselors available to chat now.</p>
                <p>When would you like to chat?</p>
                <div>
                    <button 
                        className="schedule-btn"
                        onClick={this.props.toggleNow}
                        >
                        As soon as possible
                    </button>
                    <button 
                        onClick={this.toggleLater} 
                        className={this.props.showLater ? "schedule-btn-active" : "schedule-btn"}
                        >
                        Later
                    </button>
                </div>
                {this.props.showLater && 
                (
                <div>
                    <p>If you like, we can let you know when someone is available.</p>
                    <p>Around when would you like to chat?</p>
                    <button onClick={this.togglePhone}>Next</button>

                </div>
                )}
            </div>
        );
    }
}
  

class EnterPhone extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{paddingTop: 30}}>  
                <p>Leave your phone number and we'll text you when a counselor becomes available.</p>
                <p>Don't worry - this text is automated so no one will see this number.</p>
                <p>Sit back, relax, and we'll take care of the rest.</p>
                <button>Done</button>
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
        this.setState({showCallNow: true});
    }

    togglePhone() {
        this.setState({showPhone: true});
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
                                <CallNow/>
                            }
                            {this.state.showPhone && 
                                <EnterPhone />
                            }
                        </div>
                    </div>
            </div>

        );
    }
}



export default Schedule;