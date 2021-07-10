import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./api";
import { CreateSessionRequest } from "./api/generated";
import { OperationStatus, User } from "./types";

export const login = createAsyncThunk(
  "auth/loginStatus",
  async (param: CreateSessionRequest["sessionCreationParams"]) => {
    return await api.createSession({ sessionCreationParams: param });
  }
);

export const session = createAsyncThunk("auth/sessionStatus", async () => {
  return await api.getSession();
});

export const logout = createAsyncThunk("auth/logoutStatus", async () => {
  return await api.deleteSession();
});

interface AuthState {
  status: OperationStatus;
  error?: string;
  user?: User;
}

const initialState: AuthState = {
  status: "UNSUBMITTED",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(session.pending, (state) => {
      delete state.user;
      state.status = "LOADING";
    });
    builder.addCase(session.fulfilled, (state, action) => {
      state.status = "SUCCEEDED";
      state.user = action.payload.user;
    });
    builder.addCase(session.rejected, (state) => {
      state.status = "SUCCEEDED";
    });
    builder.addCase(login.pending, (state) => {
      state.status = "LOADING";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "SUCCEEDED";
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "FAILED";
      state.error = (action.payload as any)?.message || "ログインできません";
    });
    builder.addCase(logout.fulfilled, (state) => {
      delete state.user;
      state.status = "SUCCEEDED";
    });
  },
});

export default authSlice.reducer;
