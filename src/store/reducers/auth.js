import {
    AUTH_LOGIN,
    AUTH_REGISTER,
    AUTH_CHECK,
    AUTH_LOGOUT,
    AUTH_ERROR,
    CLEAN_AUTH,
    AUTH_RESET
} from '../actions/types';

const defaultUser = {
    id: null,
    name: null,
    email: null,
};

const initialState = {
    isLogin: false,
    user: defaultUser,
    auth: [],
    message: '',
    errors: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN:
            return { ...state, user: action.user, isLogin: true, message: action.message, errors: '' }
        case AUTH_REGISTER:
            return { ...state, user: defaultUser, isLogin: false, message: action.message, errors: '' }
        case AUTH_CHECK:
            return { ...state, user: action.user, isLogin: action.isLogin }
        case AUTH_RESET:
            return { ...state, user: action.user, auth: action.auth, isLogin: action.isLogin, message: action.message, errors: '' }
        case AUTH_LOGOUT:
            return { ...state, user: defaultUser, isLogin: false, message: '', errors: '' }
        case AUTH_ERROR:
            return { ...state, message: '', errors: action.errors }
        case CLEAN_AUTH:
            return { ...state, message: '', errors: "" };
        default:
            return state
    }
}