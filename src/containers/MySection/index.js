import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import YTSearch from 'youtube-api-search';

import * as rest_client from '../rest_client';
import * as general_ops from '../general_ops';

//variable to hold the API Key
const API_KEY = 'AIzaSyBYf1d1OI9RrbBZ8ox-HppCUqyndH8herc';

class MySection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            videos: [],
            selectedVideo: null,
            items: [],
            error_msg: ''
        };
    }

    videoSearch(searchTerm) {

        const numberOfVids = 4;

        //youtube search
        YTSearch({key: API_KEY, term: searchTerm}, (videos) => {

            let videoListElement = [];

            for (let i = 0; i < numberOfVids; i++) {
                let thisVid = videos[i];
                videoListElement.push(
                    <ul key={thisVid.id.videoId} className="videoListElement" onClick={() => {
                        const token = general_ops.getCookie('musicContester');
                        rest_client.enterCandidate(token, thisVid.id.videoId, (response) => {
                            console.log(response);
                        })
                    }}>
                        <li>
                            <img alt={thisVid.id.videoId} src={thisVid.snippet.thumbnails.default.url}/>
                            <h3>{thisVid.snippet.title}</h3>
                            <p>{thisVid.snippet.channelTitle}</p>
                        </li>
                    </ul>
                )
            }
            this.setState({
                videos: videos,
                selectedVideo: videos[0],
                videoListElement: videoListElement
            });

            //console.log(videos);
        });
    }


    componentWillMount() {
        //console.log(this.props.prepperValues.Selected_house);

        this.videoSearch('2ndChanges');
    }

    render() {
        return (
            <div align="center">
                <h3>My Section</h3>
                <input value={this.state.searchTerm} type="text" onChange={(e) => {
                    this.setState({searchTerm: e.target.value});
                    this.videoSearch(e.target.value);
                }}/>
                <br/>
                <br/>
                <div className="videoThumb">
                    <div>
                        {this.state.videoListElement}
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
)(MySection)