import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import BackBtn from '../../assets/back-btn.png';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import './LogScreen.scss'


class LogScreen extends Component {
    constructor(props) {
        super(props);
        this.state= {
            unloggedCalls: [],
        }
    }

    componentDidMount() {
        let CallsRef = this.props.firebase.calls()
        CallsRef.on('value', (snapshot) => {
          let calls = snapshot.val();
          console.log(calls);
          let raw = [];
          for (let call in calls) {
            if (calls[call].StartTime !== undefined && !calls[call].Logged) {
                raw.push({
                    id: call,
                    counselor_id: calls[call].CounselourId,
                    counselor_name: calls[call].CounselourName,
                    end_time: calls[call].EndTime,
                    duration: calls[call].Duration,
                    start_time: calls[call].StartTime,
                    environment: calls[call].Environment,
                    notes: calls[call].Notes
                  });
            }
          }
          console.log(raw);
          let divided = []
          for (let index = 2; index < raw.length; index += 3) {
            divided.push([raw[index - 2], raw[index-1], raw[index]]);
          }
          this.setState({
            unloggedCalls: divided
          });
          console.log(this.state.unloggedCalls);
        });
    }

    render() {
        function getStartTime(start) {
            if (start !== undefined) {
                var time = start.split('T')[1];
                time = time.slice(0, 5);
                return time;
            }
            return '';
        }
        return (
            <div className="home-container-outer" style={{alignItems: 'unset'}}>
                <div className="home-container-inner" style={{alignItems: 'center', justifyContent: 'center', height: '100%', position: 'relative'}}>
                <img src={BackBtn} className="back-btn" onClick={() => this.props.toggleSelectLog()}/>
                    <div>
                    <p className="home-c2-name" >Which call would you like to log?</p>
                    <div className="log-screen-container">
                        {this.state.unloggedCalls.map((calls, key) => {
                            return (
                                <div className="log-screen-row">
                                    <Link to={{
                                        pathname: 'notes',
                                        state: {
                                            call: calls[0]
                                        }
                                    }} > 
                                        <div className="log-call img1">
                                            <p className="log-call-time">{getStartTime(calls[0].end_time)}</p>
                                        </div>
                                        <p style={{color: '#17837E', fontWeight: 'bold', textAlign: 'center'}}>{calls[0].counselor_name}</p>
                                    </Link>
                                    <Link to={{
                                        pathname: 'notes',
                                        state: {
                                            call: calls[1]
                                        }
                                    }} > 
                                        <div className="log-call img1">
                                            <p className="log-call-time">{getStartTime(calls[1].end_time)}</p>
                                        </div>
                                        <p style={{color: '#17837E', fontWeight: 'bold', textAlign: 'center'}}>{calls[1].counselor_name}</p>
                                    </Link>
                                    <Link to={{
                                        pathname: 'notes',
                                        state: {
                                            call: calls[2]
                                        }
                                    }} > 
                                        <div className="log-call img1">
                                            <p className="log-call-time">{getStartTime(calls[2].end_time)}</p>
                                        </div>
                                        <p style={{color: '#17837E', fontWeight: 'bold', textAlign: 'center'}}>{calls[2].counselor_name}</p>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                    </div>
                </div>
                </div>
        );
    }
}

export default withFirebase(LogScreen);