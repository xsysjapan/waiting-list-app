import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../shared/api";
import {
  CreateWaitingListRequest,
  PostWaitingListCustomerRequest,
} from "../shared/api/generated";
import {
  OperationState,
  WaitingListDetails,
  WaitingListSummary,
} from "../shared/types";

export const getWaitingLists = createAsyncThunk(
  "waitingLists/getWaitingListsStatus",
  () => api.getWaitingLists({})
);

export const getWaitingListById = createAsyncThunk(
  "waitingLists/getWaitingListByIdStatus",
  (id: string) => api.getWaitingList({ id })
);

export const createWaitingList = createAsyncThunk(
  "waitingLists/createWaitingListStatus",
  (param: CreateWaitingListRequest["waitingListCreationParams"]) => {
    return api.createWaitingList({ waitingListCreationParams: param });
  }
);

export const createWaitingListCustomer = createAsyncThunk(
  "waitingLists/createWaitingListCustomerStatus",
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

export const deleteWaitingListCustomer = createAsyncThunk(
  "waitingLists/deleteWaitingListCustomerStatus",
  (param: { id: string; customerId: string }) => {
    return api.deleteWaitingListCustomer(param);
  }
);

interface WaitingListState {
  getWaitingListsError?: string;
  getWaitingListsStatus: OperationState;
  getWaitingListByIdError?: string;
  getWaitingListByIdStatus: OperationState;
  waitingLists: WaitingListSummary[];
  waitingList?: WaitingListDetails;
  createWaitingListFormError?: string;
  createWaitingListFormStatus: OperationState;
  createWaitingListCustomerFormError?: string;
  createWaitingListCustomerFormStatus: OperationState;
  deleteWaitingListCustomerStatus: OperationState;
}

const initialState: WaitingListState = {
  getWaitingListsStatus: "UNSUBMITTED",
  getWaitingListByIdStatus: "UNSUBMITTED",
  waitingLists: [],
  createWaitingListFormStatus: "UNSUBMITTED",
  createWaitingListCustomerFormStatus: "UNSUBMITTED",
  deleteWaitingListCustomerStatus: "UNSUBMITTED",
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
    // 待ちリストの取得
    builder.addCase(getWaitingListById.pending, (state) => {
      state.waitingLists = [];
      state.getWaitingListByIdStatus = "LOADING";
    });
    builder.addCase(getWaitingListById.fulfilled, (state, action) => {
      state.getWaitingListByIdStatus = "SUCCEEDED";
      state.waitingList = action.payload as any;
    });
    builder.addCase(getWaitingListById.rejected, (state) => {
      state.getWaitingListByIdError = "検索に失敗しました。";
      state.getWaitingListByIdStatus = "FAILED";
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

    // 顧客の削除
    builder.addCase(deleteWaitingListCustomer.fulfilled, (state, action) => {
      state.deleteWaitingListCustomerStatus = "SUCCEEDED";
      if (state.waitingList) {
        state.waitingList.customers = state.waitingList.customers.filter(
          (e) => e.id !== action.meta.arg.customerId
        );
      }
    });
    builder.addCase(deleteWaitingListCustomer.rejected, (state) => {
      state.deleteWaitingListCustomerStatus = "FAILED";
    });
  },
});

export const {
  createWaitingListFormInitialized,
  createWaitingListCustomerFormInitialized,
} = waitingListSlice.actions;
export default waitingListSlice.reducer;
