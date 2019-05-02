import React, { Component } from 'react';
import Logo from '../../assets/Logo-Img.png';
import './Home.scss'


const LogScreen = () => (
    <div className="home-container-inner" style={{alignItems: 'center', justifyContent: 'center'}}>
        <div>
        <p className="home-c2-name" >Which call would you like to log?</p>
        <div className="log-container">
            <div className="log-call">
                <p>4:45pm</p>
            </div>
            <div className="log-call">
                <p>4:30pm</p>
            </div>
        </div>
        </div>
    </div>
);








class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {selectLog: false};
        this.toggleSelectLog = this.toggleSelectLog.bind(this);
    }

    toggleSelectLog() {
        var select = this.state.selectLog;
        this.setState({selectLog: !select});
    }


    render() {
        return (
            <div className="landing-img-div">
                <div className="home-container-outer">
                    {!this.state.selectLog && (
                        <div className="home-container-inner">
                            <div className="home-c1">

                            </div>
                            <div className="home-c2">
                                <div className="home-c2-title">
                                    <p className="home-c2-name">Karey</p>
                                    <img src={Logo} className="home-c2-logo"/>
                                </div>
                                <div className="home-c2-stats">
                                    <div className="home-c2-stat">
                                        <p className="home-c2-stat-num">2</p>
                                        <p className="home-c2-stat-desc">Sunrose calls today</p>
                                    </div>
                                    <div className="home-c2-stat">
                                        <p className="home-c2-stat-num">9</p>
                                        <p className="home-c2-stat-desc">Calls this week</p>
                                    </div>
                                    <div className="home-c2-stat">
                                        <p className="home-c2-stat-num">36</p>
                                        <p className="home-c2-stat-desc">People helped this month</p>
                                    </div>
                                </div>
                                <div className="home-c2-log">
                                <button className="home-log-btn" onClick={this.toggleSelectLog}>Log a call</button>
                                </div>
                            </div>
                        </div>

                    )}
                    {this.state.selectLog && (
                        <LogScreen />
                    )}
                    
                </div>
            </div>
        );
    }
} 


export default Home;
