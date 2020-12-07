import {
  CLEAN_TRADEMARK,
  TRADEMARK_CREATE_WORD,
  TRADEMARK_UPDATE_WORD,
  TRADEMARK_DELETE_WORD,
  TRADEMARK_UPDATE_CLASS_WORD,
  TRADEMARK_UPDATE_CLASS_WORDS_LIST,
  TRADEMARK_ERROR,
} from "./types";

import { errorHandler } from "../../helper/util";
import http from "../../helper/http";
import APP_CONST from "../../helper/constant";

export function createWord(obj) {
  return function (dispatch) {
    dispatch({ type: CLEAN_TRADEMARK });
    http
      .post(`${APP_CONST.API_URL}/trademark/word/create`, obj)
      .then(() => {
        dispatch({
          type: TRADEMARK_CREATE_WORD,
          message: "The word is created successfully!",
        });
      })
      .catch((err) => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: TRADEMARK_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: TRADEMARK_ERROR,
            errors: "There is a server connection Error, Try Later.",
          });
        }
      });
  };
}

export function updateWord(obj) {
  return function (dispatch) {
    dispatch({ type: CLEAN_TRADEMARK });
    http
      .post(`${APP_CONST.API_URL}/trademark/word/update/${obj.id}`, obj)
      .then(() => {
        dispatch({
          type: TRADEMARK_UPDATE_WORD,
          message: "The word is updated successfully!",
        });
      })
      .catch((err) => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: TRADEMARK_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: TRADEMARK_ERROR,
            errors: "There is a server connection Error, Try Later.",
          });
        }
      });
  };
}

export function deleteWord(id) {
  return function (dispatch) {
    dispatch({ type: CLEAN_TRADEMARK });
    http
      .post(`${APP_CONST.API_URL}/trademark/word/delete/${id}`)
      .then(() => {
        dispatch({
          type: TRADEMARK_DELETE_WORD,
          message: "The word is deleted successfully!",
        });
      })
      .catch((err) => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: TRADEMARK_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: TRADEMARK_ERROR,
            errors: "There is a server connection Error, Try Later.",
          });
        }
      });
  };
}

export function updateClassWord(obj) {
  return function (dispatch) {
    dispatch({ type: CLEAN_TRADEMARK });
    http
      .post(`${APP_CONST.API_URL}/trademark/classword/update`, obj)
      .then(() => {
        dispatch({
          type: TRADEMARK_UPDATE_CLASS_WORD,
          message: "The class word is updated successfully!",
        });
      })
      .catch((err) => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: TRADEMARK_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: TRADEMARK_ERROR,
            errors: "There is a server connection Error, Try Later.",
          });
        }
      });
  };
}

export function updateClassWordsList(obj) {
  return function (dispatch) {
    dispatch({ type: CLEAN_TRADEMARK });
    http
      .post(`${APP_CONST.API_URL}/trademark/classwordlist/update`, obj)
      .then(() => {
        dispatch({
          type: TRADEMARK_UPDATE_CLASS_WORDS_LIST,
          message: "The class words list is updated successfully!",
        });
      })
      .catch((err) => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: TRADEMARK_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: TRADEMARK_ERROR,
            errors: "There is a server connection Error, Try Later.",
          });
        }
      });
  };
}
