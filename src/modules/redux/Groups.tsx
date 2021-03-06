import { createSlice } from "@reduxjs/toolkit";
import { User } from "./User";

interface initialStateTypes {
  groupsLoading: boolean;
  groupsSucceed: boolean;
  groupsError: any;
  groups: [];
  groupsPageNumber: number;
  groupsPageEnd: boolean;
}

export interface Group {
  _id:string;
  owner_id: User;
  group_name: string;
  group_description: string;
  group_img: string
  group_people_count: number
  group_peoples: User[]
  created_at: string
  updated_at: string
}

const initialState: initialStateTypes = {
  groupsLoading: false,
  groupsSucceed: false,
  groupsError: null,
  groups: [],
  groupsPageNumber: 0,
  groupsPageEnd: false,
};

const groupsSlice = createSlice({
  name: "groupsReducer",
  initialState,
  reducers: {
    READ_GROUPS_REQUEST: (state, action) => {
      state.groupsLoading = true;
      state.groupsError = null;
    },
    READ_GROUPS_SUCCESS: (state, action) => {
      state.groupsLoading = false;
      state.groupsSucceed = true;
      state.groups = action.payload.data.group;
    },
    READ_GROUPS_FAILED: (state, action) => {
      console.log(action);
      state.groupsSucceed = false;
      state.groupsLoading = false;
      state.groupsError = action.payload.error;
    },
    READ_GROUPS_FINISHED: (state, action) => {},
    READ_GROUPS_EMPTY: (state, action) => {
      state.groupsLoading = false;
      state.groupsPageEnd = false;
      state.groups = [];
      state.groupsPageNumber = 0;
    },
  },
});

const groupsSliceReducer = groupsSlice.reducer;

export const {
  READ_GROUPS_REQUEST,
  READ_GROUPS_SUCCESS,
  READ_GROUPS_FAILED,
  READ_GROUPS_FINISHED,
  READ_GROUPS_EMPTY,
} = groupsSlice.actions;

export default groupsSliceReducer;
