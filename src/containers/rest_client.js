
const backendUrl = '';

export const getRoot = (cb) => {
    return fetch(backendUrl + '')
        .then((response) => {
            cb(response)
        })
        .catch((error) => {
            console.error(error);
        });
};

export const getUserExists = (user, cb) => {
    return fetch(backendUrl + 'getUserExists?user=' + user)
        .then((response) => {
            return response.json()
        })
        .then((responseJson) => {
            cb(responseJson);
        })
        .catch((error) => {
            //console.error(error);
            //console.error('jogos');
            cb({result:'error'})
        });
};

export const getCurrentContest = (token, cb) => {
    return fetch(backendUrl + 'getCurrentContest?token=' + token)
        .then((response) => {
            return response.json()
        })
        .then((responseJson) => {
            cb(responseJson);
        })
        .catch((error) => {
            console.error(error);
            cb({result:'error'})
        });
};

export const login = (user, pass, cb) => {

    const body = {
        user: user,
        pass: pass
    };

    return fetch(backendUrl + 'login', {
        method: "POST",
        data: JSON.stringify(body),
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        return response.json()
    })
        .then((responseJson) => {
            cb(responseJson);
        })
        .catch((error) => {
            console.error(error);
        });
};

export const enterCandidate = (token, videoId, cb) => {

    const body = {
        token: token,
        videoId: videoId
    };

    return fetch(backendUrl + 'enterCandidate', {
        method: "POST",
        data: JSON.stringify(body),
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        return response.json()
    })
        .then((responseJson) => {
            cb(responseJson);
        })
        .catch((error) => {
            console.error(error);
        });
};

export const voteForCandidate = (token, songIndex, cb) => {

    const body = {
        token: token,
        songIndex: songIndex.toString()
    };

    return fetch(backendUrl + 'voteForCandidate', {
        method: "POST",
        data: JSON.stringify(body),
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        return response.json()
    })
        .then((responseJson) => {
            cb(responseJson);
        })
        .catch((error) => {
            console.error(error);
        });
};

export const addHouse = (item, cb) => {

    const body = {
        name: item.name,
        location: item.location
    };

    return fetch(backendUrl + 'addHouse', {
        method: "POST",
        data: JSON.stringify(body),
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        return response.json()
    })
        .then((responseJson) => {
            cb(responseJson);
        })
        .catch((error) => {
            console.error(error);
        });
};