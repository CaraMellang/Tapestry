import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupFeedLoading: true,
  groupFeedSucceed: false,
  groupFeedError: null,
  groupFeeds: [],
};

const groupFeedSlice = createSlice({
  name: "groupFeedReducer",
  initialState,
  reducers: {
    GROUP_FEED_REQUEST: (state, action) => {},
    GROUP_FEED_SUCCESS: (state, action) => {},
    GROUP_FEED_FAILED: (state, action) => {},
  },
});

const groupFeedSliceReducer = groupFeedSlice.reducer;

export const { GROUP_FEED_REQUEST, GROUP_FEED_SUCCESS, GROUP_FEED_FAILED } =
  groupFeedSlice.actions;

export default groupFeedSliceReducer;
