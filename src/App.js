import React, {Component} from 'react';
import './App.css';

import ContestSection from "./components/ContestSection"


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cookie: props.cookie
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src='http://i2.wp.com/nktva42l4am2fq6f1bf2dz43-wpengine.netdna-ssl.com/wp-content/uploads/2015/06/MultiDoge-e1434554708695.png' className="App-logo" alt="logo"/>
                    <h2>Welcome to Music Contest</h2>
                </div>
                <div>
                    <ContestSection token={this.state.cookie}/>
                </div>
            </div>
        );
    }
}

export default App;

/*
 <div className="App-header">
 <img src={logo} className="App-logo" alt="logo"/>
 <h2>Welcome to React</h2>
 </div>

 <p className="App-intro">
 To get started, edit <code>src/App.js</code> and save to reload.
 </p>

 */