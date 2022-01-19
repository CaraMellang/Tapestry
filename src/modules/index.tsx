import { combineReducers } from "redux";
import userSliceReducer from "./redux/User";
import groupFeedSliceReducer from "./redux/GroupFeed";

const rootReducer = combineReducers({
  userSliceReducer,
  groupFeedSliceReducer,
});

export default rootReducer;
