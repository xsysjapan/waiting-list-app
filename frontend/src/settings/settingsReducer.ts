import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../shared/api";
import { OperationState } from "../shared/types";

export const getSmsMessageTemplate = createAsyncThunk(
  "settings/getSmsMessageTemplateStatus",
  () => api.getConfiguration({ key: "sms.messages.nextAnnouncement" })
);

export const putSmsMessageTemplate = createAsyncThunk(
  "settings/putSmsMessageTemplateStatus",
  (params: { value: string }) =>
    api.putConfiguration({
      key: "sms.messages.nextAnnouncement",
      configurationModificationParams: params,
    })
);

interface SettingsState {
  getSmsMessageTemplateError?: string;
  getSmsMessageTemplateStatus: OperationState;
  putSmsMessageTemplateError?: string;
  putSmsMessageTemplateStatus: OperationState;
  values: { smsMessageTemplate: string };
}

const initialState: SettingsState = {
  getSmsMessageTemplateStatus: "UNSUBMITTED",
  putSmsMessageTemplateStatus: "UNSUBMITTED",
  values: {
    smsMessageTemplate: "",
  },
};

const waitingListSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSmsMessageTemplate.pending, (state) => {
      state.getSmsMessageTemplateStatus = "LOADING";
    });
    builder.addCase(getSmsMessageTemplate.fulfilled, (state, action) => {
      state.getSmsMessageTemplateStatus = "SUCCEEDED";
      state.values.smsMessageTemplate = action.payload.value;
    });
    builder.addCase(getSmsMessageTemplate.rejected, (state) => {
      state.getSmsMessageTemplateStatus = "FAILED";
      state.getSmsMessageTemplateError = "検索に失敗しました。";
    });

    builder.addCase(putSmsMessageTemplate.pending, (state) => {
      delete state.putSmsMessageTemplateError;
      state.putSmsMessageTemplateStatus = "LOADING";
    });
    builder.addCase(putSmsMessageTemplate.fulfilled, (state, action) => {
      state.putSmsMessageTemplateStatus = "SUCCEEDED";
    });
    builder.addCase(putSmsMessageTemplate.rejected, (state) => {
      state.putSmsMessageTemplateStatus = "FAILED";
      state.putSmsMessageTemplateError = "検索に失敗しました。";
    });
  },
});

export default waitingListSlice.reducer;
