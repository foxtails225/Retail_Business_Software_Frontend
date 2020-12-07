import {
    CREATE_ARTIST,
    UPDATE_ARTIST,
    DELETE_ARTIST,
    CLEAN_ARTIST,
    ARTIST_ERROR,
    ALL_ARTIST
  } from "../actions/types";
  
  const initialState = {
    artists: [],
    message: "",
    errors: ""
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case ALL_ARTIST:
        return { ...state, artists: action.artists, message: "", errors: "" };
      case CREATE_ARTIST:
        return { ...state, message: action.message, errors: "" };
      case CLEAN_ARTIST:
      return { ...state, message: '', errors: "" };
      case UPDATE_ARTIST:
        return { ...state, message: action.message, errors: "" };
      case DELETE_ARTIST:
        return { ...state, message: action.message, errors: "" };
      case ARTIST_ERROR:
        return { ...state, artists: [], message: "", errors: action.errors };
      default:
        return state;
    }
  }
  