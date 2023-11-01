import {
  PayloadAction,
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { axios } from "../../axios/axios";
import socket from "../../core/socket";
import {
  ICreateDialog,
  ICreateDialogResponse,
  IDialog,
  IDialogsState,
  ISendMessageRequest,
  TypeSendMessageResponse,
  ISendMsgResponse,
  Status,
  TypeDialogs,
} from "../../types/slice";
import { RootState } from "../store";
import { AxiosError } from "axios";
import { STATUS_CODES } from "http";

export const getMessages = createAsyncThunk<TypeSendMessageResponse, string>(
  "dialogs/getMessages",
  async (id) => {
    socket.emit("DIALOG:JOIN", id);
    const { data } = await axios.get<TypeSendMessageResponse>(
      "messages?dialog=" + id
    );

    return data;
  }
);

export const getDialogs = createAsyncThunk("dialogs/getDialogs", async () => {
  const { data } = await axios.get<TypeDialogs>(`dialogs`);

  return data.data;
});

export const createDialog = createAsyncThunk<
  ICreateDialogResponse,
  Record<string, string>
>("dialogs/createDialog", async (obj) => {
  const { data } = await axios.post<ICreateDialogResponse>("/dialogs", obj);
  return data;
});

export const sendMessage = createAsyncThunk<
  TypeSendMessageResponse,
  ISendMessageRequest
>("dialogs/sendMessage", async (obj) => {
  const { data } = await axios.post<TypeSendMessageResponse>("/messages", obj);
  return data;
});

export const deleteMessage = createAsyncThunk(
  "dialogs/deleteMessage",
  async (id: string) => {
    axios.delete("/messages?id=" + id);
    return id;
  }
);

const initialState: IDialogsState = {
  dialogs: [
    {
      _id: "",
      author: {
        _id: "",
        email: "",
        fullname: "",
        password: "",
        confirmed: false,
        last_seen: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
        isOnline: false,
        avatar: "",
        id: "",
      },
      partner: {
        _id: "",
        email: "",
        fullname: "",
        password: "",
        confirmed: false,
        last_seen: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
        isOnline: false,
        avatar: "",
        id: "",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0,
      last_message: {
        _id: "",
        text: "",
        dialog: "",
        user: {
          _id: "",
          email: "",
          fullname: "",
          password: "",
          confirmed: false,
          last_seen: "",
          createdAt: new Date(),
          updatedAt: new Date(),
          __v: 0,
          isOnline: false,
          avatar: "",
          id: "",
        },
        readed: false,
        attachments: [""],
        createdAt: "",
        updatedAt: "",
        __v: 0,
      },
    },
  ],
  currentDialogId: undefined,
  messages: [],
  statusMessage: Status.VOID,
  statusDialogs: Status.VOID,
  statusSend: Status.VOID,
  toggle: "DIALOG",
};

const dialogSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<ISendMsgResponse>) {
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
    toggleMenu(state, action: PayloadAction<"DIALOG" | "MENU">) {
      state.toggle = action.payload;
    },
    // deleteMessage(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.pending, (state, action) => {
      state.statusMessage = Status.LOADING;
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages = action.payload.data;
      state.statusMessage = Status.SUCCESS;
      state.currentDialogId = action.payload.dialogId;
    });
    builder.addCase(getMessages.rejected, (state) => {
      state.messages = [];
      state.statusMessage = Status.ERROR;
    });
    //==============================================
    builder.addCase(getDialogs.pending, (state, action) => {
      // state.dialogs = [];
      state.statusDialogs = Status.LOADING;
    });
    builder.addCase(getDialogs.fulfilled, (state, action) => {
      state.dialogs = action.payload;
      state.statusDialogs = Status.SUCCESS;
    });
    builder.addCase(getDialogs.rejected, (state, action) => {
      // state.dialogs = [{}];
      state.statusDialogs = Status.ERROR;
    });
    //===================================================
    builder.addCase(sendMessage.pending, (state, action) => {
      // state.messages = [];
      state.statusSend = Status.LOADING;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      // state.messages.push(action.payload);
      state.statusSend = Status.SUCCESS;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      // state.messages = [];
      state.statusSend = Status.ERROR;
    });
    //=======================================================
    builder.addCase(deleteMessage.pending, (state, action) => {
      // state.messages = [];
    });
    builder.addCase(deleteMessage.fulfilled, (state, action) => {
      state.messages = state.messages.filter((el) => {
        return el._id !== action.payload;
      });
    });
    builder.addCase(deleteMessage.rejected, (state, action) => {});
    //=============================================================
    builder.addCase(createDialog.pending, (state, action) => {});
    builder.addCase(createDialog.fulfilled, (state, action) => {});
    builder.addCase(createDialog.rejected, (state, action) => {});
  },
});

export const { addMessage, createNewDialog, dialogIdToNull, toggleMenu } =
  dialogSlice.actions;

export default dialogSlice.reducer;
