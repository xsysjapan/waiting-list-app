import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../shared/api";
import {
  CreateWaitingListRequest,
  PostWaitingListCustomerCallRequest,
  PostWaitingListCustomerRequest,
  PutWaitingListCustomerStatusRequest,
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

export const deleteWaitingList = createAsyncThunk(
  "waitingLists/deleteWaitingListStatus",
  (param: { id: string }) => {
    return api.deleteWaitingList(param);
  }
);

export const deleteWaitingListCustomer = createAsyncThunk(
  "waitingLists/deleteWaitingListCustomerStatus",
  (param: { id: string; customerId: string }) => {
    return api.deleteWaitingListCustomer(param);
  }
);

export const callWaitingListCustomer = createAsyncThunk(
  "waitingLists/callWaitingListCustomerStatus",
  (
    param: {
      id: string;
      customerId: string;
    } & PostWaitingListCustomerCallRequest["waitingListCallCustomerParams"]
  ) => {
    return api.postWaitingListCustomerCall({
      ...param,
      waitingListCallCustomerParams: param,
    });
  }
);

export const updateWaitingListCustomerCallingStatus = createAsyncThunk(
  "waitingLists/updateWaitingListCustomerCallingStatusStatus",
  (
    param: {
      id: string;
      customerId: string;
    } & PutWaitingListCustomerStatusRequest["waitingListUpdateCallingStatusParams"]
  ) => {
    return api.putWaitingListCustomerStatus({
      ...param,
      waitingListUpdateCallingStatusParams: param,
    });
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
  deleteWaitingListStatus: OperationState;
  deleteWaitingListCustomerStatus: OperationState;
  callWaitingListCustomerStatus: OperationState;
  updateWaitingListCustomerCallingStatusStatus: OperationState;
}

const initialState: WaitingListState = {
  getWaitingListsStatus: "UNSUBMITTED",
  getWaitingListByIdStatus: "UNSUBMITTED",
  waitingLists: [],
  createWaitingListFormStatus: "UNSUBMITTED",
  createWaitingListCustomerFormStatus: "UNSUBMITTED",
  deleteWaitingListStatus: "UNSUBMITTED",
  deleteWaitingListCustomerStatus: "UNSUBMITTED",
  callWaitingListCustomerStatus: "UNSUBMITTED",
  updateWaitingListCustomerCallingStatusStatus: "UNSUBMITTED",
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
    waitingListDeleted(state) {
      delete state.waitingList;
      state.deleteWaitingListStatus = "UNSUBMITTED";
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

    // 待ちリストの削除
    builder.addCase(deleteWaitingList.fulfilled, (state, action) => {
      state.deleteWaitingListStatus = "SUCCEEDED";
      if (state.waitingList) {
        state.waitingLists = state.waitingLists.filter(
          (e) => e.id !== action.meta.arg.id
        );
      }
    });
    builder.addCase(deleteWaitingList.rejected, (state) => {
      state.deleteWaitingListStatus = "FAILED";
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

    // 顧客の呼び出し
    builder.addCase(callWaitingListCustomer.fulfilled, (state, action) => {
      state.callWaitingListCustomerStatus = "SUCCEEDED";
      if (state.waitingList) {
        const customer = state.waitingList.customers.filter(
          (e) => e.id === action.meta.arg.customerId
        )[0];
        if (customer) {
          customer.status = "CALLING";
        }
      }
    });
    builder.addCase(callWaitingListCustomer.rejected, (state) => {
      state.callWaitingListCustomerStatus = "FAILED";
    });

    // 顧客の呼び出し状態の更新
    builder.addCase(
      updateWaitingListCustomerCallingStatus.fulfilled,
      (state, action) => {
        state.updateWaitingListCustomerCallingStatusStatus = "SUCCEEDED";
        if (state.waitingList) {
          const customer = state.waitingList.customers.filter(
            (e) => e.id === action.meta.arg.customerId
          )[0];
          if (customer) {
            customer.status = action.meta.arg.status;
          }
        }
      }
    );
    builder.addCase(
      updateWaitingListCustomerCallingStatus.rejected,
      (state) => {
        state.updateWaitingListCustomerCallingStatusStatus = "FAILED";
      }
    );
  },
});

export const {
  createWaitingListFormInitialized,
  createWaitingListCustomerFormInitialized,
  waitingListDeleted,
} = waitingListSlice.actions;
export default waitingListSlice.reducer;
