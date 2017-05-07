import React, {Component} from 'react';
//import logo from './logo.svg';
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
                <h1>
                    <ContestSection token={this.state.cookie}/>
                </h1>
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