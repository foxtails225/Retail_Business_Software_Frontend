import {
  CREATE_KEYWORD,
  CLEAN_KEYWORD,
  KEYWORD_ERROR,
  DELETE_KEYWORD,
  UPDATE_KEYWORD,
  ALL_KEYWORD
} from "../actions/types";

const initialState = {
  keywords: [],
  message: "",
  errors: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ALL_KEYWORD:
      return { ...state, keywords: action.keywords, message: "", errors: "" };
    case CREATE_KEYWORD:
      return { ...state, message: action.message, errors: "" };
    case CLEAN_KEYWORD:
    return { ...state, message: '', errors: "" };
    case UPDATE_KEYWORD:
      return { ...state, message: action.message, errors: "" };
    case DELETE_KEYWORD:
      return { ...state, message: action.message, errors: "" };
    case KEYWORD_ERROR:
      return { ...state, keywords: [], message: "", errors: action.errors };
    default:
      return state;
  }
}
