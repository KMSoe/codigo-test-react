import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    authenticated: false,
    signinError: [],
    signupError: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                authenticated: action.payload.authenticated,
                token: action.payload.token,
            }
        case actionTypes.SIGNIN_FAIL:
            return {
                ...state,
            }
        case actionTypes.SIGNOUT:
            return {
                ...state,
                user: null,
                token: null,
                authenticated: false
            }
        default:
            return state;
    }
}

export default reducer;