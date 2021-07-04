import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../shared/api";
import {
  CreateWaitingListRequest,
  PostWaitingListCustomerCallRequest,
  PostWaitingListCustomerOrderRequest,
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
  (param: { id: string }) => api.getWaitingList(param)
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

export const moveWaitingListCustomer = createAsyncThunk(
  "waitingLists/moveWaitingListCustomerStatus",
  (
    param: {
      id: string;
      customerId: string;
    } & PostWaitingListCustomerOrderRequest["waitingListMoveCustomerParams"]
  ) => {
    return api.postWaitingListCustomerOrder({
      ...param,
      waitingListMoveCustomerParams: param,
    });
  }
);

interface WaitingListDetailsPageState {
  getWaitingListByIdError?: string;
  getWaitingListByIdStatus: OperationState;
  waitingListDetails?: WaitingListDetails;
  deleteWaitingListCustomerStatus: OperationState;
  callWaitingListCustomerStatus: OperationState;
  updateWaitingListCustomerCallingStatusStatus: OperationState;
  moveWaitingListCustomerStatus: OperationState;
}

const initialDetailsPageState: WaitingListDetailsPageState = {
  getWaitingListByIdStatus: "UNSUBMITTED",
  deleteWaitingListCustomerStatus: "UNSUBMITTED",
  callWaitingListCustomerStatus: "UNSUBMITTED",
  updateWaitingListCustomerCallingStatusStatus: "UNSUBMITTED",
  moveWaitingListCustomerStatus: "UNSUBMITTED",
};

interface CreateWaitingListFormState {
  error?: string;
  state: OperationState;
}

interface AddWaitingListCustomerFormState {
  error?: string;
  state: OperationState;
}

interface WaitingListState {
  getWaitingListsError?: string;
  getWaitingListsStatus: OperationState;
  waitingLists: WaitingListSummary[];
  deleteWaitingListState: { [id: string]: OperationState };
  waitingListDetailsPageState: { [id: string]: WaitingListDetailsPageState };
  createWaitingListFormState?: CreateWaitingListFormState;
  addWaitingListCustomerFormState: {
    [id: string]: AddWaitingListCustomerFormState;
  };
}

const initialState: WaitingListState = {
  getWaitingListsStatus: "UNSUBMITTED",
  waitingLists: [],
  deleteWaitingListState: {},
  waitingListDetailsPageState: {},
  addWaitingListCustomerFormState: {},
};

const waitingListSlice = createSlice({
  name: "waitingLists",
  initialState: initialState,
  reducers: {
    waitingListDetailsPageMounted(
      state,
      action: PayloadAction<{ id: string }>
    ) {
      state.waitingListDetailsPageState[action.payload.id] =
        initialDetailsPageState;
    },
    waitingListDetailsPageUnmounted(
      state,
      action: PayloadAction<{ id: string }>
    ) {
      delete state.waitingListDetailsPageState[action.payload.id];
    },
    createWaitingListFormMounted(state) {
      state.createWaitingListFormState = {
        state: "UNSUBMITTED",
      };
    },
    createWaitingListFormUnmounted(state) {
      delete state.createWaitingListFormState;
    },
    addWaitingListCustomerFormMounted(
      state,
      action: PayloadAction<{ id: string }>
    ) {
      state.addWaitingListCustomerFormState[action.payload.id] = {
        state: "UNSUBMITTED",
      };
    },
    addWaitingListCustomerFormUnmounted(
      state,
      action: PayloadAction<{ id: string }>
    ) {
      delete state.addWaitingListCustomerFormState[action.payload.id];
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
    builder.addCase(getWaitingListById.pending, (state, action) => {
      if (state.waitingListDetailsPageState[action.meta.arg.id]) {
        delete state.waitingListDetailsPageState[action.meta.arg.id]
          .waitingListDetails;
        state.waitingListDetailsPageState[
          action.meta.arg.id
        ].getWaitingListByIdStatus = "LOADING";
      }
    });
    builder.addCase(getWaitingListById.fulfilled, (state, action) => {
      if (state.waitingListDetailsPageState[action.meta.arg.id]) {
        state.waitingListDetailsPageState[
          action.meta.arg.id
        ].getWaitingListByIdStatus = "SUCCEEDED";
        state.waitingListDetailsPageState[
          action.meta.arg.id
        ].waitingListDetails = action.payload as any;
      }
    });
    builder.addCase(getWaitingListById.rejected, (state, action) => {
      if (state.waitingListDetailsPageState[action.meta.arg.id]) {
        state.waitingListDetailsPageState[
          action.meta.arg.id
        ].getWaitingListByIdError = "検索に失敗しました。";
        state.waitingListDetailsPageState[
          action.meta.arg.id
        ].getWaitingListByIdStatus = "FAILED";
      }
    });

    // 待ちリストの作成
    builder.addCase(createWaitingList.pending, (state, action) => {
      delete state.createWaitingListFormState!.error;
      state.createWaitingListFormState!.state = "LOADING";
    });
    builder.addCase(createWaitingList.fulfilled, (state) => {
      state.createWaitingListFormState!.state = "SUCCEEDED";
    });
    builder.addCase(createWaitingList.rejected, (state) => {
      state.createWaitingListFormState!.error = "登録に失敗しました。";
      state.createWaitingListFormState!.state = "FAILED";
    });

    // 顧客の追加
    builder.addCase(createWaitingListCustomer.pending, (state, action) => {
      delete state.addWaitingListCustomerFormState[action.meta.arg.id].error;
      state.addWaitingListCustomerFormState[action.meta.arg.id].state =
        "LOADING";
    });
    builder.addCase(createWaitingListCustomer.fulfilled, (state, action) => {
      state.addWaitingListCustomerFormState[action.meta.arg.id].state =
        "SUCCEEDED";
    });
    builder.addCase(createWaitingListCustomer.rejected, (state, action) => {
      state.addWaitingListCustomerFormState[action.meta.arg.id].error =
        "登録に失敗しました。";
      state.addWaitingListCustomerFormState[action.meta.arg.id].state =
        "FAILED";
    });

    // 待ちリストの削除
    builder.addCase(deleteWaitingList.fulfilled, (state, action) => {
      state.deleteWaitingListState[action.meta.arg.id] = "SUCCEEDED";
      state.waitingLists = state.waitingLists.filter(
        (e) => e.id !== action.meta.arg.id
      );
    });
    builder.addCase(deleteWaitingList.rejected, (state, action) => {
      state.deleteWaitingListState[action.meta.arg.id] = "FAILED";
    });

    // 顧客の削除
    builder.addCase(deleteWaitingListCustomer.fulfilled, (state, action) => {
      if (state.waitingListDetailsPageState[action.meta.arg.id]) {
        state.waitingListDetailsPageState[
          action.meta.arg.id
        ].deleteWaitingListCustomerStatus = "SUCCEEDED";
      }
      const details =
        state.waitingListDetailsPageState[action.meta.arg.id]
          .waitingListDetails;
      if (details) {
        details.customers = details.customers.filter(
          (e) => e.id !== action.meta.arg.customerId
        );
      }
    });
    builder.addCase(deleteWaitingListCustomer.rejected, (state, action) => {
      if (state.waitingListDetailsPageState[action.meta.arg.id]) {
        state.waitingListDetailsPageState[
          action.meta.arg.id
        ].deleteWaitingListCustomerStatus = "FAILED";
      }
    });

    // 顧客の呼び出し
    builder.addCase(callWaitingListCustomer.fulfilled, (state, action) => {
      if (state.waitingListDetailsPageState[action.meta.arg.id]) {
        state.waitingListDetailsPageState[
          action.meta.arg.id
        ].callWaitingListCustomerStatus = "SUCCEEDED";
      }
      const details =
        state.waitingListDetailsPageState[action.meta.arg.id]
          .waitingListDetails;
      if (details) {
        const customer = details.customers.filter(
          (e) => e.id === action.meta.arg.customerId
        )[0];
        if (customer) {
          customer.status = "CALLING";
        }
      }
    });
    builder.addCase(callWaitingListCustomer.rejected, (state, action) => {
      if (state.waitingListDetailsPageState[action.meta.arg.id]) {
        state.waitingListDetailsPageState[
          action.meta.arg.id
        ].callWaitingListCustomerStatus = "FAILED";
      }
    });

    // 顧客の呼び出し状態の更新
    builder.addCase(
      updateWaitingListCustomerCallingStatus.fulfilled,
      (state, action) => {
        if (state.waitingListDetailsPageState[action.meta.arg.id]) {
          state.waitingListDetailsPageState[
            action.meta.arg.id
          ].updateWaitingListCustomerCallingStatusStatus = "SUCCEEDED";
        }
        const details =
          state.waitingListDetailsPageState[action.meta.arg.id]
            .waitingListDetails;
        if (details) {
          const customer = details.customers.filter(
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
      (state, action) => {
        if (state.waitingListDetailsPageState[action.meta.arg.id]) {
          state.waitingListDetailsPageState[
            action.meta.arg.id
          ].updateWaitingListCustomerCallingStatusStatus = "FAILED";
        }
      }
    );

    // 顧客の並び順更新
    builder.addCase(moveWaitingListCustomer.fulfilled, (state, action) => {
      if (state.waitingListDetailsPageState[action.meta.arg.id]) {
        state.waitingListDetailsPageState[
          action.meta.arg.id
        ].moveWaitingListCustomerStatus = "SUCCEEDED";
      }
      const details =
        state.waitingListDetailsPageState[action.meta.arg.id]
          .waitingListDetails;
      if (details) {
        const customers = details.customers;
        const { customerId, before, after } = action.meta.arg;
        const target = customers.filter((e) => e.id === customerId)[0];
        if (target) {
          customers.splice(customers.indexOf(target), 1);
          if (before) {
            const beforeTarget = customers.filter((e) => e.id === before)[0];
            if (beforeTarget) {
              customers.splice(customers.indexOf(beforeTarget), 0, target);
            }
          }
          if (after) {
            const afterTarget = customers.filter((e) => e.id === after)[0];
            if (afterTarget) {
              customers.splice(customers.indexOf(afterTarget) + 1, 0, target);
            }
          }
        }
      }
    });
    builder.addCase(moveWaitingListCustomer.rejected, (state, action) => {
      if (state.waitingListDetailsPageState[action.meta.arg.id]) {
        state.waitingListDetailsPageState[
          action.meta.arg.id
        ].moveWaitingListCustomerStatus = "FAILED";
      }
    });
  },
});

export const {
  waitingListDetailsPageMounted,
  waitingListDetailsPageUnmounted,
  createWaitingListFormMounted,
  createWaitingListFormUnmounted,
  addWaitingListCustomerFormMounted,
  addWaitingListCustomerFormUnmounted,
} = waitingListSlice.actions;
export default waitingListSlice.reducer;
