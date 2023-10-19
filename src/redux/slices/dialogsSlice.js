import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { axios } from "../../axios/axios";
import socket from "../../core/socket";

export const getMessages = createAsyncThunk(
  "dialogs/getMessages",
  async (id) => {
    socket.emit("DIALOG:JOIN", id);
    const { data } = await axios.get("messages?dialog=" + id);

    return data;
  }
);

export const getDialogs = createAsyncThunk("dialogs/getDialogs", async () => {
  const { data } = await axios.get(`dialogs`);

  return data.data;
});

export const createDialog = createAsyncThunk(
  "dialogs/createDialog",
  async (obj, { dispatch, getState }) => {
    const { authSlice } = await getState();
    const { infoMe } = authSlice;
    axios.post("/dialogs", obj);
  }
);

export const sendMessage = createAsyncThunk(
  "dialogs/sendMessage",
  async (obj, { getState, dispatch }) => {
    const { dialogsSlice } = getState();
    const { currentDialogId } = dialogsSlice;
    axios.post("/messages", obj);
  }
);

export const deleteMessage = createAsyncThunk(
  "dialogs/deleteMessage",
  async (id) => {
    axios.delete("/messages?id=" + id);

    return id;
  }
);

const initialState = {
  dialogs: [],
  currentDialogId: undefined,
  messages: [],
  statusMessage: "",
  statusDialogs: "",
  statusSend: "",
  toggle: "DIALOG",
};

const dialogSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    addMessage(state, action) {
      if (action.payload.dialog._id === state.currentDialogId) {
        state.messages.push(action.payload);
      }
    },
    createNewDialog(state, action) {
      state.dialogs.push(action.payload.dialog);
    },
    dialogIdToNull(state) {
      state.currentDialogId = undefined;
    },
    toggleMenu(state, action) {
      state.toggle = action.payload;
    },
    // deleteMessage(state, action) {},
  },
  extraReducers: {
    [getMessages.pending]: (state, action) => {
      // state.messages = [];
      state.statusMessage = "LOADING";
    },
    [getMessages.fulfilled]: (state, action) => {
      state.messages = action.payload.data;
      state.statusMessage = "SUCCESS";
      state.currentDialogId = action.payload.dialogId;
    },
    [getMessages.rejected]: (state) => {
      state.messages = [];
      state.statusMessage = "ERROR";
    },
    //==============================================
    [getDialogs.pending]: (state, action) => {
      // state.dialogs = [];
      state.statusDialogs = "LOADING";
    },
    [getDialogs.fulfilled]: (state, action) => {
      state.dialogs = action.payload;
      state.statusDialogs = "SUCCESS";
    },
    [getDialogs.rejected]: (state, action) => {
      state.dialogs = [];
      state.statusDialogs = "ERROR";
    },
    //===================================================
    [sendMessage.pending]: (state, action) => {
      // state.messages = [];
      state.statusSend = "LOADING";
    },
    [sendMessage.fulfilled]: (state, action) => {
      // state.messages.push(action.payload);
      state.statusSend = "SUCCESS";
    },
    [sendMessage.rejected]: (state, action) => {
      // state.messages = [];
      state.statusSend = "ERROR";
    },
    //=======================================================
    [deleteMessage.pending]: (state, action) => {
      // state.messages = [];
    },
    [deleteMessage.fulfilled]: (state, action) => {
      state.messages = state.messages.filter((el) => {
        return el._id !== action.payload;
      });
    },
    [deleteMessage.rejected]: (state, action) => {},
  },
});

export const { addMessage, createNewDialog, dialogIdToNull, toggleMenu } =
  dialogSlice.actions;

export default dialogSlice.reducer;
