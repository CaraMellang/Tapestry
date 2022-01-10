import { combineReducers } from "redux";
import userSliceReducer from "./redux/User";

const rootReducer = combineReducers({
  userSliceReducer,
});

export default rootReducer;
