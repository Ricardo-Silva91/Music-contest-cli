import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AddVideo from './AddVideo';
import Login from './Login';
import './index.css';

import general_methods from "./components/General_methods"

const cookieName = 'mscCntst';
let pathname = window.location.pathname;
let cookie = general_methods.getCookie(cookieName);

if (cookie === "") {
    console.log('not logged in');
    pathname = '/login';
}
else {
    general_methods.checkCookieValidity(cookie, function (result) {
        if (result === false) {
            general_methods.delete_cookie(cookieName);
            window.location.reload();
        }
    });
}

switch (pathname) {
    case '/login':
        ReactDOM.render(
            <Login />,
            document.getElementById('root')
        );
        break;
    case '/addVideo':
        ReactDOM.render(
            <AddVideo cookie={cookie}/>,
            document.getElementById('root')
        );
        break;
    case '/':
        ReactDOM.render(
            <App cookie={cookie}/>,
            document.getElementById('root')
        );
        break;
    default:
        break;
}