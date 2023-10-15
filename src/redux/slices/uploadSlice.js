import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../axios/axios";

export const uploadImage = createAsyncThunk(
  "upload/uploadImage",
  async (info) => {
    const formData = new FormData();

    formData.append("image", info);
    const { data} = await axios.post("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  }
);

const initialState = {
  files: [],
  statusUploadImage: "",
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
    [uploadImage.pending]: (state, action) => {
      state.statusUploadImage = "LOADING";
    },
    [uploadImage.fulfilled]: (state, action) => {
      state.statusUploadImage = "SUCCESS";
      state.files.push(action.payload);
    },
    [uploadImage.rejected]: (state, action) => {
      state.statusUploadImage = "ERROR";
    },
  },
});

export default uploadSlice.reducer;
