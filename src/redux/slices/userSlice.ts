import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../axios/axios";
import {
  IAuthorAndPartner,
  IUsersState,
  Status,
  TypeAuthorAndPartner,
  TypeFindUser,
} from "../../types/slice";

export const findUsers = createAsyncThunk<
  TypeAuthorAndPartner[],
  string | undefined
>("users/findUsers", async (name) => {
  const { data } = await axios.get<TypeFindUser["data"]>(
    "user/find?query=" + name
  );

  return data.user;
});

const initialState: IUsersState = {
  findUsers: [
    {
      _id: "",
      email: "",
      fullname: "",
      password: "",
      confirmed: false,
      last_seen: "",
      createdAt: "",
      updatedAt: "",
      __v: 0,
      isOnline: false,
      avatar: "",
      id: "",
    },
  ],
  statusFindUser: Status.VOID,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findUsers.pending, (state, action) => {
      state.statusFindUser = Status.LOADING;
    });
    builder.addCase(findUsers.fulfilled, (state, action) => {
      state.findUsers = action.payload;
      state.statusFindUser = Status.SUCCESS;
    });
    builder.addCase(findUsers.rejected, (state, action) => {
      state.findUsers = [];
      state.statusFindUser = Status.ERROR;
    });
  },
});

// export const { actions } = userSlice;
export default userSlice.reducer;
