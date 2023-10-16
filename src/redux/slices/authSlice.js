import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../axios/axios";

export const register = createAsyncThunk("auth/register", async (data) => {
  const { info } = await axios.post("/register", data);

  return info;
});

export const login = createAsyncThunk(
  "auth/login",
  async (data, { dispatch }) => {
    const { data: info, status } = await axios.post("login", data);

    window.localStorage.setItem("token", info.token);
    dispatch(getMe());
    dispatch(isAuth(true));
    return info;
  }
);

export const getMe = createAsyncThunk("auth/getMe", async (_, { dispatch }) => {
  const { data } = await axios.get("/auth/me");
  dispatch(isAuth(true));
  return data.data;
});

export const verifyUser = createAsyncThunk("auth/verifyUser", async (hash) => {
  const { data } = await axios.get("user/verify?hash=" + hash);
  return data;
});

const initialState = {
  auth: false,
  infoMe: [],
  infoUser: [],
  statusRegister: "",
  statusLogin: "",
  statusMe: "",
  statusVerify: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isAuth(state, action) {
      state.auth = action.payload;
    },
  },
  extraReducers: {
    [register.pending]: (state, action) => {
      state.statusRegister = "LOADING";
    },
    [register.fulfilled]: (state, action) => {
      state.statusRegister = "SUCCESS";
    },
    [register.rejected]: (state, action) => {
      state.statusRegister = "ERROR";
    },
    //============================================
    [login.pending]: (state, action) => {
      state.statusLogin = "LOADING";
    },
    [login.fulfilled]: (state, action) => {
      state.statusLogin = "SUCCESS";
      state.auth = true;
      window.localStorage.setItem("token", action.payload.token);
    },
    [login.rejected]: (state, action) => {
      state.statusLogin = "ERROR";
      state.auth = false;
    },
    //===============================================
    [getMe.pending]: (state, action) => {
      state.statusMe = "LOADING";
    },
    [getMe.fulfilled]: (state, action) => {
      state.statusMe = "SUCCESS";
      state.auth = true;
      state.infoMe = action.payload;
    },
    [getMe.rejected]: (state, action) => {
      state.statusMe = "ERROR";
      state.auth = false;
    },
    //========================================
    [verifyUser.pending]: (state, action) => {
      state.statusVerify = "LOADING";
    },
    [verifyUser.fulfilled]: (state, action) => {
      state.statusVerify = "SUCCESS";
    },
    [verifyUser.rejected]: (state, action) => {
      state.statusVerify = "ERROR";
    },
  },
});

export const { isAuth } = authSlice.actions;

export default authSlice.reducer;
