import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    createUser(state, action) {},
    updateUser(state, action) {},
    deleteUser(state, action) {},
  },
});

const { actions, reducer } = postsSlice;
export const { createUser, updateUser, deleteUser } = actions;
export default reducer;
