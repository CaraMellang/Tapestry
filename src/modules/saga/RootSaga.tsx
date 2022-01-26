import { all, takeLatest } from "redux-saga/effects";
import { groupFeed } from "./FeedSaga";
import { groups } from "./GroupsSaga";
import { postUser, postUserToken } from "./UserSaga";

const userSignInRequestType = "userReducer/SIGNIN_REQUEST";
const userTokenRequestType = "userReducer/TOKEN_REQUEST";
const groupFeedRequestType = "groupFeedReducer/GROUP_FEED_REQUEST";
const groupRequestType = "groupReducer/READ_GROUPS_REQUEST";

export default function* rootSaga() {
  yield takeLatest(userSignInRequestType, postUser);
  yield takeLatest(userTokenRequestType, postUserToken);
  yield takeLatest(groupFeedRequestType, groupFeed);
  yield takeLatest(groupRequestType,groups)
}
