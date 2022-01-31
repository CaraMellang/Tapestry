import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import { call, cancel, put } from "redux-saga/effects";
import { getCookie } from "../../lib/cookie";
import {
  GROUP_FAILED,
  GROUP_FINISHED,
  GROUP_REQUEST,
  GROUP_SUCCESS,
} from "../redux/Group";
import httpPath from "../../lib/mode";

async function readGroup(data: any) {
  const token = getCookie("access_token");
  return await axios.post(
    `${httpPath}/post/readgroup`,
    {
      group_id: data.group_id,
      page: data.page,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

export function* group(action: PayloadAction): Generator {
  try {
    const { data }: any = yield call(readGroup, action.payload);
    if (data.data.length === 0) {
      yield put(GROUP_FINISHED(action.payload));
      yield cancel();
    }
    yield put(GROUP_SUCCESS(data));
  } catch (err) {
    console.log(err);
    yield put(GROUP_FAILED(err));
  }
}
