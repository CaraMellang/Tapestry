import { createSlice } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  userId: string;
  email: string;
  user_name: string;
  user_img: string;
  follow: [];
  group: [];
  createdAt: string;
  accessToken: string;
}

interface userInitialState {
  signinLoading: boolean;
  signinSucceed: boolean;
  signinError: "";
  user: User;
}

const initialState: userInitialState = {
  signinLoading: true,
  signinSucceed: false,
  signinError: "",
  user: {
    _id: "",
    userId: "",
    email: "",
    user_name: "",
    user_img: "",
    follow: [],
    group: [],
    createdAt: "",
    accessToken: "",
  },
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    SIGNIN_REQUEST: (state, action) => {
      state.signinLoading = true;
      state.signinLoading = false;
      state.signinError = "";
    },
    SIGNIN_SUCCESS: (state, action) => {
      state.signinLoading = false;
      state.signinSucceed = true;
      state.user._id = action.payload.data.userId;
      state.user.userId = action.payload.data.userId;
      state.user.accessToken = action.payload.data.accessToken;
      state.user.email = action.payload.data.email;
      state.user.user_name = action.payload.data.username;
      state.user.user_img = action.payload.data.user_img;
      state.user.follow = action.payload.data.follow;
      state.user.group = action.payload.data.group;
      state.user.createdAt = action.payload.data.createdAt;
    },
    SIGNIN_FAILED: (state, action) => {
      console.log(action);
      state.signinSucceed = false;
      state.signinLoading = false;
      state.signinError = action.payload.error;
    },
    TOKEN_REQUEST: (state, action) => {
      state.signinLoading = true;
      state.signinLoading = false;
      state.signinError = "";
    },
    TOKEN_SUCCESS: (state, action) => {
      state.signinLoading = false;
      state.signinSucceed = true;
      state.user._id = action.payload.data.userId;
      state.user.userId = action.payload.data.userId;
      state.user.accessToken = action.payload.data.accessToken;
      state.user.email = action.payload.data.email;
      state.user.user_name = action.payload.data.username;
      state.user.user_img = action.payload.data.user_img;
      state.user.follow = action.payload.data.follow;
      state.user.group = action.payload.data.group;
      state.user.createdAt = action.payload.data.createdAt;
    },
    TOKEN_FAILED: (state, action) => {
      state.signinSucceed = false;
      state.signinLoading = false;
      state.signinError = action.payload.error;
    },
    SIGNOUT: (state: any) => {
      state.signinSucceed = false;
      state.user.userId = "";
      state.user.accessToken = "";
      state.user.email = "";
      state.user.username = "";
      state.user.user_img = "";
      state.user.follow = [];
      state.user.createdAt = "";
    },
  },
});

const userSliceReducer = userSlice.reducer;

export const {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
  SIGNOUT,
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILED,
} = userSlice.actions;

export default userSliceReducer;
