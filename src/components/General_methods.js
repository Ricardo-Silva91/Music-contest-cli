/**
 * Created by rofler on 5/7/17.
 */
import $ from "jquery"

exports.backendUrl = '';

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
    document.cookie = cname + ' = ' + value + ' ;path=/;'
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

    let body = {
        user: username,
        pass: password
    };

    return $.post(this.backendUrl + '/login', body,
        function (data, status) {
            cb(data);
        });
};

exports.voteForCandidate = function (token, songIndex, cb) {

    let body = {
        token: token,
        songIndex: songIndex.toString()
    };
    //console.log(JSON.stringify(body))

    return $.post(this.backendUrl + '/voteForCandidate', body,
        function (data, status) {
            cb(data);
        });
};

exports.enterCandidate = function (token, videoId, cb) {

    let body = {
        token: token,
        videoId: videoId
    };
    console.log(JSON.stringify(body))

    return $.post(this.backendUrl + '/enterCandidate', body,
        function (data, status) {
            cb(data);
        });
};

exports.secondsToPretty = function (seconds) {

    let hh = Math.floor(seconds / 3600);
    var mm = Math.floor((seconds - (hh * 3600)) / 60);
    var ss = seconds - (hh * 3600) - (mm * 60);

    return (hh + ' hh ' + mm + ' mm ' + ss.toFixed(0) + ' ss');
};