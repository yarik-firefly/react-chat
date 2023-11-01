import { UploadFile } from "antd";

export type TypeAttachments = {
  uid: number;
  name: string;
  status: string;
  url: string;
};

export interface ISetState {
  previewOpen: boolean;
  previewImage: string;
  previewTitle: string;
  fileList: UploadFile<TypeAttachments>[];
}

export type TypeUploaded = {
  uid: number | string;
  name: string;
  status: string;
  url?: string;
};

export type TypeUploadedData = {
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  webkitRelativePath: string;
  size: number;
  type: string;
};

export interface IUploadData {
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
