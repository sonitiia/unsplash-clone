import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../services/authService";
import { readSession } from "../services/userStorage";
import type { LoginPayload, RegisterPayload, SessionUser } from "../types/auth";
import { loadCollection, resetCollection } from "./collectionSlice";

interface AuthState {
  user: SessionUser | null;
  status: "idle" | "loading";
  error: string | null;
  hydrated: boolean;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
  hydrated: false,
};

export const hydrateAuth = createAsyncThunk(
  "auth/hydrate",
  async (_, { dispatch }) => {
    const session = readSession();
    if (session) {
      dispatch(loadCollection(session.id));
    }
    return session;
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload, { dispatch, rejectWithValue }) => {
    try {
      const session = await authService.register(payload);
      dispatch(loadCollection(session.id));
      return session;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Registration failed",
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { dispatch, rejectWithValue }) => {
    try {
      const session = await authService.login(payload);
      dispatch(loadCollection(session.id));
      return session;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Login failed",
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    authService.logout();
    dispatch(resetCollection());
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrateAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.hydrated = true;
      })
      .addCase(hydrateAuth.rejected, (state) => {
        state.hydrated = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "idle";
        state.error = (action.payload as string) ?? "Registration failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "idle";
        state.error = (action.payload as string) ?? "Login failed";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
