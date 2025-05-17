import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "src/interface/types";

const initialState: AuthState = {
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated") || "false"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      // For demo purposes, accept any email/password combination
      state.isAuthenticated = true;
      state.user = {
        email: action.payload.email,
        role: "admin",
      };
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;