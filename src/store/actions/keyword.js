import {
  CREATE_KEYWORD,
  UPDATE_KEYWORD,
  DELETE_KEYWORD,
  CLEAN_KEYWORD,
  KEYWORD_ERROR,
  ALL_KEYWORD
} from "./types";

import { errorHandler } from "../../helper/util";
import http from "../../helper/http";
import APP_CONST from "../../helper/constant";

export function allKeywords() {
  return function (dispatch) {
    dispatch({ type: CLEAN_KEYWORD });
    http
      .get(`${APP_CONST.API_URL}/keyword/all`)
      .then((response) => {
        dispatch({
          type: ALL_KEYWORD,
          keywords: response.data.data
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: KEYWORD_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: KEYWORD_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}

export function createKeyword(obj) {
  return function (dispatch) {
    dispatch({ type: CLEAN_KEYWORD });
    http
      .post(`${APP_CONST.API_URL}/keyword/create`, obj)
      .then(() => {
        dispatch({
          type: CREATE_KEYWORD,
          message: "The keyword is created successfully!"
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: KEYWORD_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: KEYWORD_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}
export function updateKeyword(obj) {
  return function (dispatch) {
    dispatch({ type: CLEAN_KEYWORD });
    http
      .post(`${APP_CONST.API_URL}/keyword/update/${obj.id}`, obj)
      .then(() => {
        dispatch({
          type: UPDATE_KEYWORD,
          message: "The keyword is updated successfully!"
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: KEYWORD_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: KEYWORD_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}
export function deleteKeyword(id) {
  return function (dispatch) {
    dispatch({ type: CLEAN_KEYWORD });
    http
      .post(`${APP_CONST.API_URL}/keyword/delete/${id}`)
      .then(() => {
        dispatch({
          type: DELETE_KEYWORD,
          message: "The keyword is deleted successfully!"
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: KEYWORD_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: KEYWORD_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}
