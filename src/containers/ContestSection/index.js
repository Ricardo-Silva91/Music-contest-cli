import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as rest_client from '../rest_client';
import * as general_ops from '../general_ops';

import './contestSection.css';

class ContestSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            term: '',
            currentContest: {
                id: -1,
                songs: []
            },
            time_remaining: -1,
            last_winner: {},
            error_msg: '',
            myPost: -1,
            myVotedSongId: -1,
        }

    }

    getContest() {
        const token = general_ops.getCookie('musicContester');
        rest_client.getCurrentContest(token, (response) => {
            //console.log(response);

            response.contest.songs.sort((a, b) => {
                return parseFloat(b.score.length) - parseFloat(a.score.length);
            });

            let voteFound = false, postFound = false;

            for (let i = 0; i < response.contest.songs.length; i++) {
                //console.log(this.state.myUserId);
                //console.log(JSON.stringify(responseJson.contest.songs[i].score));

                for (let j = 0; j < response.contest.songs[i].score.length; j++) {
                    //console.log(this.state.myUserId + ' ' + responseJson.contest.songs[i].score[j].userId);
                    if (this.props.meUser.userId === response.contest.songs[i].score[j].userId) {
                        this.setState({myVotedSongId: response.contest.songs[i].id});
                        voteFound = true;
                        break;
                    }
                }

                /*
                if (responseJson.contest.songs[i].score.findIndex((u) => {
                        return u.userId === this.state.myUserId;
                    }) !== -1) {
                    this.setState({myVotedSongId: responseJson.contest.songs[i].id});
                    voteFound = true;
                }
                */

                if (response.contest.songs[i].owner === this.props.meUser.user) {
                    this.setState({myPost: response.contest.songs[i].id});
                    postFound = true;
                }
                if (voteFound && postFound) {
                    break;
                }
            }

            this.setState({
                currentContest: response.contest,
                time_remaining: response.time_remaining,
                last_winner: response.last_winner
            });

        })
    }

    entryInfo(score){
        let result = 0;
        for (let i = 0; i<score.length; i++) {
            if(score[i].userId === this.props.meUser.userId){
                result = 1;
                break;
            }
        }
        return result;
    }

    populateContestSection(){
        //console.log(this.state.currentContest);
        if(this.state.currentContest.songs.length > 0){

            let contestEntries = [];

            for (let i=0; i<this.state.currentContest.songs.length; i++) {
                let currentEntry = this.state.currentContest.songs[i];

                let entryInfo;
                if (currentEntry.owner === this.props.meUser.user) {
                    entryInfo = 2;
                }
                else {
                    entryInfo = this.entryInfo(currentEntry.score);
                }

                //console.log(currentEntry.owner + '\n' + this.props.meUser);
                contestEntries.push(
                    <ul key={currentEntry.title} className={entryInfo === 2 ? 'myPost' : entryInfo === 1 ? 'myVote' : ''} onClick={() => {
                        rest_client.voteForCandidate(general_ops.getCookie('musicContester'), currentEntry.id, (response) => {
                            console.log(response);
                            this.getContest();
                        })
                    }}>
                        <li>
                            <img alt="" src={currentEntry.thumbnailUrl}/>
                            <h3>{currentEntry.title}</h3>
                            <p>Score: {currentEntry.score.length}</p>
                        </li>
                    </ul>
                )
            }

            return contestEntries;

        }
        else
        {
            return (<h5>No candidates yet ¯\_(ツ)_/¯</h5>);
        }
    }

    componentWillMount() {
        //console.log(this.props.prepperValues.Selected_house);
        //console.log('mounting contest')
        this.getContest();
        console.log(this.props.meUser);
    }

    componentDidMount() {
        setInterval(() => {
            this.getContest();
        }, 10000);


        setInterval(() => {
            if(this.state.time_remaining > 0) {
                this.setState({time_remaining: this.state.time_remaining - 1});
            }
        }, 1000);
    }

    render() {
        return (
            <div align="center">
                <div id="lastWinner">
                    <h3>Now Playing</h3>

                    <div className="videoThumb">
                        <ul>
                            <li>
                                <img alt="" src={this.state.last_winner.thumbnailUrl}/>
                                <h3>{this.state.last_winner.title}</h3>
                                <p>Posted by: {this.state.last_winner.owner}</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr/>

                <div id="currentContest">
                    <h3>Current Contest {this.state.time_remaining > 0 ? "(finishes in " +general_ops.secondsToPretty(this.state.time_remaining) +")" : "(Open: first one wins)"}</h3>

                    <div className="videoThumb">

                        {this.populateContestSection()}

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContestSection)