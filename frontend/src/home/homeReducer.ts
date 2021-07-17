import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../shared/api";
import { OperationStatus, WaitingListSummary } from "../shared/types";

export const getWaitingLists = createAsyncThunk(
  "waitingLists/getWaitingListsStatus",
  () => api.getWaitingLists({ active: true })
);

interface HomeState {
  getWaitingListsError?: string;
  getWaitingListsStatus: OperationStatus;
  waitingLists: WaitingListSummary[];
}

const initialState: HomeState = {
  getWaitingListsStatus: "UNSUBMITTED",
  waitingLists: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWaitingLists.pending, (state) => {
      state.getWaitingListsStatus = "LOADING";
    });
    builder.addCase(getWaitingLists.fulfilled, (state, action) => {
      state.getWaitingListsStatus = "SUCCEEDED";
      state.waitingLists = action.payload;
    });
    builder.addCase(getWaitingLists.rejected, (state) => {
      state.getWaitingListsError = "検索に失敗しました。";
      state.getWaitingListsStatus = "FAILED";
    });
  },
});

export default homeSlice.reducer;
