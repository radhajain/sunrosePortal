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
            if (calls[call].start_time !== undefined && !calls[call].logged) {
                raw.push({
                    counselor_id: calls[call].counselor_id,
                    end_time: calls[call].end_time,
                    start_time: calls[call].start_time,
                    environment: calls[call].environment,
                    notes: calls[call].notes
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
                var time = start.split(' ')[1];
                time = time.slice(0, -3);
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
                                    <Link to={ROUTES.NOTES}> 
                                        <div className="log-call img1">
                                            <p className="log-call-time">{getStartTime(calls[0].start_time)}</p>
                                        </div>
                                    </Link>
                                    <Link to={ROUTES.NOTES}> 
                                        <div className="log-call img1">
                                            <p className="log-call-time">{getStartTime(calls[1].start_time)}</p>
                                        </div>
                                    </Link>
                                    <Link to={ROUTES.NOTES}> 
                                        <div className="log-call img1">
                                            <p className="log-call-time">{getStartTime(calls[2].start_time)}</p>
                                        </div>
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