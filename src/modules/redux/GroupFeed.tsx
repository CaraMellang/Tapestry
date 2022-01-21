import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  groupFeedLoading: boolean;
  groupFeedSucceed: boolean;
  groupFeedError: any;
  groupFeeds: object[];
  groupPageNumber: number;
  groupPageEnd: boolean;
}

const initialState: initialStateType = {
  groupFeedLoading: false,
  groupFeedSucceed: false,
  groupFeedError: null,
  groupFeeds: [],
  groupPageNumber: 1,
  groupPageEnd: false,
};

const groupFeedSlice = createSlice({
  name: "groupFeedReducer",
  initialState,
  reducers: {
    GROUP_FEED_REQUEST: (state, action) => {
      console.log(state, action);
      state.groupFeedLoading = true;
      state.groupFeedSucceed = false;
    },
    GROUP_FEED_SUCCESS: (state, action) => {
      console.log(state, action);
      state.groupPageNumber += 1;
      state.groupFeeds.push(...action.payload.data);
      state.groupFeedLoading = false;
      state.groupFeedSucceed = true;
    },
    GROUP_FEED_FAILED: (state, action) => {
      console.log(state, action);
      state.groupFeedLoading = false;
      state.groupFeedSucceed = false;
    },
    GROUP_FEED_FINISHED: (state, action) => {
      console.log("실행??");
      state.groupPageEnd = true;
      state.groupPageNumber -= 1;
    },
  },
});

const groupFeedSliceReducer = groupFeedSlice.reducer;

export const {
  GROUP_FEED_REQUEST,
  GROUP_FEED_SUCCESS,
  GROUP_FEED_FAILED,
  GROUP_FEED_FINISHED,
} = groupFeedSlice.actions;

export default groupFeedSliceReducer;
