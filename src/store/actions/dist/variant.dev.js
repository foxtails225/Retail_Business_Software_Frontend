"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listSizes = listSizes;
exports.listColors = listColors;
exports.listTypes = listTypes;
exports.createVariant = createVariant;
exports.updateVariant = updateVariant;
exports.deleteVariant = deleteVariant;
exports.getVariantImages = getVariantImages;
exports.updateVariantImages = updateVariantImages;
exports.getMerchantVariantPrices = getMerchantVariantPrices;
exports.updateMerchantVariantPrices = updateMerchantVariantPrices;
exports.getDescriptionVariant = getDescriptionVariant;
exports.updateDescriptionVariant = updateDescriptionVariant;
exports.getVariantPrices = getVariantPrices;
exports.addVariantPrice = addVariantPrice;
exports.deleteVariantPrice = deleteVariantPrice;
exports.defaultVariantPrice = defaultVariantPrice;

var _types = require("./types");

var _http = _interopRequireDefault(require("../../helper/http"));

var _constant = _interopRequireDefault(require("../../helper/constant"));

var _util = require("../../helper/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function listSizes(type) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_SIZE
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/variant/sizes"), type).then(function (response) {
      dispatch({
        type: _types.LIST_SIZE,
        sizes: response.data.data
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.LIST_SIZE,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.LIST_SIZE,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function listColors(type) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_COLOR
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/variant/colors"), type).then(function (response) {
      dispatch({
        type: _types.LIST_COLOR,
        colors: response.data.data
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.LIST_COLOR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.LIST_COLOR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function listTypes(type) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_TYPE
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/variant/types"), type).then(function (response) {
      dispatch({
        type: _types.LIST_TYPE,
        types: response.data.data
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.LIST_TYPE,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.LIST_TYPE,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function createVariant(obj) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_VARIANT
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/variant/create"), obj).then(function () {
      dispatch({
        type: _types.CREATE_VARIANT,
        message: "The variant is created successfully!"
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function updateVariant(obj) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_VARIANT
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/variant/update/").concat(obj.id), obj).then(function () {
      dispatch({
        type: _types.UPDATE_VARIANT,
        message: "The variant is updated successfully!"
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function deleteVariant(id) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_VARIANT
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/variant/delete/").concat(id)).then(function () {
      dispatch({
        type: _types.DELETE_VARIANT,
        message: "The variant is deleted successfully!"
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function getVariantImages() {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_VARIANT
    });

    _http["default"].get("".concat(_constant["default"].API_URL, "/variant/images")).then(function (response) {
      dispatch({
        type: _types.ALL_IMAGE_VARIANT,
        images: response.data.data
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function updateVariantImages(obj) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_VARIANT
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/variant/images/update"), obj).then(function (response) {
      dispatch({
        type: _types.UPDATE_IMAGE_VARIANT,
        message: "The variant image is updated successfully!",
        images: response.data.data.images
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function getMerchantVariantPrices() {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_VARIANT
    });

    _http["default"].get("".concat(_constant["default"].API_URL, "/variant/merchant-prices")).then(function (response) {
      dispatch({
        type: _types.ALL_MERCHANT_PRICE_VARIANT,
        prices: response.data.data
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function updateMerchantVariantPrices(obj) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_VARIANT
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/variant/merchant-prices/update"), obj).then(function (response) {
      dispatch({
        type: _types.UPDATE_MERCHANT_PRICE_VARIANT,
        message: "The variant merchant price is updated successfully!",
        prices: response.data.data.prices
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function getDescriptionVariant() {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_VARIANT
    });

    _http["default"].get("".concat(_constant["default"].API_URL, "/variant/description")).then(function (response) {
      dispatch({
        type: _types.ALL_DESCRIPTION_VARIANT,
        description: response.data.data
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function updateDescriptionVariant(obj) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_VARIANT
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/variant/description/update"), obj).then(function (response) {
      dispatch({
        type: _types.UPDATE_DESCRIPTION_VARIANT,
        message: "The description is updated successfully!",
        description: response.data.data.description
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function getVariantPrices() {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_VARIANT
    });

    _http["default"].get("".concat(_constant["default"].API_URL, "/variant/prices")).then(function (response) {
      dispatch({
        type: _types.ALL_PRICE_VARIANT,
        prices: response.data.data
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function addVariantPrice(obj) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_VARIANT
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/variant/addPrice"), obj).then(function () {
      dispatch({
        type: _types.ADD_PRICE_VARIANT,
        message: "The variant price is added successfully!"
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function deleteVariantPrice(id) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_VARIANT
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/variant/deletePrice/").concat(id)).then(function () {
      dispatch({
        type: _types.DELETE_PRICE_VARIANT,
        message: "The variant price is deleted successfully!"
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function defaultVariantPrice(id) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_VARIANT
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/variant/defaultPrice/").concat(id)).then(function () {
      dispatch({
        type: _types.DELETE_PRICE_VARIANT,
        message: "The variant price is set as default successfully!"
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.VARIANT_ERROR,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}