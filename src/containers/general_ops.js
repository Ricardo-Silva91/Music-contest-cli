export const getCookie = (cname) => {
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

export const setCookie = (value) => {
    document.cookie = "musicContester = " + value + ";path=/;";
}

export const secondsToPretty = (seconds) => {

    const hh = Math.floor(seconds / 3600);
    const mm = Math.floor((seconds - (hh * 3600)) / 60);
    const ss = seconds - (hh * 3600) - (mm * 60);

    return (hh + ':' + mm + ':' + ss.toFixed(0) + '');
};