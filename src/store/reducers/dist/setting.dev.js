"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _types = require("../actions/types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  setting: [],
  message: "",
  errors: ""
};

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _types.CLEAN_SETTING:
      return _objectSpread({}, state, {
        setting: action.setting,
        message: '',
        errors: ""
      });

    case _types.UPDATE_SETTING:
      return _objectSpread({}, state, {
        setting: action.setting,
        message: action.message,
        errors: ""
      });

    case _types.GET_SETTING:
      return _objectSpread({}, state, {
        setting: action.setting,
        message: "",
        errors: ""
      });

    case _types.UPDATE_ETSY_SETTING:
      return _objectSpread({}, state, {
        message: action.message,
        errors: action.errors
      });

    case _types.SETTING_ERROR:
      return _objectSpread({}, state, {
        message: "",
        errors: action.errors
      });

    default:
      return state;
  }
}