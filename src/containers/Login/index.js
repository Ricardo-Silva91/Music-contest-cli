import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
    set_token
} from '../../modules/Contest';

import * as rest_client from '../rest_client';
import * as general_ops from '../general_ops';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error_msg: ''
        }
    }

    componentDidMount() {
        //console.log(this.props.prepperValues.Selected_house);
        /*
        rest_client.getUserExists('0', (response) => {
            //console.log(response);
        })
        */
    }

    changeUser(event) {
        this.setState({username: event.target.value});
    }

    changePass(event) {
        this.setState({password: event.target.value});
    }

    submitLogin() {
        console.log('logging');
        rest_client.login(this.state.username, this.state.password, (response) => {
            if (response.result !== undefined && response.result === 'success') {
                console.log('accepted');
                this.props.set_token(response.token);
                general_ops.setCookie(response.token);
                window.location.reload();
            }
            else {
                this.setState({
                    error_msg:
                        <div className="alert alert-danger">
                            <strong>Try Again</strong>
                        </div>
                });
            }
        })
    }

    render() {
        return (
            <div>
                <h3>Please Login</h3>

                <br/>

                {this.state.error_msg}

                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.submitLogin()
                }}>

                    <div className="form-group">
                        <label>Username &nbsp;</label>
                        <input required type="text" value={this.state.username} onChange={(e) => {
                            this.changeUser(e)
                        }}/>
                    </div>

                    <div className="form-group">
                        <label>Password &nbsp;</label>
                        <input required type="password" value={this.state.password} onChange={(e) => {
                            this.changePass(e)
                        }}/>
                    </div>

                    <input type="submit"/>

                </form>

            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    set_token
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)