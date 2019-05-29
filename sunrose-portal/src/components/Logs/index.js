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
            if (calls[call].start_time !== undefined) {
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
          this.setState({
            allCalls: raw
          });
          console.log(this.state.allCalls);
        });
    }


    render() {
        function getDuration(start, end) {
            var startDate = new Date();
            var endDate = new Date();
            var startTimeParsed = start.split(' ')[1].split(':'); 
            startDate.setHours(startTimeParsed[0], startTimeParsed[1]);
            var endTimeParsed = end.split(' ')[1].split(':');
            endDate.setHours(endTimeParsed[0], endTimeParsed[1]);
            var differenceInSeconds = (Math.abs(endDate - startDate))/1000;
            var hours = differenceInSeconds / 3600;
            var minutes = Math.round((differenceInSeconds % 3600) / 60);
            if (hours == 0) {
                var diffString = minutes + " mins";
                return diffString;
            }
            var diffString = hours + " hrs " + minutes + " mins"
            return diffString;
        }
        
        function getDate(start) {
            if (start !== undefined) {
                return start.split(' ')[0];
            }
            return '';
            
        }

        function getStartTime(start) {
            if (start !== undefined) {
                var time = start.split(' ')[1];
                time = time.slice(0, -3);
                return time;
            }
            return '';
        }
        return (
            <div className="landing-img-div">
                 <div className="home-container-outer">
                        <div className="home-container-inner" style={{justifyContent: 'center', position: 'relative', flexDirection: 'column'}}>
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
                                                    <div className="log-call img2"></div>
                                                </div>
                                                <div className="log-cell"><p>{getDate(call.start_time)}</p></div>
                                                <div className="log-cell"><p>{call.counselor_id}</p></div>
                                                <div className="log-cell"><p>{getStartTime(call.start_time)}</p></div>
                                                <div className="log-cell"><p>{getDuration(call.start_time, call.end_time)}</p></div>
                                                <div className="log-cell"><p>{call.notes}</p></div>
                                            </div>
                                        );
                                    })}

                                    {/* <table className="log-container">
                                        <tr>
                                            <td><p className="log-header">Environment</p></td>
                                            <td><p className="log-header">Date</p></td>
                                            <td><p className="log-header">Counselor</p></td>
                                            <td><p className="log-header">Start time</p></td>
                                            <td><p className="log-header">Duration</p></td>
                                            <td><p className="log-header">Notes</p></td>
                                        </tr>
                                        {this.state.allCalls.map((call, key) => {
                                            return (
                                                <tr className="log-row" id={key}>
                                                    <td>
                                                        <div className="log-call img2"></div>
                                                    </td>
                                                    <td><p>{getDate(call.start_time)}</p></td>
                                                    <td><p>{call.counselor_id}</p></td>
                                                    <td><p>{getStartTime(call.start_time)}</p></td>
                                                    <td><p>{getDuration(call.start_time, call.end_time)}</p></td>
                                                    <td><p>{call.notes}</p></td>
                                                </tr>
                                            );
                                        })}
                                    </table> */}
                                    
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