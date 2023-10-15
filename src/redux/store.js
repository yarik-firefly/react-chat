import { configureStore } from "@reduxjs/toolkit";
import dialogsSlice from "./slices/dialogsSlice";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import uploadSlice from "./slices/uploadSlice";

export const store = configureStore({
  reducer: {
    dialogsSlice,
    authSlice,
    userSlice,
    uploadSlice,
  },
});
