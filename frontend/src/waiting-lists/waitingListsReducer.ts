import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "waitingLists",
  initialState: [],
  reducers: {
    createWaitingList(state, action) {},
    updateWaitingList(state, action) {},
    deleteWaitingList(state, action) {},
  },
});

const { actions, reducer } = postsSlice;
export const { createWaitingList, updateWaitingList, deleteWaitingList } =
  actions;
export default reducer;
