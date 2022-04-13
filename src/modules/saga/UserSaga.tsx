import { PayloadAction, Action } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put } from "redux-saga/effects";
import {
  SIGNIN_FAILED,
  SIGNIN_SUCCESS,
  TOKEN_FAILED,
  TOKEN_SUCCESS,
} from "../redux/User";
import httpPath from "../../lib/mode";
import client from "../../lib/api/client";

async function postUserData(data: any) {
  return await client.post(`/auth/signin`, data);
  return await axios.post(`${httpPath}/auth/signin`, data);
}

export function* postUser(action: any): Generator {
  try {
    const { data }: any = yield call(postUserData, action.payload);
    console.log(data);
    yield put(SIGNIN_SUCCESS(data));
  } catch (err) {
    console.log(err);
    yield put(SIGNIN_FAILED(err));
  }
}

function postToken(data: any) {
  return client.post(`/auth/verify`, ".");
  return axios.post(
    `${httpPath}/auth/verify`,
    { key: "value" },
    {
      headers: { Authorization: `Bearer ${data}` },
    }
  );
}

export function* postUserToken(action: any): Generator {
  try {
    const { data }: any = yield call(postToken, action.payload); //call은 동기적으로 실행(client.post().then() 효과. 결과값을 기다려줌.), fork는 비동기적으로 실행.
    console.log(data);
    yield put(TOKEN_SUCCESS(data));
  } catch (err) {
    yield put(TOKEN_FAILED(err));
  }
}
