import { IAuthorAndPartner } from "@app/types/slice";

export interface ICorrespondenceItem {
  isMy: boolean;
  text: string;
  _id: string;
  createdAt: string;
  readed: boolean;
  attachments: any;
  isTyping: boolean;
  user: {
    avatar: string;
  };
}

export type TypeAttachments = {
  ext?: string;
  url: string;
};



export interface IDialogItem {
    author: IAuthorAndPartner;
    partner: IAuthorAndPartner;
    createdAt: Date;
    _id: string;
    isSuccess: boolean;
    last_message: {
      text: string;
    };
    selectDialog: boolean;
  }
