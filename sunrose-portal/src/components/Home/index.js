import React, { Component } from 'react';
import Logo from '../../assets/Logo-Img.png';
import StatusBtn from '../../assets/active-dot.png';
import BackBtn from '../../assets/back-btn.png';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import './Home.scss';
import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import Firebase from '../Firebase/firebase';
import firebase from 'firebase'
require('firebase/auth')


class LogScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home-container-outer" style={{alignItems: 'unset'}}>
                <div className="home-container-inner" style={{alignItems: 'center', justifyContent: 'center', height: '60%', position: 'relative'}}>
                <img src={BackBtn} className="back-btn" onClick={() => this.props.toggleSelectLog()}/>
                    <div>
                    <p className="home-c2-name" >Which call would you like to log?</p>
                    <div className="log-container">
                        <Link to={ROUTES.NOTES}> <div className="log-call img1">
                            <p className="log-call-time">4:45pm</p>
                        </div></Link>
                        
                        <Link to={ROUTES.NOTES}><div className="log-call img2">
                            <p className="log-call-time">4:30pm</p>
                        </div></Link>
                    </div>
                    </div>
                </div>
                </div>
        );
    }
}



class HomeConst extends Component {
    constructor(props) {
        super(props);
        this.state = {selectLog: false};
        this.toggleSelectLog = this.toggleSelectLog.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.state = {
            authUser: null,
            user_uid: null, // if we have the user's UID, we can index into & access our created user info data in firebase
            name_of_user: null,
        };
    }

    // // Sets the 'name_of_user' state var by accessing the Firebase database
    getUserData(uid) {
        let UserRef = this.props.firebase.user(uid)
        UserRef.on('value', (snapshot) => {
            let user = snapshot.val();
            this.setState({
                name_of_user: user.name,
            });
        });
        this.setState({authUser: true});
        this.setState({user_uid: uid});
    }  

    componentDidMount() {
        firebase.auth().onAuthStateChanged(function(authUser) {
            if (authUser) {
                this.getUserData(authUser.uid);
            } else {
            }
         }.bind(this));
      }
    

    toggleSelectLog() {
        var select = this.state.selectLog;
        this.setState({selectLog: !select});
    }


    render() {
        return (
            <div className="landing-img-div">
                
                    {!this.state.selectLog && (
                        <div className="home-container-outer">
                        <div className="home-container-inner">
                            <div className="home-c1">

                            </div>
                            <div className="home-c2">
                                <div className="home-c2-title">
                                    <div>
                                        <img src={StatusBtn} style={{width: 20, display: 'inline-block', padding: '0px 5px'}}></img>
                                        <p className="home-c2-name">{this.state.name_of_user}</p>
                                    </div>
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
                        </div>

                    )}
                    {this.state.selectLog && (
                        <LogScreen toggleSelectLog={this.toggleSelectLog} />
                    )}
                    
                
            </div>
        );
    }
} 

const Home = withFirebase(HomeConst)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);

