import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { fork } from "child_process";
import { all, call, cancel, put, takeLatest } from "redux-saga/effects";
import { getCookie } from "../../lib/cookie";
import {
  GROUP_FEED_FAILED,
  GROUP_FEED_FINISHED,
  GROUP_FEED_SUCCESS,
} from "../redux/GroupFeed";
import httpPath from "../../hook/useDesktop";
import client from "../../lib/api/client";

async function readGroupFeed(data: any) {
  const token = getCookie("access_token");
  return await client.post(`/post/readgrouparr`, {
    group_arr: data.group_arr,
    page: data.page,
  });
  return await axios.post(
    `${httpPath}/post/readgrouparr`,
    {
      group_arr: data.group_arr,
      page: data.page,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

export function* groupFeed(action: PayloadAction): Generator {
  console.log("페이로드액션", action);
  try {
    const { data }: any = yield call(readGroupFeed, action.payload);
    console.log(data);
    if (data.data.length === 0) {
      yield put(GROUP_FEED_FINISHED(action.payload));
      yield cancel();
    }
    yield put(GROUP_FEED_SUCCESS(data));
  } catch (err) {
    console.log(err);
    yield put(GROUP_FEED_FAILED(err));
  }
}
