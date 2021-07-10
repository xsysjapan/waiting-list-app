import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTimeFormatter, LocalDate } from "js-joda";
import api from "../shared/api";
import {
  CreateWaitingListRequest,
  PostWaitingListCustomerCallRequest,
  PostWaitingListCustomerOrderRequest,
  PostWaitingListCustomerRequest,
  PutWaitingListCustomerRequest,
  PutWaitingListCustomerStatusRequest,
} from "../shared/api/generated";
import {
  OperationStatus,
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

export const getDefaultWaitingListName = createAsyncThunk(
  "waitingLists/getDefaultWaitingListNameStatus",
  () =>
    api.getDefaultWaitingListName({
      preferedName: LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE),
    })
);

export const createWaitingList = createAsyncThunk(
  "waitingLists/createWaitingListStatus",
  (param: CreateWaitingListRequest["waitingListCreationParams"]) => {
    return api.createWaitingList({ waitingListCreationParams: param });
  }
);

export const editWaitingListName = createAsyncThunk(
  "waitingLists/editWaitingListNameStatus",
  (param: { id: string; name: string }) => {
    return api.putWaitingList({
      id: param.id,
      waitingListModificationParams: { name: param.name },
    });
  }
);

export const editWaitingListActive = createAsyncThunk(
  "waitingLists/editWaitingListActiveStatus",
  (param: { id: string; active: boolean }) => {
    return api.putWaitingList({
      id: param.id,
      waitingListModificationParams: { active: param.active },
    });
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

export const editWaitingListCustomer = createAsyncThunk(
  "waitingLists/editWaitingListCustomerStatus",
  (
    param: {
      id: string;
      customerId: string;
    } & PutWaitingListCustomerRequest["waitingListCustomerModificationParams"]
  ) => {
    return api.putWaitingListCustomer({
      id: param.id,
      customerId: param.customerId,
      waitingListCustomerModificationParams: param,
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
  getWaitingListByIdStatus: OperationStatus;
  waitingListDetails?: WaitingListDetails;
  editWaitingListActiveStatus: OperationStatus;
  deleteWaitingListCustomerStatus: OperationStatus;
  callWaitingListCustomerStatus: OperationStatus;
  updateWaitingListCustomerCallingStatusStatus: OperationStatus;
  moveWaitingListCustomerStatus: OperationStatus;
}

const initialDetailsPageState: WaitingListDetailsPageState = {
  getWaitingListByIdStatus: "UNSUBMITTED",
  editWaitingListActiveStatus: "UNSUBMITTED",
  deleteWaitingListCustomerStatus: "UNSUBMITTED",
  callWaitingListCustomerStatus: "UNSUBMITTED",
  updateWaitingListCustomerCallingStatusStatus: "UNSUBMITTED",
  moveWaitingListCustomerStatus: "UNSUBMITTED",
};

interface CreateWaitingListFormState {
  error?: string;
  status: OperationStatus;
}

interface EditWaitingListFormState {
  error?: string;
  status: OperationStatus;
}

interface AddWaitingListCustomerFormState {
  error?: string;
  status: OperationStatus;
}

interface EditWaitingListCustomerFormState {
  error?: string;
  status: OperationStatus;
}

interface WaitingListState {
  getWaitingListsError?: string;
  getWaitingListsStatus: OperationStatus;
  getDefaultWaitingListNameStatus: OperationStatus;
  defautlWaitingListName?: string;
  waitingLists: WaitingListSummary[];
  deleteWaitingListState: { [id: string]: OperationStatus };
  waitingListDetailsPageState: { [id: string]: WaitingListDetailsPageState };
  createWaitingListFormState?: CreateWaitingListFormState;
  editWaitingListFormState: {
    [id: string]: EditWaitingListFormState;
  };
  addWaitingListCustomerFormState: {
    [id: string]: AddWaitingListCustomerFormState;
  };
  editWaitingListCustomerFormState: {
    [id: string]: EditWaitingListCustomerFormState;
  };
}

const initialState: WaitingListState = {
  getWaitingListsStatus: "UNSUBMITTED",
  getDefaultWaitingListNameStatus: "UNSUBMITTED",
  waitingLists: [],
  deleteWaitingListState: {},
  waitingListDetailsPageState: {},
  editWaitingListFormState: {},
  addWaitingListCustomerFormState: {},
  editWaitingListCustomerFormState: {},
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
        status: "UNSUBMITTED",
      };
    },
    createWaitingListFormUnmounted(state) {
      delete state.createWaitingListFormState;
    },
    editWaitingListFormMounted(state, action: PayloadAction<{ id: string }>) {
      state.editWaitingListFormState[action.payload.id] = {
        status: "UNSUBMITTED",
      };
    },
    editWaitingListFormUnmounted(state, action: PayloadAction<{ id: string }>) {
      delete state.editWaitingListFormState[action.payload.id];
    },
    addWaitingListCustomerFormMounted(
      state,
      action: PayloadAction<{ id: string }>
    ) {
      state.addWaitingListCustomerFormState[action.payload.id] = {
        status: "UNSUBMITTED",
      };
    },
    addWaitingListCustomerFormUnmounted(
      state,
      action: PayloadAction<{ id: string }>
    ) {
      delete state.addWaitingListCustomerFormState[action.payload.id];
    },
    editWaitingListCustomerFormMounted(
      state,
      action: PayloadAction<{ id: string; customerId: string }>
    ) {
      state.editWaitingListCustomerFormState[
        `${action.payload.id}:${action.payload.customerId}`
      ] = {
        status: "UNSUBMITTED",
      };
    },
    editWaitingListCustomerFormUnmounted(
      state,
      action: PayloadAction<{ id: string; customerId: string }>
    ) {
      delete state.editWaitingListCustomerFormState[
        `${action.payload.id}:${action.payload.customerId}`
      ];
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
    // 既定待ちリスト名の取得
    builder.addCase(getDefaultWaitingListName.pending, (state) => {
      state.getDefaultWaitingListNameStatus = "LOADING";
    });
    builder.addCase(getDefaultWaitingListName.fulfilled, (state, action) => {
      state.getDefaultWaitingListNameStatus = "SUCCEEDED";
      state.defautlWaitingListName = action.payload.value;
    });
    builder.addCase(getDefaultWaitingListName.rejected, (state) => {
      state.getDefaultWaitingListNameStatus = "FAILED";
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
      state.createWaitingListFormState!.status = "LOADING";
    });
    builder.addCase(createWaitingList.fulfilled, (state) => {
      state.createWaitingListFormState!.status = "SUCCEEDED";
    });
    builder.addCase(createWaitingList.rejected, (state) => {
      state.createWaitingListFormState!.error = "登録に失敗しました。";
      state.createWaitingListFormState!.status = "FAILED";
    });

    // 待ちリストの有効化・無効化
    builder.addCase(editWaitingListActive.fulfilled, (state, action) => {
      state.waitingListDetailsPageState[
        action.meta.arg.id
      ].editWaitingListActiveStatus = "SUCCEEDED";

      const details =
        state.waitingListDetailsPageState[action.meta.arg.id]
          .waitingListDetails;
      if (details) {
        details.active = action.meta.arg.active;
      }
    });
    builder.addCase(editWaitingListActive.rejected, (state, action) => {
      state.waitingListDetailsPageState[
        action.meta.arg.id
      ].editWaitingListActiveStatus = "FAILED";
    });

    // 待ちリスト名の編集
    builder.addCase(editWaitingListName.pending, (state, action) => {
      delete state.editWaitingListFormState[action.meta.arg.id].error;
      state.editWaitingListFormState[action.meta.arg.id].status = "LOADING";
    });
    builder.addCase(editWaitingListName.fulfilled, (state, action) => {
      state.editWaitingListFormState[action.meta.arg.id].status = "SUCCEEDED";
    });
    builder.addCase(editWaitingListName.rejected, (state, action) => {
      state.editWaitingListFormState[action.meta.arg.id].error =
        "登録に失敗しました。";
      state.editWaitingListFormState[action.meta.arg.id].status = "FAILED";
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

    // 顧客の追加
    builder.addCase(createWaitingListCustomer.pending, (state, action) => {
      delete state.addWaitingListCustomerFormState[action.meta.arg.id].error;
      state.addWaitingListCustomerFormState[action.meta.arg.id].status =
        "LOADING";
    });
    builder.addCase(createWaitingListCustomer.fulfilled, (state, action) => {
      state.addWaitingListCustomerFormState[action.meta.arg.id].status =
        "SUCCEEDED";
    });
    builder.addCase(createWaitingListCustomer.rejected, (state, action) => {
      state.addWaitingListCustomerFormState[action.meta.arg.id].error =
        "登録に失敗しました。";
      state.addWaitingListCustomerFormState[action.meta.arg.id].status =
        "FAILED";
    });

    // 顧客の編集
    builder.addCase(editWaitingListCustomer.pending, (state, action) => {
      delete state.editWaitingListCustomerFormState[
        `${action.meta.arg.id}:${action.meta.arg.customerId}`
      ].error;
      state.editWaitingListCustomerFormState[
        `${action.meta.arg.id}:${action.meta.arg.customerId}`
      ].status = "LOADING";
    });
    builder.addCase(editWaitingListCustomer.fulfilled, (state, action) => {
      state.editWaitingListCustomerFormState[
        `${action.meta.arg.id}:${action.meta.arg.customerId}`
      ].status = "SUCCEEDED";
    });
    builder.addCase(editWaitingListCustomer.rejected, (state, action) => {
      state.editWaitingListCustomerFormState[
        `${action.meta.arg.id}:${action.meta.arg.customerId}`
      ].status = "FAILED";
      state.editWaitingListCustomerFormState[
        `${action.meta.arg.id}:${action.meta.arg.customerId}`
      ].error = "登録に失敗しました。";
      state.editWaitingListFormState[action.meta.arg.id].status = "FAILED";
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
          customer.lastCalled = new Date();
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
  editWaitingListFormMounted,
  editWaitingListFormUnmounted,
  addWaitingListCustomerFormMounted,
  addWaitingListCustomerFormUnmounted,
  editWaitingListCustomerFormMounted,
  editWaitingListCustomerFormUnmounted,
} = waitingListSlice.actions;
export default waitingListSlice.reducer;
