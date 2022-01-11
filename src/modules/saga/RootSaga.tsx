import {  takeLatest } from "redux-saga/effects";
import postUser from "./UserSaga";

const userSignInRequestType = "userReducer/SIGNIN_REQUEST";

    export default function* rootSaga(){
        yield takeLatest(userSignInRequestType,postUser)
    }