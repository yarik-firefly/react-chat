// export interface IPartner {
//   _id: string;
//   author: IPartnerOrAuthor;
//   partner: IPartnerOrAuthor;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
//   last_message: string;
// }

import { IAuthorAndPartner, ILastMessage } from "@app/types/slice";

export interface IPartnerOrAuthor {
  fullname: string;
  isOnline: boolean;
}

export interface IPartner {
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
  author: IPartnerOrAuthor;
  partner: IPartnerOrAuthor;
  last_message: string;
}

export type TypeDialogObj = {
  _id: string;
  author: IAuthorAndPartner;
  partner: IAuthorAndPartner;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  last_message: ILastMessage;
};
