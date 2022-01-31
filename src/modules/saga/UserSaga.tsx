import { PayloadAction, Action } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put } from "redux-saga/effects";
import { SIGNIN_FAILED, SIGNIN_SUCCESS, TOKEN_FAILED, TOKEN_SUCCESS } from "../redux/User";
import httpPath from '../../lib/mode'

async function postUserData(data: any) {
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

async function postToken(data:any){
  return await axios.post(`${httpPath}/auth/verify`,
  { key: "value" },
  {
    headers: { Authorization: `Bearer ${data}` },
  })
}

export function* postUserToken(action:any):Generator{
  try{
    const {data}:any = yield call(postToken,action.payload)
    console.log(data)
    yield put(TOKEN_SUCCESS(data))
  }catch(err){
    yield put(TOKEN_FAILED(err))
  }
}

