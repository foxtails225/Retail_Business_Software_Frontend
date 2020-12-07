import {
    CREATE_ARTIST,
    UPDATE_ARTIST,
    DELETE_ARTIST,
    CLEAN_ARTIST,
    ARTIST_ERROR,
    ALL_ARTIST
  } from "./types";
  
  import { errorHandler } from "../../helper/util";
  import http from "../../helper/http";
  import APP_CONST from "../../helper/constant";
  
  export function allArtists() {
    return function(dispatch) {
      dispatch({ type: CLEAN_ARTIST });
      http
        .get(`${APP_CONST.API_URL}/artist/all`)
        .then((response) => {
          dispatch({
            type: ALL_ARTIST,
            artists: response.data.data
          });
        })
        .catch(err => {
          if (err.response) {
            let { errors } = err.response.data;
            dispatch({ type: ARTIST_ERROR, errors: errorHandler(errors) });
          } else {
            dispatch({
              type: ARTIST_ERROR,
              errors: "There is a server connection Error, Try Later."
            });
          }
        });
    };
  }
  
  export function createArtist(obj) {
    return function(dispatch) {
      dispatch({ type: CLEAN_ARTIST });
      http
        .post(`${APP_CONST.API_URL}/artist/create`, obj)
        .then(() => {
          dispatch({
            type: CREATE_ARTIST,
            message: "The artist is created successfully!"
          });
        })
        .catch(err => {
          if (err.response) {
            let { errors } = err.response.data;
            dispatch({ type: ARTIST_ERROR, errors: errorHandler(errors) });
          } else {
            dispatch({
              type: ARTIST_ERROR,
              errors: "There is a server connection Error, Try Later."
            });
          }
        });
    };
  }
  
  export function updateArtist(obj) {
    return function(dispatch) {
      dispatch({ type: CLEAN_ARTIST });
      http
        .post(`${APP_CONST.API_URL}/artist/update/${obj.id}`, obj)
        .then(() => {
          dispatch({
            type: UPDATE_ARTIST,
            message: "The artist is updated successfully!"
          });
        })
        .catch(err => {
          if (err.response) {
            let { errors } = err.response.data;
            dispatch({ type: ARTIST_ERROR, errors: errorHandler(errors) });
          } else {
            dispatch({
              type: ARTIST_ERROR,
              errors: "There is a server connection Error, Try Later."
            });
          }
        });
    };
  }
  export function deleteArtist(id) {
    return function(dispatch) {
      dispatch({ type: CLEAN_ARTIST });
      http
        .post(`${APP_CONST.API_URL}/artist/delete/${id}`)
        .then(() => {
          dispatch({
            type: DELETE_ARTIST,
            message: "The artist is deleted successfully!"
          });
        })
        .catch(err => {
          if (err.response) {
            let { errors } = err.response.data;
            dispatch({ type: ARTIST_ERROR, errors: errorHandler(errors) });
          } else {
            dispatch({
              type: ARTIST_ERROR,
              errors: "There is a server connection Error, Try Later."
            });
          }
        });
    };
  }
  