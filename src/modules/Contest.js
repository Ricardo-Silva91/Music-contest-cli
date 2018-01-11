export const SET_TOKEN = 'Contest/SET_TOKEN';

const initialState = {
    token: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.token
            };
        default:
            return state
    }
}

export const set_token = (token) => {
    return dispatch => {
        dispatch({
            type: SET_TOKEN,
            token: token
        });
    }
};
