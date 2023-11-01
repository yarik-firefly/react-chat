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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['items.dates'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
