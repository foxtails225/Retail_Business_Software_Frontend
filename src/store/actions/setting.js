import {
  CLEAN_SETTING,
  UPDATE_SETTING,
  GET_SETTING,
  UPDATE_ETSY_SETTING,
  SETTING_ERROR
} from "./types";
  
import { errorHandler } from "../../helper/util";
import http from "../../helper/http";
import APP_CONST from "../../helper/constant";

export function updateSetting(obj) {
  return function (dispatch) {
    dispatch({ type: CLEAN_SETTING });
    http
      .post(`${APP_CONST.API_URL}/setting/update`, obj)
      .then((response) => {
        dispatch({
          type: UPDATE_SETTING,
          message: "The Setting is updated successfully!",
          setting: response.data.data.setting
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: SETTING_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: SETTING_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}

export function getSetting(){
  return function (dispatch){
    dispatch({type: CLEAN_SETTING});
    http
      .post(`${APP_CONST.API_URL}/setting/get`)
      .then((response) => {
        dispatch({
          type: GET_SETTING,
          setting: response.data.data
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: SETTING_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: SETTING_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  }
}

export function updateEtsySetting(obj) {
  return function (dispatch) {
    dispatch({ type: CLEAN_SETTING });
    http
      .post(`${APP_CONST.API_URL}/setting/etsy/update`, obj)
      .then(() => {
        dispatch({
          type: UPDATE_ETSY_SETTING,
          message: "The Etsy Setting is updated successfully!",
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: SETTING_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: SETTING_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}
