"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWord = createWord;
exports.updateWord = updateWord;
exports.deleteWord = deleteWord;
exports.updateClassWord = updateClassWord;
exports.updateClassWordsList = updateClassWordsList;

var _types = require("./types");

var _util = require("../../helper/util");

var _http = _interopRequireDefault(require("../../helper/http"));

var _constant = _interopRequireDefault(require("../../helper/constant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function createWord(obj) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_TRADEMARK
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/trademark/word/create"), obj).then(function () {
      dispatch({
        type: _types.TRADEMARK_CREATE_WORD,
        message: "The word is created successfully!"
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.TRADEMARK_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.TRADEMARK_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function updateWord(obj) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_TRADEMARK
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/trademark/word/update/").concat(obj.id), obj).then(function () {
      dispatch({
        type: _types.TRADEMARK_UPDATE_WORD,
        message: "The word is updated successfully!"
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.TRADEMARK_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.TRADEMARK_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function deleteWord(id) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_TRADEMARK
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/trademark/word/delete/").concat(id)).then(function () {
      dispatch({
        type: _types.TRADEMARK_DELETE_WORD,
        message: "The word is deleted successfully!"
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.TRADEMARK_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.TRADEMARK_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function updateClassWord(obj) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_TRADEMARK
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/trademark/classword/update"), obj).then(function () {
      dispatch({
        type: _types.TRADEMARK_UPDATE_CLASS_WORD,
        message: "The class word is updated successfully!"
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.TRADEMARK_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.TRADEMARK_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function updateClassWordsList(obj) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_TRADEMARK
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/trademark/classwordlist/update"), obj).then(function () {
      dispatch({
        type: _types.TRADEMARK_UPDATE_CLASS_WORDS_LIST,
        message: "The class words list is updated successfully!"
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.TRADEMARK_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.TRADEMARK_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}