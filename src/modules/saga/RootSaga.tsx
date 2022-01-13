import {  takeLatest } from "redux-saga/effects";
import {postUser, postUserToken} from "./UserSaga";

const userSignInRequestType = "userReducer/SIGNIN_REQUEST";
const userTokenRequestType = "userReducer/TOKEN_REQUEST";

    export default function* rootSaga(){
        yield takeLatest(userSignInRequestType,postUser)
        yield takeLatest(userTokenRequestType, postUserToken)
    }