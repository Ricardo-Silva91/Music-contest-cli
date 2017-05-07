/**
 * Created by rofler on 5/7/17.
 */
import $ from "jquery"

exports.backendUrl = 'http://localhost:8080';

exports.getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

exports.delete_cookie = function (name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

exports.setCookie = function (cname, value) {
    document.cookie= cname + ' = ' + value + ' ;path=/;'
}

exports.checkCookieValidity = function (cookie, cb) {

    fetch(this.backendUrl + '/getCurrentContest?token=' + cookie)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson.result !== 'fail');
            //return responseJson.result !== 'fail';
            cb(responseJson.result !== 'fail');
        })
        .catch((error) => {
            //return false;
            cb(false);
        });
};

exports.login = function (username, password, cb) {

    let body= {
        user: username,
        pass: password
    };

    return $.post(this.backendUrl + '/login', body,
        function (data, status) {
            cb(data);
        });
};