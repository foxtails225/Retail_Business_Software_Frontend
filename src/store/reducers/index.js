import { combineReducers } from "redux";
import auth from "./auth";
import persist from "./persist";
import product from "./product";
import keyword from "./keyword";
import trademark from "./trademark";
import category from "./category";
import variant from "./variant";
import setting from "./setting";
import artist from "./artist";

const rootReducer = combineReducers({
  auth,
  persist,
  keyword,
  product,
  category,
  trademark,
  variant,
  setting,
  artist,
});
export default rootReducer;
