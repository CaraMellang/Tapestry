import { combineReducers } from "redux";
import userSliceReducer from "./redux/User";
import groupFeedSliceReducer from "./redux/GroupFeed";
import groupSliceReducer from "./redux/Groups";

const rootReducer = combineReducers({
  userSliceReducer,
  groupFeedSliceReducer,
  groupSliceReducer,
});

export default rootReducer;
