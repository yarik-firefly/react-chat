import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../axios/axios";
import { UploadProps } from "antd";
import { IUploadData } from "../../components/MyPage/index.type";
import { RootState } from "../store";
import { IUploadResponse, IUploadState, Status } from "../../types/slice/index";

export const uploadAvatar = createAsyncThunk<
  IUploadResponse["data"],
  UploadProps<IUploadData["file"]>
>(
  "upload/uploadAvatar",
  async (info: UploadProps<IUploadData["file"]>, { getState }) => {
    const {
      authSlice: { infoMe },
    } = getState() as RootState;
    const formData = new FormData();

    formData.append("file", info as Blob);
    const { data } = await axios.post<IUploadResponse["data"]>(
      "avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    infoMe.avatar = data.url;

    return data;
  }
);

const initialState: IUploadState = {
  files: [
    {
      url: "",
      size: 0,
      filename: "",
      ext: "",
      user: "",
      _id: "",
      createdAt: "",
      updatedAt: "",
      __v: 0,
    },
  ],
  statusUploadImage: Status.VOID,
  avatar: {
    url: "",
    size: 0,
    filename: "",
    ext: "",
    user: "",
    _id: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  },
  statusAvatar: Status.VOID,
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadAvatar.pending, (state, action) => {
      state.statusAvatar = Status.LOADING;
    });
    builder.addCase(uploadAvatar.fulfilled, (state, action) => {
      state.statusAvatar = Status.SUCCESS;
      state.avatar = action.payload;
    });
    builder.addCase(uploadAvatar.rejected, (state, action) => {
      state.statusAvatar = Status.ERROR;
    });
  },
});

export default uploadSlice.reducer;
