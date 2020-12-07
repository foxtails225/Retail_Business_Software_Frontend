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
  all_product: [],
  printMode_list: [],
  stickerType_list: [],
  artist_list: [],
  imageSets: [],
  payload: {},
  message: '',
  errors: ''
};

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _types.CLEAN_PRODUCT:
      return _objectSpread({}, state, {
        message: '',
        errors: ''
      });

    case _types.LIST_ALL_PRODUCT_INFO:
      return _objectSpread({}, state, {
        all_product: action.all_product
      });

    case _types.LIST_ARTIST:
      return _objectSpread({}, state, {
        artist_list: action.artistList
      });

    case _types.LIST_PRODUCT_IMAGESET:
      return _objectSpread({}, state, {
        imageSets: action.imageSets
      });

    case _types.UPDATE_PRODUCT_IMAGESET:
      return _objectSpread({}, state, {
        imageSets: action.imageSets,
        message: action.message
      });

    case _types.CREATE_PRODUCT:
      return _objectSpread({}, state, {
        payload: action.payload,
        message: action.message,
        errors: action.errors
      });

    case _types.CREATE_PRODUCT_IMAGES:
      return _objectSpread({}, state, {
        message: action.message,
        errors: action.errors
      });

    case _types.UPLOAD_PRODUCT:
      return _objectSpread({}, state, {
        message: action.message,
        errors: action.errors
      });

    case _types.GENERATE_PRODUCT:
      return _objectSpread({}, state, {
        message: action.message,
        errors: action.errors
      });

    case _types.UPLOAD_STICKERS_PDF:
      return _objectSpread({}, state, {
        message: action.message,
        errors: action.errors
      });

    case _types.DELETE_PRODUCT:
      return _objectSpread({}, state, {
        message: action.message
      });

    default:
      return state;
  }
}