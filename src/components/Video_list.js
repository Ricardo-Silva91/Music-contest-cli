import React, {Component} from "react"
import VideoListItem from "./Video_list_item"

export default class VideoList extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
    }

    render() {
        const videoItems = this.props.videos.map(video => {
            return <VideoListItem
                onVideoSelect={this.props.onVideoSelect}
                key={video.etag}
                video={video}
            />
        });

        return (
            <ul className='col-md-4 list-group'>
                {videoItems}
            </ul>
        )
    }
}

/*
 const Video_list = (props) => {

 const videoItems = props.videos.map( video => {
 return <Video_list_item
 onVideoSelect = {props.onVideoSelect}
 key = {video.etag}
 video = {video}
 />
 })

 return(
 <ul className='col-md-4 list-group'>
 {videoItems}
 </ul>
 )
 }

 export default Video_list;
 */