import { combineReducers } from "redux";
import userSliceReducer from "./redux/User";
import groupFeedSliceReducer from "./redux/GroupFeed";
import groupsSliceReducer from "./redux/Groups";
import groupSliceReducer from "./redux/Group";

const rootReducer = combineReducers({
  userSliceReducer,
  groupFeedSliceReducer,
  groupsSliceReducer,
  groupSliceReducer,
});

export default rootReducer;
