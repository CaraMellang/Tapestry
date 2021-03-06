import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import { call, cancel, put } from "redux-saga/effects";
import { getCookie } from "../../lib/cookie";
import {
  READ_GROUPS_FAILED,
  READ_GROUPS_REQUEST,
  READ_GROUPS_SUCCESS,
} from "../redux/Groups";
import httpPath from "../../hook/useDesktop";
import client from "../../lib/api/client";

async function readGroups(data: any) {
  const token = getCookie("access_token");
  return await client.post(`/group/readgroup`, { page: data.page });
  // return await axios.post(
  //   `${httpPath}/group/readgroup`,
  //   {
  //     page: data.page,
  //   },
  //   {
  //     headers: { Authorization: `Bearer ${token}` },
  //   }
  // );
}

export function* groups(action: PayloadAction): Generator {
  try {
    const { data }: any = yield call(readGroups, action.payload);
    yield put(READ_GROUPS_SUCCESS(data));
  } catch (err) {
    console.log(err);
    yield put(READ_GROUPS_FAILED(err));
  }
}
