import React, {Component} from 'react';
import './App.css';

import _ from "lodash"
import YTSearch from 'youtube-api-search'

import SearchBar from "./components/Search_bar"
import VideoList from "./components/Video_list"
import VideoDetail from "./components/Video_detail"

import general_methods from "./components/General_methods"

//variable to hold the API Key
const API_KEY = 'AIzaSyBYf1d1OI9RrbBZ8ox-HppCUqyndH8herc';


class AddVideo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cookie: props.cookie,
            videos: [],
            selectedVideo: null,
            items: [],
            error_msg: ''
        };
        this.videoSearch('2ndChanges');
    }

    componentDidMount() {

    }

    videoSearch(searchTerm) {
        //youtube search
        YTSearch({key: API_KEY, term: searchTerm}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {

        const videoSearch = _.debounce((term) => {
            this.videoSearch(term)
        }, 400);

        return (
            <div className="App">
                <div className="App-header">
                    <img
                        src='http://i2.wp.com/nktva42l4am2fq6f1bf2dz43-wpengine.netdna-ssl.com/wp-content/uploads/2015/06/MultiDoge-e1434554708695.png'
                        className="App-logo" alt="logo"/>
                    <h2>Video Search</h2>
                </div>
                <div>
                    <br/>
                    <SearchBar onSearchTermChange={videoSearch}/>
                    <br/>
                    <h1>{this.state.error_msg}</h1>
                    <VideoDetail video={this.state.selectedVideo} enterCandidate={
                        (videoId) => general_methods.enterCandidate(this.state.cookie,videoId, (response) => {
                            if (response.result === 'fail') {
                                this.setState({error_msg: response.message})
                            }
                            else {
                                console.log('entered cendidate');
                                window.location.href= '/';
                                //do something
                            }
                        })

                    }/>
                    <VideoList
                        onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                        videos={this.state.videos}
                    />
                </div>
            </div>
        );
    }
}

export default AddVideo;

/*
 <div className="App-header">
 <img src={logo} className="App-logo" alt="logo"/>
 <h2>Welcome to React</h2>
 </div>

 <p className="App-intro">
 To get started, edit <code>src/App.js</code> and save to reload.
 </p>

 */