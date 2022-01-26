import { createSlice } from "@reduxjs/toolkit";

interface initialStateTypes {
  groupLoading: boolean;
  groupSucceed: boolean;
  groupError: any;
  group: [];
  groupPageNumber: number;
  groupPageEnd: boolean;
}

const initialState: initialStateTypes = {
  groupLoading: false,
  groupSucceed: false,
  groupError: null,
  group: [],
  groupPageNumber: 0,
  groupPageEnd: false,
};

const groupSlice = createSlice({
  name: "groupReducer",
  initialState,
  reducers: {
    READ_GROUPS_REQUEST: (state, action) => {
      state.groupLoading = true;
      state.groupError = null;
    },
    READ_GROUPS_SUCCESS: (state, action) => {
      state.groupLoading = false;
      state.groupSucceed = true;
      state.group = action.payload.data.group;
    },
    READ_GROUPS_FAILED: (state, action) => {
      console.log(action);
      state.groupSucceed = false;
      state.groupLoading = false;
      state.groupError = action.payload.error;
    },
    READ_GROUPS_FINISHED: (state, action) => {},
    READ_GROUPS_EMPTY: (state, action) => {
      state.groupLoading = false;
      state.groupPageEnd = false;
      state.group = [];
      state.groupPageNumber = 0;
    },
  },
});

const groupSliceReducer = groupSlice.reducer;

export const {
  READ_GROUPS_REQUEST,
  READ_GROUPS_SUCCESS,
  READ_GROUPS_FAILED,
  READ_GROUPS_FINISHED,
  READ_GROUPS_EMPTY,
} = groupSlice.actions;

export default groupSliceReducer;
