import {
        VARIANT_ERROR,
        LIST_COLOR,
        LIST_SIZE,
        LIST_TYPE,
        CREATE_VARIANT,
        CLEAN_VARIANT,
        DELETE_VARIANT,
        ALL_IMAGE_VARIANT,
        UPDATE_IMAGE_VARIANT,
        ALL_MERCHANT_PRICE_VARIANT,
        UPDATE_MERCHANT_PRICE_VARIANT,
        ALL_DESCRIPTION_VARIANT,
        UPDATE_DESCRIPTION_VARIANT,
        UPDATE_VARIANT,
        ALL_PRICE_VARIANT,
        ADD_PRICE_VARIANT,
        DELETE_PRICE_VARIANT,
        DEFAULT_PRICE_VARIANT,
        CLEAN_COLOR,
        CLEAN_TYPE,
        CLEAN_SIZE
} from '../actions/types';

const initialState = {
        colors: [],
        sizes: [],
        types: [],
        merchantPrices: [],
        description: '',
        message: '',
        errors: ""
};

export default function (state = initialState, action) {
        switch (action.type) {
                case LIST_SIZE:
                        return { ...state, sizes: action.sizes, message: "", errors: "" }
                case LIST_COLOR:
                        return { ...state, colors: action.colors, message: "", errors: "" }
                case LIST_TYPE:
                        return { ...state, types: action.types, message: "", errors: "" }
                case ALL_IMAGE_VARIANT:
                        return { ...state, images: action.images, message: "", errors: "" }
                case UPDATE_IMAGE_VARIANT:
                        return { ...state, images: action.images, message: action.message, errors: "" }
                case ALL_MERCHANT_PRICE_VARIANT:
                        return { ...state, merchantPrices: action.prices, message: "", errors: "" }
                case UPDATE_MERCHANT_PRICE_VARIANT:
                        return { ...state, merchantPrices: action.prices, message: action.message, errors: "" }
                case ALL_DESCRIPTION_VARIANT:
                        return { ...state, description: action.description, message: "", errors: "" }
                case UPDATE_DESCRIPTION_VARIANT:
                        return { ...state, description: action.description, message: action.message, errors: "" }
                case CREATE_VARIANT:
                        return { ...state, message: action.message, errors: "" }
                case ALL_PRICE_VARIANT:
                        return { ...state, prices: action.prices, message: "", errors: "" }
                case ADD_PRICE_VARIANT:
                        return { ...state, message: action.message, errors: "" }
                case DELETE_PRICE_VARIANT:
                        return { ...state, message: action.message, errors: "" }
                case DEFAULT_PRICE_VARIANT:
                        return { ...state, message: action.message, errors: "" }
                case UPDATE_VARIANT:
                        return { ...state, message: action.message, errors: "" }
                case DELETE_VARIANT:
                        return { ...state, message: action.message, errors: "" }
                case VARIANT_ERROR:
                        return { ...state, message: "", errors: action.errors };
                case CLEAN_VARIANT:
                        return { ...state, message: '', errors: "" };
                case CLEAN_SIZE:
                        return { ...state, sizes: '', message: '', errors: "" };
                case CLEAN_COLOR:
                        return { ...state, colors: '', message: '', errors: "" };
                case CLEAN_TYPE:
                        return { ...state, types: '', message: '', errors: "" };
                default:
                        return state
        }
}