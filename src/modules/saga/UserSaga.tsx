import { PayloadAction, Action } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put } from "redux-saga/effects";
import { SIGNIN_FAILED, SIGNIN_SUCCESS } from "../redux/User";

async function postUserData(data: any) {
  return await axios.post(`http://localhost:5000/auth/signin`, data);
}

function* postUser(action: any): Generator {
  try {
    const { data }: any = yield call(postUserData, action.payload);
    console.log(data);
    yield put(SIGNIN_SUCCESS(data));
  } catch (err) {
    console.log(err);
    yield put(SIGNIN_FAILED(err));
  }
}

export default postUser;
