import React, {Component} from 'react';
import './App.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


import ContestSection from './containers/ContestSection/';
import Login from './containers/Login';
import MySection from './containers/MySection';
import ServerDead from './containers/ServerDead';

import * as general_ops from './containers/general_ops';
import * as rest_client from './containers/rest_client';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mainSec: '',
            usersData: [],
            myUserId: -1,
            meUser: ''
        }
    }

    checkState() {

        if (this.state.meUser === '') {
            //const token = this.props.token;
            const token = general_ops.getCookie('musicContester');

            if (token !== '') {
                rest_client.getCurrentContest(token, (response) => {
                    if (response.result === 'success') {

                        //console.log('token works');

                        this.setState({token: token});
                        this.getUsersDataBrief().then(()=> {
                            this.setState({
                                mainSec:
                                    <div className="row">
                                        <div id="current_contest_section" className="col-6">
                                            <ContestSection meUser={this.state.meUser}/>
                                        </div>

                                        <div id="mt_options_section" className="col-6">
                                            <MySection/>
                                        </div>
                                    </div>
                            });
                        });


                    }
                    else if (response.result === 'fail') {

                        //console.log('token failed');

                        this.setState({
                            mainSec:
                                <Login/>
                        })
                    }
                    else {
                        this.setState({
                            mainSec:
                                <ServerDead/>
                        })
                    }
                })
            }
            else {
                rest_client.getUserExists('0', (response) => {
                    if (response.result !== 'error') {

                        //console.log('token doesn\'t exist');

                        this.setState({
                            mainSec:
                                <Login/>
                        })
                    }
                    else {
                        this.setState({
                            mainSec:
                                <ServerDead/>
                        })
                    }
                })
            }
        }

    }

    getUsersDataBrief() {
        return fetch('/getUsersDataBrief?token=' + this.state.token)
            .then((response) => response.json())
            .then((responseJson) => {

                let myId = -1;

                for (let i = 0; i < responseJson.length; i++) {
                    if (responseJson[i].me === true) {
                        myId = i;
                    }
                }

                this.setState({
                    usersData: responseJson,
                    myUserId: responseJson[myId].userId,
                    meUser: responseJson[myId]
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentWillMount() {
        //console.log('must mount');
        this.checkState();
    }

    componentDidUpdate() {
        //this.checkState();
        //console.log('updating');
    }

    render() {
        return (
            <div align="center">
                <div id="bg"></div>
                <div id="overlay"></div>
                <header id="header">
                    <h1>My Music Contest</h1>
                    <p>Nobody Cares...</p>
                    {this.state.mainSec}
                </header>
                <footer id="footer">
                    <span className="copyright">&copy; BadReviews</span>
                </footer>
            </div>
        );

        /*

      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      );

      */
    }
}

const mapStateToProps = state => ({
    token: state.Contest.token
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
