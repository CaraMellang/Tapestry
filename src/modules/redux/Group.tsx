import { createSlice } from "@reduxjs/toolkit";

interface initialStateTypes {
  groupLoading: boolean;
  groupSucceed: boolean;
  groupError: any;
  groupPosts: object[];
  groupPageNumber: number;
  groupPageEnd: boolean;
}

const initialState: initialStateTypes = {
  groupLoading: false,
  groupSucceed: false,
  groupError: null,
  groupPosts: [],
  groupPageNumber: 1,
  groupPageEnd: false,
};

const groupSlice = createSlice({
  name: "groupReducer",
  initialState,
  reducers: {
    GROUP_REQUEST: (state, action) => {
      state.groupLoading = true;
      state.groupSucceed = false;
      state.groupError = null;
    },
    GROUP_SUCCESS: (state, action) => {
      state.groupLoading = false;
      state.groupSucceed = true;
        state.groupPosts.push(...action.payload.data);
      state.groupPageNumber += 1;
    },
    GROUP_FAILED: (state, action) => {
      state.groupSucceed = false;
      state.groupLoading = false;
      state.groupError = action.payload.error;
    },
    GROUP_FINISHED: (state, action) => {
      state.groupPageEnd = true;
      state.groupPageNumber -= 1;
    },
    GROUP_EMPTY: (state, action) => {
      state.groupLoading = false;
      state.groupPageEnd = false;
      state.groupPosts = [];
      state.groupPageNumber = 1;
    },
  },
});

const groupSliceReducer = groupSlice.reducer;

export const {
  GROUP_REQUEST,
  GROUP_SUCCESS,
  GROUP_FAILED,
  GROUP_FINISHED,
  GROUP_EMPTY,
} = groupSlice.actions;

export default groupSliceReducer;
