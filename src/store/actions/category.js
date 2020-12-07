import {
  CREATE_CATEGORY,
  MERGE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CLEAN_CATEGORY,
  CATEGORY_ERROR,
  ALL_CATEGORY
} from "./types";

import { errorHandler } from "../../helper/util";
import http from "../../helper/http";
import APP_CONST from "../../helper/constant";

export function allCategories() {
  return function (dispatch) {
    dispatch({ type: CLEAN_CATEGORY });
    http
      .get(`${APP_CONST.API_URL}/category/all`)
      .then((response) => {
        dispatch({
          type: ALL_CATEGORY,
          categories: response.data.data
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: CATEGORY_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: CATEGORY_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}

export function createCategory(obj) {
  return function (dispatch) {
    dispatch({ type: CLEAN_CATEGORY });
    http
      .post(`${APP_CONST.API_URL}/category/create`, obj)
      .then(() => {
        dispatch({
          type: CREATE_CATEGORY,
          message: "The category is created successfully!"
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: CATEGORY_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: CATEGORY_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}

export function mergeCategory(obj) {
  return function (dispatch) {
    dispatch({ type: CLEAN_CATEGORY });
    http
      .post(`${APP_CONST.API_URL}/category/merge`, obj)
      .then(() => {
        dispatch({
          type: MERGE_CATEGORY,
          message: "The category is merged successfully!"
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: CATEGORY_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: CATEGORY_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}

export function updateCategory(obj) {
  return function (dispatch) {
    dispatch({ type: CLEAN_CATEGORY });
    http
      .post(`${APP_CONST.API_URL}/category/update/${obj.id}`, obj)
      .then(() => {
        dispatch({
          type: UPDATE_CATEGORY,
          message: "The category is updated successfully!"
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: CATEGORY_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: CATEGORY_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}
export function deleteCategory(id) {
  return function (dispatch) {
    dispatch({ type: CLEAN_CATEGORY });
    http
      .post(`${APP_CONST.API_URL}/category/delete/${id}`)
      .then(() => {
        dispatch({
          type: DELETE_CATEGORY,
          message: "The category is deleted successfully!"
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: CATEGORY_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: CATEGORY_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}
