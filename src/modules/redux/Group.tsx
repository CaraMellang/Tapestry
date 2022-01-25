import { createSlice } from "@reduxjs/toolkit";

interface initialStateTypes {
  groupLoading: boolean;
  groupSucceed: boolean;
  groupError: any;
  group: [];
}

const initialState = {
  groupLoading: true,
  groupSucceed: false,
  groupError: null,

  group: [],
};

const groupSlice = createSlice({
  name: "groupReducer",
  initialState,
  reducers: {
    READ_GROUP_REQUEST: (state, action) => {
      state.groupLoading = true;
      state.groupLoading = false;
      state.groupError = null;
    },
    READ_GROUP_SUCCESS: (state, action) => {
      state.groupLoading = false;
      state.groupSucceed = true;
      state.group= action.payload.data.group;
    },
    READ_GROUP_FAILED: (state, action) => {
      console.log(action);
      state.groupSucceed = false;
      state.groupLoading = false;
      state.groupError = action.payload.error;
    },
  },
});

const groupSliceReducer = groupSlice.reducer;

export const { READ_GROUP_REQUEST, READ_GROUP_SUCCESS, READ_GROUP_FAILED } =
  groupSlice.actions;

export default groupSliceReducer;
