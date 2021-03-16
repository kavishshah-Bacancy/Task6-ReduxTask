import { combineReducers } from "redux";
import userApiReducer from "./userApiReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  userApi: userApiReducer,
});

export default rootReducer;
