import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import TextField from '@material-ui/core/TextField';
import BackBtn from '../../assets/back-btn.png';
import { withFirebase } from '../Firebase';


class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.location.state;
        console.log(this.state);
        this.state  = ({
            call: this.props.location.state,
            notes: '',
        });
        this.addNotes = this.addNotes.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            notes: event.target.value
        });
    }

    addNotes() {
        console.log(this.state);
        let CallRef = this.props.firebase.call(this.state.call.call.id);
        CallRef.update({
            Notes: this.state.notes,
            Logged: true,
        });
    }

    render() {
        return (
            <div className="landing-img-div">
                <div className="home-container-outer" style={{alignItems: 'center'}}>
                <div className="home-container-inner" style={{alignItems: 'center', justifyContent: 'center', height: '60%', position: 'relative'}}>
                    <Link to={ROUTES.HOME}><img src={BackBtn} className="back-btn"/></Link> 
                    <div style={{width: '80%', padding: '0px 10%', display: 'flex', justifyContent: 'center'}}>
                        <div style={{width: '60%', textAlign: 'center'}}>
                            <p className="home-c2-name" >Any notes?</p>
                            <TextField
                                id="notes"
                                type="text"
                                fullWidth="true"
                                multiline="true"
                                value={this.state.notes}
                                onChange={this.handleChange}
                                style={{display: 'block'}}
                            />
                            <Link to={ROUTES.HOME}><button className="schedule-btn" style={{marginTop: 30}} onClick={this.addNotes}>Done</button></Link>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default withFirebase(Notes);