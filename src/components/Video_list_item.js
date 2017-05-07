import React, {Component} from "react"

export default class VideoListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onVideoSelect: props.onVideoSelect,
            video: props.video
        };
    }

    render() {
        const imageUrl = this.state.video.snippet.thumbnails.default.url;

        return <li onClick={ () => this.state.onVideoSelect(this.state.video) } className="list-group-item">
            <div className="video-list-media">
                <div className="media-left">
                    <img className="media-object" src={imageUrl} alt=""/>
                </div>

                <div className="media-body">
                    <div className="media-heading">{this.state.video.snippet.title}</div>
                </div>
            </div>
        </li>
    }
}


/*
 const Video_list_item = ( { video, onVideoSelect } ) => {

 const imageUrl = video.snippet.thumbnails.default.url;

 return <li onClick={ () => onVideoSelect(video) } className="list-group-item">
 <div className = "video-list-media">
 <div className="media-left">
 <img className = "media-object" src={imageUrl}/>
 </div>

 <div className="media-body">
 <div className ="media-heading">{video.snippet.title}</div>
 </div>
 </div>
 </li>
 }

 export default Video_list_item;

 */
