import {
    LIST_COLOR,
    LIST_SIZE,
    LIST_TYPE,
    CREATE_VARIANT,
    CLEAN_VARIANT,
    VARIANT_ERROR,
    UPDATE_VARIANT,
    ALL_IMAGE_VARIANT,
    UPDATE_IMAGE_VARIANT,
    ALL_MERCHANT_PRICE_VARIANT,
    UPDATE_MERCHANT_PRICE_VARIANT,
    ALL_DESCRIPTION_VARIANT,
    UPDATE_DESCRIPTION_VARIANT,
    ALL_PRICE_VARIANT,
    ADD_PRICE_VARIANT,
    DELETE_VARIANT,
    DELETE_PRICE_VARIANT,
    CLEAN_SIZE,
    CLEAN_COLOR,
    CLEAN_TYPE
} from './types';

import http from '../../helper/http';
import APP_CONST from '../../helper/constant';
import { errorHandler } from "../../helper/util";

export function listSizes(type) {
  return function(dispatch) {
    dispatch({ type: CLEAN_SIZE });
    http
      .post(`${APP_CONST.API_URL}/variant/sizes`, type)
      .then((response) => {
        dispatch({
          type: LIST_SIZE,
          sizes: response.data.data
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: LIST_SIZE, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: LIST_SIZE,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}
export function listColors(type) {
  return function(dispatch) {
    dispatch({ type: CLEAN_COLOR });
    http
      .post(`${APP_CONST.API_URL}/variant/colors`, type)
      .then((response) => {
        dispatch({
          type: LIST_COLOR,
          colors: response.data.data
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: LIST_COLOR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: LIST_COLOR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}
export function listTypes(type) {
  return function(dispatch) {
    dispatch({ type: CLEAN_TYPE });
    http
      .post(`${APP_CONST.API_URL}/variant/types`, type)
      .then((response) => {
        dispatch({
          type: LIST_TYPE,
          types: response.data.data
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: LIST_TYPE, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: LIST_TYPE,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}

export function createVariant(obj) {
  return function(dispatch) {
    dispatch({ type: CLEAN_VARIANT });
    http
      .post(`${APP_CONST.API_URL}/variant/create`, obj)
      .then(() => {
        dispatch({
          type: CREATE_VARIANT,
          message: "The variant is created successfully!"
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: VARIANT_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: VARIANT_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}

export function updateVariant(obj) {
  return function(dispatch) {
    dispatch({ type: CLEAN_VARIANT });
    http
      .post(`${APP_CONST.API_URL}/variant/update/${obj.id}`, obj)
      .then(() => {
        dispatch({
          type: UPDATE_VARIANT,
          message: "The variant is updated successfully!"
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: VARIANT_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: VARIANT_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}

export function deleteVariant(id) {
  return function(dispatch) {
    dispatch({ type: CLEAN_VARIANT });
    http
      .post(`${APP_CONST.API_URL}/variant/delete/${id}`)
      .then(() => {
        dispatch({
          type: DELETE_VARIANT,
          message: "The variant is deleted successfully!"
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: VARIANT_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: VARIANT_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}

export function getVariantImages(){
  return function (dispatch){
    dispatch({type: CLEAN_VARIANT});
    http
      .get(`${APP_CONST.API_URL}/variant/images`)
      .then((response) => {
        dispatch({
          type: ALL_IMAGE_VARIANT,
          images: response.data.data
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: VARIANT_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: VARIANT_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  }
}

export function updateVariantImages(obj) {
  return function (dispatch) {
    dispatch({ type: CLEAN_VARIANT });
    http
      .post(`${APP_CONST.API_URL}/variant/images/update`, obj)
      .then((response) => {
        dispatch({
          type: UPDATE_IMAGE_VARIANT,
          message: "The variant image is updated successfully!",
          images: response.data.data.images
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: VARIANT_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: VARIANT_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}

export function getMerchantVariantPrices(){
  return function (dispatch){
    dispatch({type: CLEAN_VARIANT});
    http
      .get(`${APP_CONST.API_URL}/variant/merchant-prices`)
      .then((response) => {
        dispatch({
          type: ALL_MERCHANT_PRICE_VARIANT,
          prices: response.data.data
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: VARIANT_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: VARIANT_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  }
}

export function updateMerchantVariantPrices(obj) {
  return function (dispatch) {
    dispatch({ type: CLEAN_VARIANT });
    http
      .post(`${APP_CONST.API_URL}/variant/merchant-prices/update`, obj)
      .then((response) => {
        dispatch({
          type: UPDATE_MERCHANT_PRICE_VARIANT,
          message: "The variant merchant price is updated successfully!",
          prices: response.data.data.prices
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: VARIANT_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: VARIANT_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}

export function getDescriptionVariant(){
  return function (dispatch){
    dispatch({type: CLEAN_VARIANT});
    http
      .get(`${APP_CONST.API_URL}/variant/description`)
      .then((response) => {
        dispatch({
          type: ALL_DESCRIPTION_VARIANT,
          description: response.data.data
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: VARIANT_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: VARIANT_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  }
}

export function updateDescriptionVariant(obj) {
  return function (dispatch) {
    dispatch({ type: CLEAN_VARIANT });
    http
      .post(`${APP_CONST.API_URL}/variant/description/update`, obj)
      .then((response) => {
        dispatch({
          type: UPDATE_DESCRIPTION_VARIANT,
          message: "The description is updated successfully!",
          description: response.data.data.description
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: VARIANT_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: VARIANT_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}

export function getVariantPrices(){
  return function (dispatch){
    dispatch({type: CLEAN_VARIANT});
    http
      .get(`${APP_CONST.API_URL}/variant/prices`)
      .then((response) => {
        dispatch({
          type: ALL_PRICE_VARIANT,
          prices: response.data.data
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: VARIANT_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: VARIANT_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  }
}

export function addVariantPrice(obj) {
  return function(dispatch) {
    dispatch({ type: CLEAN_VARIANT });
    http
      .post(`${APP_CONST.API_URL}/variant/addPrice`, obj)
      .then(() => {
        dispatch({
          type: ADD_PRICE_VARIANT,
          message: "The variant price is added successfully!"
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: VARIANT_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: VARIANT_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}

export function deleteVariantPrice(id) {
  return function(dispatch) {
    dispatch({ type: CLEAN_VARIANT });
    http
      .post(`${APP_CONST.API_URL}/variant/deletePrice/${id}`)
      .then(() => {
        dispatch({
          type: DELETE_PRICE_VARIANT,
          message: "The variant price is deleted successfully!"
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: VARIANT_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: VARIANT_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}

export function defaultVariantPrice(id) {
  return function(dispatch) {
    dispatch({ type: CLEAN_VARIANT });
    http
      .post(`${APP_CONST.API_URL}/variant/defaultPrice/${id}`)
      .then(() => {
        dispatch({
          type: DELETE_PRICE_VARIANT,
          message: "The variant price is set as default successfully!"
        });
      })
      .catch(err => {
        if (err.response) {
          let { errors } = err.response.data;
          dispatch({ type: VARIANT_ERROR, errors: errorHandler(errors) });
        } else {
          dispatch({
            type: VARIANT_ERROR,
            errors: "There is a server connection Error, Try Later."
          });
        }
      });
  };
}