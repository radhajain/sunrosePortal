import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import './Logs.scss';
import { withFirebase } from  '../Firebase';
import BackBtn from '../../assets/back-btn.png';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class LogsBase extends Component {
    constructor(props){
        super(props);
        this.state = {
            allCalls: []
        };
    }

    componentDidMount() {
        let CallsRef = this.props.firebase.calls()
        CallsRef.on('value', (snapshot) => {
          let calls = snapshot.val();
          console.log(calls);
          let raw = [];
          for (let call in calls) {
            if (calls[call].StartTime !== undefined) {
                raw.push({
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
          this.setState({
            allCalls: raw
          });
          console.log(this.state.allCalls);
        });
    }


    render() {
        function getDuration(duration) {
            if (duration !== undefined) {
                var time = duration.split('.')[1];
                time = time.slice(0,-3);
                return time
            }
            return '';
        }
        
        function getDate(start) {
            if (start !== undefined) {
                return start.split('T')[0];
            }
            return '';
            
        }

        function getStartTime(start) {
            if (start !== undefined) {
                var time = start.split('T')[1];
                time = time.slice(0, 5);
                return time;
            }
            return '';
        }

        function getLogo(key) {
            if (key % 2 == 0) {
                return 'log-call img2'
            } else {
                return "log-call img1";
            }
        }
        return (
            <div className="landing-img-div">
                 <div className="home-container-outer">
                        <div className="home-container-inner" style={{justifyContent: 'center', position: 'relative', flexDirection: 'column', alignItems: 'unset'}}>
                        <Link to={ROUTES.HOME}><img src={BackBtn} className="back-btn"/></Link>
                            <div style={{height: '90%',  paddingBottom: '5%', textAlign: 'center'}}>
                                <p className="log-title">All Calls Log</p>
                                <div className="logs-container">
                                    <div className="log-row">
                                        <div className="log-cell"><p className="log-header">Environment</p></div>
                                        <div className="log-cell"><p className="log-header">Date</p></div>
                                        <div className="log-cell"><p className="log-header">Counselor</p></div>
                                        <div className="log-cell"><p className="log-header">Start time</p></div>
                                        <div className="log-cell"><p className="log-header">Duration</p></div>
                                        <div className="log-cell"><p className="log-header">Notes</p></div>
                                    </div>
                                    {this.state.allCalls.map((call, key) => {
                                        return (
                                            <div className="log-row" id={key}>
                                                <div className="log-cell">
                                                    <div className={getLogo(key)}></div>
                                                </div>
                                                <div className="log-cell"><p>{getDate(call.end_time)}</p></div>
                                                <div className="log-cell"><p>{call.counselor_name}</p></div>
                                                <div className="log-cell"><p>{getStartTime(call.end_time)}</p></div>
                                                <div className="log-cell"><p>{getDuration(call.duration)}</p></div>
                                                <div className="log-cell" style={{textAlign: 'left'}}><p>{call.notes}</p></div>
                                            </div>
                                        );
                                    })}


                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>
            </div>
        );
    }

}
 


const Logs = withFirebase(LogsBase)
const condition = authUser => !!authUser;

export default withAuthorization(condition)(Logs);