// AUTH SLICE

import { IUploadData } from "@app/components/MyPage/index.type";

export type TypeInfoMe = {
  status: string,
  data: {
    avatar: string | undefined;
    _id: string;
    email: string;
    fullname: string;
    confirmed: boolean;
    last_seen: Date;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    isOnline: boolean;
  };
};

export interface IAuthorAndPartner {
  _id: string;
  email: string;
  fullname: string;
  password: string;
  confirmed: boolean;
  last_seen: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  isOnline: boolean;
  avatar: string;
  id: string;
}

export type TypeAuthorAndPartner = {
  _id: string;
  email: string;
  fullname: string;
  password: string;
  confirmed: boolean;
  last_seen: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isOnline: boolean;
  avatar: string;
  id: string;
};

export type TypeFindUser = {
  data: {
    user: TypeAuthorAndPartner[];
  };
};

export interface IRegisterResponse {
  email: string;
  fullname: string;
  confirmed: boolean;
  confirm_hash: string;
  last_seen: string;
  isOnline: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token?: string | undefined;
}

export interface ILastMessage {
  _id: string;
  text: string;
  dialog: string;
  user: IAuthorAndPartner;
  readed: boolean;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IAuthState {
  auth: boolean;
  infoMe: TypeInfoMe["data"];
  infoUser: {};
  statusRegister: Status.LOADING | Status.SUCCESS | Status.ERROR | Status.VOID;
  statusLogin: Status.LOADING | Status.SUCCESS | Status.ERROR | Status.VOID;
  statusMe: Status.LOADING | Status.SUCCESS | Status.ERROR | Status.VOID;
  statusVerify: Status.LOADING | Status.SUCCESS | Status.ERROR | Status.VOID;
}

// DIALOGS SLICE

export const enum Status {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  VOID = "",
}

export interface IDialogsState {
  dialogs: TypeDialogs["data"];
  currentDialogId: string | undefined;
  messages: TypeMessages[];
  statusMessage: Status.LOADING | Status.SUCCESS | Status.ERROR | Status.VOID;
  statusDialogs: Status.LOADING | Status.SUCCESS | Status.ERROR | Status.VOID;
  statusSend: Status.LOADING | Status.SUCCESS | Status.ERROR | Status.VOID;
  toggle: "DIALOG" | "MENU";
}

export type TypeDialogs = {
  data: [
    {
      _id: string;
      author: IAuthorAndPartner;
      partner: IAuthorAndPartner;
      createdAt: Date;
      updatedAt: Date;
      __v: number;
      last_message: ILastMessage;
    }
  ];
};

export interface ICreateDialog {
  _id: string;
  author: string | IAuthorAndPartner;
  partner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  last_message: ILastMessage;
}

export interface ICreateDialogResponse {
  status: string;
  dialog: ICreateDialog;
}

export interface IDialog {
  _id: string;
  author: string;
  partner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  last_message: string;
}

export interface ISendMessageRequest {
  text: string;
  dialogId: string;
  attachments?: (string | number)[];
}

export interface ISendMsgResponse {
  text: string;
  dialog: IDialog;
  user: IAuthorAndPartner;
  readed: boolean;
  attachments: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type TypeSendMessageResponse = {
  status: string;
  dialogId: string;
  data: ISendMsgResponse[];
};

export type TypeMessages = {
  _id: string;
  text: string;
  dialog: IDialog;
  readed: boolean;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  user: IAuthorAndPartner;
};

// LOGIN

export interface ILoginRequest {
  email: string;
  password: string;
}

// UPLAOD

export interface IUploadState {
  files: [IUploadResponse["data"]];
  statusUploadImage:
    | Status.ERROR
    | Status.LOADING
    | Status.SUCCESS
    | Status.VOID;
  avatar: IUploadResponse["data"];
  statusAvatar: Status.ERROR | Status.LOADING | Status.SUCCESS | Status.VOID;
}





export interface IUploadResponse {
  data: {
    url: string;
    size: number;
    filename: string;
    ext: string;
    user: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

// USERS SLICE

export interface IUsersState {
  findUsers: TypeAuthorAndPartner[];
  statusFindUser: Status;
}
