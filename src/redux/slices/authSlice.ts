import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../axios/axios";
import {
  IAuthState,
  ILoginRequest,
  IRegisterResponse,
  Status,
  TypeInfoMe,
} from "../../types/slice";
import { RootState } from "../store";

const empty = {
  avatar: "",
  _id: "",
  email: "",
  fullname: "",
  confirmed: false,
  last_seen: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  __v: 0,
  isOnline: false,
};

export const register = createAsyncThunk<
  IRegisterResponse[],
  Record<string, string>
>("auth/register", async (info) => {
  const { data } = await axios.post<IRegisterResponse[]>("/register", info);

  return data;
});

export const login = createAsyncThunk(
  "auth/login",
  async (data: ILoginRequest, { dispatch }) => {
    const { data: info } = await axios.post<IRegisterResponse>("login", data);

    window.localStorage.setItem("token", info && (info.token as string));
    dispatch(getMe());
    dispatch(isAuth(true));
    return info;
  }
);

export const getMe = createAsyncThunk<TypeInfoMe["data"]>(
  "auth/getMe",
  async () => {
      const { data } = await axios.get<TypeInfoMe>("/auth/me");
      // dispatch(isAuth(true));
      return data.data;
    
  }
);

export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (hash: string) => {
    const { data } = await axios.get("user/verify?hash=" + hash);
    return data;
  }
);

const initialState: IAuthState = {
  auth: false,
  infoMe: empty,
  infoUser: [],
  statusRegister: Status.VOID,
  statusLogin: Status.VOID,
  statusMe: Status.VOID,
  statusVerify: Status.VOID,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isAuth(state, action: PayloadAction<boolean>) {
      state.auth = action.payload;
    },
    changeAvatar(state, action: PayloadAction<string>) {
      state.infoMe.avatar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.statusRegister = Status.LOADING;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.statusRegister = Status.SUCCESS;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.statusRegister = Status.ERROR;
    });
    //=========================================================
    builder.addCase(login.pending, (state, action) => {
      state.statusLogin = Status.LOADING;
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<IRegisterResponse>) => {
        state.statusLogin = Status.SUCCESS;
        state.auth = true;
        window.localStorage.setItem("token", action.payload.token as string);
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      state.statusLogin = Status.ERROR;
      state.auth = false;
    });
    //============================================================
    builder.addCase(getMe.pending, (state, action) => {
      state.statusMe = Status.LOADING;
      state.infoMe = empty;
    });
    builder.addCase(
      getMe.fulfilled,
      (state, action: PayloadAction<TypeInfoMe["data"]>) => {
        state.statusMe = Status.SUCCESS;
        state.auth = true;
        state.infoMe = action.payload;
      }
    );
    builder.addCase(getMe.rejected, (state, action) => {
      state.statusMe = Status.ERROR;
      state.auth = false;
      state.infoMe = empty;
    });
    //==============================================================
    builder.addCase(verifyUser.pending, (state, action) => {
      state.statusVerify = Status.LOADING;
    });
    builder.addCase(verifyUser.fulfilled, (state, action) => {
      state.statusVerify = Status.SUCCESS;
    });
    builder.addCase(verifyUser.rejected, (state, action) => {
      state.statusVerify = Status.ERROR;
    });
  },
});

// export const selectAuth = (state: RootState) => state.authSlice

export const { isAuth, changeAvatar } = authSlice.actions;

export default authSlice.reducer;
