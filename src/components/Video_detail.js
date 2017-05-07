/*
 import React, {Component} from "react"

 export default class VideoDetail extends Component {
 constructor(props) {
 super(props);
 this.state = {
 token: props.token,
 video: props.video
 };
 }

 componentDidMount() {

 }


 render() {
 if (!this.state.video) {
 console.log('no video');
 return (<div>Loading...</div>)
 }

 const videoId = this.state.video.id.videoId;
 const url = `https://www.youtube.com/embed/${videoId}`;


 return (
 <div className="video-detail col-md-8">
 <div className="embed-responsive embed-responsive-16by9">
 <iframe className="embed-responsive-item" src={url}></iframe>
 </div>

 <div className="details">
 <div>{this.state.video.snippet.title}</div>
 <div>{this.state.video.snippet.description}</div>
 <div className="enterCandidate">
 <button className="btn-info">Enter for Contest</button>
 </div>
 </div>
 </div>
 )
 }

 }
 */

import React from "react"

const VideoDetail = ({video, enterCandidate}) => {

    //check before we render video into Video_detail
    if (!video) {
        return (<div>Loading...</div>)
    }

    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;


    return (
        <div className="video-detail col-md-8">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={url}></iframe>
            </div>

            <div className="details">
                <div>{video.snippet.title}</div>
                <div>{video.snippet.description}</div>
                <div className="enterCandidateBtn">
                    <button className="btn-info" onClick={() => {enterCandidate(videoId)}}>Enter for Contest</button>
                </div>
            </div>
        </div>
    )
}

export default VideoDetail;

