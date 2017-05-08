/**
 * Created by rofler on 5/6/17.
 */
import React, {Component} from "react"
import general_methods from "./General_methods"

export default class ContestSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: props.token,
            term: '',
            currentContest: {
                id: -1,
                songs: []
            },
            time_remaining: -1,
            last_winner: {},
            error_msg: '',
            usersData: [],
            myUserId: -1,
            myPost: -1,
            myVotedSongId: -1,
        };
    }

    getPersonByUser(user) {

        let result = null;

        for (let i = 0; i < this.state.usersData.length; i++) {
            if (user === this.state.usersData[i].user) {
                result = this.state.usersData[i];
                break;
            }
        }
        return result;
    }

    getCurrentContest() {
        return fetch('/getCurrentContest?token=' + this.state.token)
            .then((response) => response.json())
            .then((responseJson) => {

                responseJson.contest.songs.sort((a, b) => {
                    return parseFloat(b.score.length) - parseFloat(a.score.length);
                });

                let voteFound = false, postFound = false;

                for (let i = 0; i < responseJson.contest.songs.length; i++) {
                    //console.log(this.state.myUserId);
                    //console.log(JSON.stringify(responseJson.contest.songs[i].score));

                    for(let j=0; j<responseJson.contest.songs[i].score.length;j++)
                    {
                        //console.log(this.state.myUserId + ' ' + responseJson.contest.songs[i].score[j].userId);
                        if(this.state.myUserId === responseJson.contest.songs[i].score[j].userId)
                        {
                            this.setState({myVotedSongId: responseJson.contest.songs[i].id});
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

                    if (responseJson.contest.songs[i].owner === this.state.meUser.user) {
                        this.setState({myPost: responseJson.contest.songs[i].id});
                        postFound = true;
                    }
                    if (voteFound && postFound) {
                        break;
                    }
                }

                this.setState({
                    currentContest: responseJson.contest,
                    time_remaining: responseJson.time_remaining,
                    last_winner: responseJson.last_winner
                });
            })
            .catch((error) => {
                console.error(error);
            });
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

                this.setState({usersData: responseJson, myUserId: responseJson[myId].userId, meUser: responseJson[myId]});

            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        this.getUsersDataBrief();
        this.getCurrentContest();
        this.setState({start: new Date()});


        setInterval(() => {
            this.getCurrentContest();
        }, 10000);


        setInterval(() => {
            this.setState({time_remaining: this.state.time_remaining - 1});
        }, 1000);
    }

    voteForCandidate(entryId) {
        //console.log('will vote for '+ entryId);
        general_methods.voteForCandidate(this.state.token, entryId, (response) => {
            //console.log(JSON.stringify(response));
            if (response.result === 'fail') {
                this.setState({error_msg: response.message})
            }
            else {
                //console.log('voted');
                this.getCurrentContest();
                //do something
            }
        });

    }

    render() {
        return (
            <div className="container">
                <br/>
                <div className="row">
                    <div className="col">
                        <a href="/addVideo"><button>Post new Candidate</button></a>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div id="LastWinner">
                            <h2>Now Playing: {this.state.last_winner.title}</h2>
                            <img className="videoThumb" src={this.state.last_winner.thumbnailUrl} alt=""/>
                            <h3>Posted by: {this.state.last_winner.owner}</h3>
                        </div>
                    </div>
                </div>
                <hr/>
                <h1 className="error">{this.state.error_msg}</h1>
                <div className="row">
                    <div className="col">
                        <div id="CurrentContest">
                            <h1>Current Contest</h1>
                            <h4>(click on entry to vote)</h4>
                            <h3>Time remaining: {general_methods.secondsToPretty(this.state.time_remaining)}</h3>
                            <h2>Contest Entries</h2>
                            <div className="contestEntries">
                                {this.state.currentContest.songs.length ?
                                    this.state.currentContest.songs.map(song=>
                                        <div
                                            className={song.id === this.state.myVotedSongId ? "Contender myVote" : "Contender"}
                                            key={song.id}
                                            onClick={() => this.voteForCandidate(song.id)}>
                                            <h2>Now Playing: {song.title}</h2>
                                            <img className="videoThumb" src={song.thumbnailUrl} alt=""/>
                                            <h3>Score: {song.score.length}</h3>
                                            <h4>(posted by: {song.owner} <img className="personThumb"
                                                                              src={this.getPersonByUser(song.owner).userPic}
                                                                              alt=""/>)</h4>
                                            <br/>
                                        </div>
                                    )
                                    : <li>No entries yet ¯\_(ツ)_/¯</li>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

/*
 {this.state.currentContest_res.contest.songs.length ?
 this.state.currentContest_res.contest.songs.map(item=><li>{item.thumbnail}</li>)
 : <li>Loading...</li>
 }

 */
