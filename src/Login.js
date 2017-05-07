import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';

import general_methods from "./components/General_methods"

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: 'strinfffffffffffffffffffffg',
                password: 'string'
            },
            error_msg: ''
        };
    }

    onChange(event) {
        let tempForm = this.state.form;
        tempForm[event.target.name] = event.target.value;

        this.setState({form: tempForm});
    }

    login(event) {
        event.preventDefault();
        console.log('user: ' + this.state.form.username + ' pass: ' + this.state.form.password)

        /*
        general_methods.login(this.state.form.username, this.state.form.password, function (response){
            console.log(JSON.stringify(response));
            if(response.result === 'fail')
            {
            }
        });
        */

        general_methods.login(this.state.form.username, this.state.form.password, (response) => {
            console.log(JSON.stringify(response));
            if(response.result === 'fail')
            {
                this.setState({error_msg:response.message})
            }
            else
            {
                console.log('logged')
                general_methods.setCookie('mscCntst', response.token);
                window.location.reload();
            }
        });

    }

    render() {
        return (
            <div className="App">
                <h1>
                    Login
                </h1>
                <form onSubmit={(event) => {
                    this.login(event)
                }}>
                    <input name='username'
                           value={this.state.form.username}
                           onChange={(event) => {
                               this.onChange(event)
                           }}
                           type="text" required/>
                    <input name='password'
                           value={this.state.form.password}
                           onChange={(event) => {
                               this.onChange(event)
                           }}
                           type="password" required/>
                    <button className='btn btn-success'
                            type='submit'>Submit
                    </button>
                </form>
                <h1 className="error">{this.state.error_msg}</h1>
            </div>
        );
    }
}

export default Login;

/*
 <div className="App-header">
 <img src={logo} className="App-logo" alt="logo"/>
 <h2>Welcome to React</h2>
 </div>

 <p className="App-intro">
 To get started, edit <code>src/App.js</code> and save to reload.
 </p>

 */