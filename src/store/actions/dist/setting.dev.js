"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSetting = updateSetting;
exports.getSetting = getSetting;
exports.updateEtsySetting = updateEtsySetting;

var _types = require("./types");

var _util = require("../../helper/util");

var _http = _interopRequireDefault(require("../../helper/http"));

var _constant = _interopRequireDefault(require("../../helper/constant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function updateSetting(obj) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_SETTING
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/setting/update"), obj).then(function (response) {
      dispatch({
        type: _types.UPDATE_SETTING,
        message: "The Setting is updated successfully!",
        setting: response.data.data.setting
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.SETTING_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.SETTING_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function getSetting() {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_SETTING
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/setting/get")).then(function (response) {
      dispatch({
        type: _types.GET_SETTING,
        setting: response.data.data
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.SETTING_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.SETTING_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function updateEtsySetting(obj) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_SETTING
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/setting/etsy/update"), obj).then(function () {
      dispatch({
        type: _types.UPDATE_ETSY_SETTING,
        message: "The Etsy Setting is updated successfully!"
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.SETTING_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.SETTING_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}