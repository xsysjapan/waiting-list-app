import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../shared/api";
import {
  CreateWaitingListRequest,
  PostWaitingListCustomerRequest,
} from "../shared/api/generated";
import { WaitingListSummary } from "../shared/types";

export const getWaitingLists = createAsyncThunk("waitingLists/get", () =>
  api.getWaitingLists({})
);

export const createWaitingList = createAsyncThunk(
  "waitingLists/create",
  (param: CreateWaitingListRequest["waitingListCreationParams"]) => {
    return api.createWaitingList({ waitingListCreationParams: param });
  }
);

export const createWaitingListCustomer = createAsyncThunk(
  "waitingLists/createCustomer",
  (
    param: {
      id: string;
    } & PostWaitingListCustomerRequest["waitingListCustomerCreationParams"]
  ) => {
    return api.postWaitingListCustomer({
      id: param.id,
      waitingListCustomerCreationParams: param,
    });
  }
);

type OperationState = "UNSUBMITTED" | "LOADING" | "SUCCEEDED" | "FAILED";

interface WaitingListState {
  waitingListsError?: string;
  waitingListsStatus: OperationState;
  waitingLists: WaitingListSummary[];
  createWaitingListFormError?: string;
  createWaitingListFormStatus: OperationState;
  createWaitingListCustomerFormError?: string;
  createWaitingListCustomerFormStatus: OperationState;
}

const initialState: WaitingListState = {
  waitingListsStatus: "UNSUBMITTED",
  waitingLists: [],
  createWaitingListFormStatus: "UNSUBMITTED",
  createWaitingListCustomerFormStatus: "UNSUBMITTED",
};

const waitingListSlice = createSlice({
  name: "waitingLists",
  initialState: initialState,
  reducers: {
    createWaitingListFormInitialized(state) {
      delete state.createWaitingListFormError;
      state.createWaitingListFormStatus = "UNSUBMITTED";
    },
    createWaitingListCustomerFormInitialized(state) {
      delete state.createWaitingListCustomerFormError;
      state.createWaitingListCustomerFormStatus = "UNSUBMITTED";
    },
  },
  extraReducers: (builder) => {
    // 待ちリストの取得
    builder.addCase(getWaitingLists.pending, (state) => {
      state.waitingLists = [];
      state.waitingListsStatus = "LOADING";
    });
    builder.addCase(getWaitingLists.fulfilled, (state, action) => {
      state.waitingListsStatus = "SUCCEEDED";
      state.waitingLists = action.payload;
    });
    builder.addCase(getWaitingLists.rejected, (state) => {
      state.waitingListsError = "検索に失敗しました。";
      state.waitingListsStatus = "FAILED";
    });

    // 待ちリストの作成
    builder.addCase(createWaitingList.pending, (state) => {
      delete state.createWaitingListFormError;
      state.createWaitingListFormStatus = "LOADING";
    });
    builder.addCase(createWaitingList.fulfilled, (state) => {
      state.createWaitingListFormStatus = "SUCCEEDED";
    });
    builder.addCase(createWaitingList.rejected, (state) => {
      state.createWaitingListFormError = "登録に失敗しました。";
      state.createWaitingListFormStatus = "FAILED";
    });

    // 顧客の追加
    builder.addCase(createWaitingListCustomer.pending, (state) => {
      delete state.createWaitingListCustomerFormError;
      state.createWaitingListCustomerFormStatus = "LOADING";
    });
    builder.addCase(createWaitingListCustomer.fulfilled, (state) => {
      state.createWaitingListCustomerFormStatus = "SUCCEEDED";
    });
    builder.addCase(createWaitingListCustomer.rejected, (state) => {
      state.createWaitingListCustomerFormError = "登録に失敗しました。";
      state.createWaitingListCustomerFormStatus = "FAILED";
    });
  },
});

export default waitingListSlice.reducer;
