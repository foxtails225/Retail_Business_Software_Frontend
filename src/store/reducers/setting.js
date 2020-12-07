import {
    CLEAN_SETTING,
    UPDATE_SETTING,
    GET_SETTING,
    UPDATE_ETSY_SETTING,
    SETTING_ERROR
} from "../actions/types";

const initialState = {
    setting: [],
    message: "",
    errors: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CLEAN_SETTING:
            return { ...state, setting: action.setting ,message: '', errors: "" };
        case UPDATE_SETTING:
            return { ...state, setting: action.setting, message: action.message, errors: "" };
        case GET_SETTING:
            return { ...state, setting: action.setting, message: "", errors: "" };
        case UPDATE_ETSY_SETTING:
            return {...state, message: action.message, errors: action.errors}
        case SETTING_ERROR:
            return { ...state, message: "", errors: action.errors };
        default:
            return state;
    }
}
