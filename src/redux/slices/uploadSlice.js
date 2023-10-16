import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../axios/axios";

export const upload = createAsyncThunk(
  "upload/uploadImage",
  async (info) => {
    const formData = new FormData();

    formData.append("file", info);
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
  },
});

export default uploadSlice.reducer;
