import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put } from "redux-saga/effects";
import { GROUP_FEED_FAILED, GROUP_FEED_SUCCESS } from "../redux/GroupFeed";

async function readGroupFeed(data: any) {
  return await axios.post(`http://localhost:5000/post/read`, {
    group_id: "61cf23fade9e5f953c747b90",
    page: data.page ,
  });
}

export function* groupFeed(action: PayloadAction): Generator {
  console.log("페이로드액션", action);
  try {
    const { data }: any = yield call(readGroupFeed, action.payload);
    console.log(data);
    yield put(GROUP_FEED_SUCCESS(data));
  } catch (err) {
    console.log(err);
    yield put(GROUP_FEED_FAILED(err));
  }
}
