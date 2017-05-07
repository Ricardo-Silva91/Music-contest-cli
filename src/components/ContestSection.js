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
            currentContest: {},
            time_remaining: -1,
            last_winner:{}
        };
    }

    getCurrentContest() {
        return fetch( general_methods.backendUrl + '/getCurrentContest?token=' + this.state.token)
            .then((response) => response.json())
            .then((responseJson) => {
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

    componentDidMount() {
        this.getCurrentContest();
    }

    render() {
        return (
            <div className="search-bar">
                <ul>
                    <img src={this.state.last_winner.thumbnailUrl} alt=""/>
                </ul>
                <ul>
                </ul>
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
