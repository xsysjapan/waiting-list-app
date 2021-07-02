import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./api";
import { CreateSessionRequest } from "./api/generated";
import { User } from "./types";

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
  state: "INITIALIZING" | "LOADING" | "LOADED";
  error?: string;
  user?: User;
}

const initialState: AuthState = {
  state: "INITIALIZING",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(session.pending, (state) => {
      delete state.user;
      state.state = "LOADING";
    });
    builder.addCase(session.fulfilled, (state, action) => {
      state.state = "LOADED";
      state.user = action.payload.user;
    });
    builder.addCase(session.rejected, (state) => {
      state.state = "LOADED";
    });
    builder.addCase(login.pending, (state) => {
      state.state = "LOADING";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.state = "LOADED";
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.state = "LOADED";
      state.error = (action.payload as any)?.message || "ログインできません";
    });
    builder.addCase(logout.fulfilled, (state) => {
      delete state.user;
      state.state = "LOADED";
    });
  },
});

export default authSlice.reducer;
