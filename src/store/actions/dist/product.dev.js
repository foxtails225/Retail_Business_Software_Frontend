"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProduct = createProduct;
exports.productDetail = productDetail;
exports.allProductInfo = allProductInfo;
exports.productDelete = productDelete;
exports.productGenerate = productGenerate;
exports.artistList = artistList;
exports.stickertypeList = stickertypeList;
exports.printmodeList = printmodeList;
exports.productImageSetList = productImageSetList;
exports.updateProductImageSets = updateProductImageSets;
exports.createProductImages = createProductImages;
exports.uploadProduct = uploadProduct;
exports.uploadStickersPDF = uploadStickersPDF;

var _types = require("./types");

var _http = _interopRequireDefault(require("../../helper/http"));

var _constant = _interopRequireDefault(require("../../helper/constant"));

var _util = require("../../helper/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function createProduct(obj) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      dispatch({
        type: _types.CLEAN_PRODUCT
      });

      _http["default"].post("".concat(_constant["default"].API_URL, "/product/create"), obj).then(function (res) {
        dispatch({
          type: _types.CREATE_PRODUCT,
          payload: res.data.data.product,
          message: "The Product is created successfully!"
        });
        return resolve();
      })["catch"](function (err) {
        if (err.response) {
          var errors = err.response.data.errors;
          dispatch({
            type: _types.CREATE_PRODUCT,
            errors: (0, _util.errorHandler)(errors)
          });
        } else {
          dispatch({
            type: _types.CREATE_PRODUCT,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
    });
  };
}

function productDetail(id) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_PRODUCT
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/product/detail"), id).then(function (response) {
      dispatch({
        type: _types.PRODUCT_DETAIL,
        message: "Detail"
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.PRODUCT_DETAIL,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.PRODUCT_DETAIL,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function allProductInfo() {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_PRODUCT
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/product/allProductInfo")).then(function (response) {
      dispatch({
        type: _types.LIST_ALL_PRODUCT_INFO,
        all_product: response.data.data
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.LIST_ALL_PRODUCT_INFO,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.LIST_ALL_PRODUCT_INFO,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function productDelete(obj) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_PRODUCT
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/product/deleteProduct"), obj).then(function (response) {
      dispatch({
        type: _types.DELETE_PRODUCT,
        message: "The product is deleted successfully!"
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.DELETE_PRODUCT,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.DELETE_PRODUCT,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function productGenerate(obj) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_PRODUCT
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/product/generate"), obj).then(function (response) {
      dispatch({
        type: _types.GENERATE_PRODUCT,
        message: "The Images and Print Files of the product are generated successfully!"
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.GENERATE_PRODUCT,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.GENERATE_PRODUCT,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function artistList() {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_PRODUCT
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/product/artist")).then(function (response) {
      dispatch({
        type: _types.LIST_ARTIST,
        artistList: response.data.data
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.LIST_ARTIST,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.LIST_ARTIST,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function stickertypeList() {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_PRODUCT
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/product/stickertype")).then(function (response) {
      dispatch({
        type: _types.LIST_STICKER_TYPE,
        stickertypeList: response.data.data
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.LIST_STICKER_TYPE,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.LIST_STICKER_TYPE,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function printmodeList() {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_PRODUCT
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/product/printmode")).then(function (response) {
      dispatch({
        type: _types.LIST_PRINT_MODE,
        printmodeList: response.data.data
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.LIST_PRINT_MODE,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.LIST_PRINT_MODE,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function productImageSetList() {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_PRODUCT
    });

    _http["default"].get("".concat(_constant["default"].API_URL, "/product/imagesets")).then(function (response) {
      dispatch({
        type: _types.LIST_PRODUCT_IMAGESET,
        imageSets: response.data.data
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.LIST_PRODUCT_IMAGESET,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.LIST_PRODUCT_IMAGESET,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function updateProductImageSets(obj) {
  return function (dispatch) {
    dispatch({
      type: _types.CLEAN_PRODUCT
    });

    _http["default"].post("".concat(_constant["default"].API_URL, "/product/imagesets/update"), obj).then(function (response) {
      dispatch({
        type: _types.UPDATE_PRODUCT_IMAGESET,
        message: "The product image set is updated successfully!",
        imageSet: response.data.data
      });
    })["catch"](function (err) {
      if (err.response) {
        var errors = err.response.data.errors;
        dispatch({
          type: _types.UPDATE_PRODUCT_IMAGESET,
          errors: (0, _util.errorHandler)(errors)
        });
      } else {
        dispatch({
          type: _types.UPDATE_PRODUCT_IMAGESET,
          errors: "There is a server connection Error, Try Later."
        });
      }
    });
  };
}

function createProductImages(obj) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      dispatch({
        type: _types.CLEAN_PRODUCT
      });

      _http["default"].post("".concat(_constant["default"].API_URL, "/product/image/create"), obj).then(function (res) {
        dispatch({
          type: _types.CREATE_PRODUCT_IMAGES,
          message: "The Product Images are uploaded successfully!"
        });
        return resolve();
      })["catch"](function (err) {
        if (err.response) {
          var errors = err.response.data.errors;
          dispatch({
            type: _types.CREATE_PRODUCT_IMAGES,
            errors: (0, _util.errorHandler)(errors)
          });
        } else {
          dispatch({
            type: _types.CREATE_PRODUCT_IMAGES,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
    });
  };
}

function uploadProduct(obj) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      dispatch({
        type: _types.CLEAN_PRODUCT
      });

      _http["default"].post("".concat(_constant["default"].API_URL, "/product/upload"), obj).then(function (res) {
        dispatch({
          type: _types.UPLOAD_PRODUCT,
          message: "The Product is uploaded to marketplaces successfully!"
        });
        return resolve();
      })["catch"](function (err) {
        if (err.response) {
          var errors = err.response.data.errors;
          dispatch({
            type: _types.UPLOAD_PRODUCT,
            errors: (0, _util.errorHandler)(errors)
          });
        } else {
          dispatch({
            type: _types.CREATE_PRODUCT_IMAGES,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
    });
  };
}

function uploadStickersPDF(obj) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      dispatch({
        type: _types.CLEAN_PRODUCT
      });

      _http["default"].post("".concat(_constant["default"].API_URL, "/product/upload-sticker-pdf"), obj).then(function (res) {
        dispatch({
          type: _types.UPLOAD_STICKERS_PDF,
          message: "The Stickers PDF is uploaded successfully!"
        });
        return resolve();
      })["catch"](function (err) {
        if (err.response) {
          var errors = err.response.data.errors;
          dispatch({
            type: _types.UPLOAD_STICKERS_PDF,
            errors: (0, _util.errorHandler)(errors)
          });
        } else {
          dispatch({
            type: _types.UPLOAD_STICKERS_PDF,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
    });
  };
}