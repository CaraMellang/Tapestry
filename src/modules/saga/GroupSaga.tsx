import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import { call, cancel, put } from "redux-saga/effects";
import { getCookie } from "../../lib/cookie";
import { READ_GROUP_FAILED, READ_GROUP_REQUEST, READ_GROUP_SUCCESS } from "../redux/Group";

async function readGroups(data: any) {
    const token = getCookie("access_token");
    return await axios.post(
      `http://localhost:5000/group/readgroup`,
      {
        page: data.page,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  
  export function* group(action: PayloadAction): Generator {
    console.log("페이로드액션1", action);
    try {
      const { data }: any = yield call(readGroups, action.payload);
      yield put(READ_GROUP_SUCCESS(data));
    } catch (err) {
      console.log(err);
      yield put(READ_GROUP_FAILED(err));
    }
  }
  