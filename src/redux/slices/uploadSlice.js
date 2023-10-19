import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../axios/axios";

export const upload = createAsyncThunk("upload/uploadImage", async (info) => {
  const formData = new FormData();

  formData.append("file", info);
  const { data } = await axios.post("files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
});

export const uploadAvatar = createAsyncThunk(
  "upload/uploadAvatar",
  async (info, { getState }) => {
    const {
      authSlice: { infoMe },
    } = getState();
    const formData = new FormData();

    formData.append("file", info);
    const { data } = await axios.post("avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    infoMe.avatar = data;

    return data;
  }
);

const initialState = {
  files: [],
  statusUploadImage: "",
  avatar: "",
  statusAvatar: "",
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    addImage(state, action) {
      state.files.push(action.payload);
    },
  },
  extraReducers: {
    [upload.pending]: (state, action) => {
      state.statusUploadImage = "LOADING";
    },
    [upload.fulfilled]: (state, action) => {
      state.statusUploadImage = "SUCCESS";
      state.files.push(action.payload);
    },
    [upload.rejected]: (state, action) => {
      state.statusUploadImage = "ERROR";
    },
    //========================================
    [uploadAvatar.pending]: (state, action) => {
      state.statusAvatar = "LOADING";
    },
    [uploadAvatar.fulfilled]: (state, action) => {
      state.statusAvatar = "SUCCESS";
      state.avatar = action.payload;
    },
    [uploadAvatar.rejected]: (state, action) => {
      state.statusAvatar = "ERROR";
    },
  },
});

export default uploadSlice.reducer;
