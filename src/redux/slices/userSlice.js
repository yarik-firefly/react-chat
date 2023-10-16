import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../axios/axios";

export const findUsers = createAsyncThunk("users/findUsers", async (name) => {
  const { data } = await (name ? axios.get("user/find?query=" + name) : null);

  return data.user;
});

const initialState = {
  findUsers: [],
  statusFindUser: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [findUsers.pending]: (state, action) => {
      //   state.findUsers = [];
      state.statusFindUser = "LOADING";
    },
    [findUsers.fulfilled]: (state, action) => {
      state.findUsers = action.payload;
      state.statusFindUser = "SUCCESS";
    },
    [findUsers.rejected]: (state, action) => {
      state.findUsers = [];
      state.statusFindUser = "ERROR";
    },
  },
});

// export const { actions } = userSlice;
export default userSlice.reducer;
