import {
  CLEAN_TRADEMARK,
  TRADEMARK_CREATE_WORD,
  TRADEMARK_UPDATE_WORD,
  TRADEMARK_DELETE_WORD,
  TRADEMARK_UPDATE_CLASS_WORD,
  TRADEMARK_UPDATE_CLASS_WORDS_LIST,
  TRADEMARK_ERROR,
} from "../actions/types";

const initialState = {
  words: [],
  message: "",
  errors: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAN_TRADEMARK:
      return { ...state, message: "", errors: "" };
    case TRADEMARK_CREATE_WORD:
      return { ...state, message: action.message, errors: "" };
    case TRADEMARK_UPDATE_WORD:
      return { ...state, message: action.message, errors: "" };
    case TRADEMARK_DELETE_WORD:
      return { ...state, message: action.message, errors: "" };
    case TRADEMARK_UPDATE_CLASS_WORD:
      return { ...state, message: action.message, errors: "" };
    case TRADEMARK_UPDATE_CLASS_WORDS_LIST: 
      return {...state, message: action.message, errors: ""};
    case TRADEMARK_ERROR:
      return { ...state, words: [], message: "", errors: action.errors };
    default:
      return state;
  }
}
