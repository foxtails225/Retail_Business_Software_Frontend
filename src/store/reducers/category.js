import {
  CREATE_CATEGORY,
  MERGE_CATEGORY,
  CLEAN_CATEGORY,
  CATEGORY_ERROR,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  ALL_CATEGORY
} from "../actions/types";

const initialState = {
  categories: [],
  message: "",
  errors: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ALL_CATEGORY:
      return { ...state, categories: action.categories, message: "", errors: "" };
    case CREATE_CATEGORY:
      return { ...state, message: action.message, errors: "" };
    case MERGE_CATEGORY:
      return { ...state, message: action.message, errors: "" };
    case CLEAN_CATEGORY:
      return { ...state, message: '', errors: "" };
    case UPDATE_CATEGORY:
      return { ...state, message: action.message, errors: "" };
    case DELETE_CATEGORY:
      return { ...state, message: action.message, errors: "" };
    case CATEGORY_ERROR:
      return { ...state, categories: [], message: "", errors: action.errors };
    default:
      return state;
  }
}
