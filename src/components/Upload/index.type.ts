import { UploadFile } from "antd";
import { TypeAttachments } from "../Input/Input.type";
import { UploadChangeParam } from "antd/es/upload";
import { ISetState } from "../Input/Input.type";

export interface IUploadImage {
  fileList: UploadFile<TypeAttachments>[];
  handlePreview: (file: UploadFile) => Promise<void>;
  handleChange:
    | ((info: UploadChangeParam<UploadFile<any>>) => void)
    | undefined;
  previewO: ISetState["previewOpen"];
  previewT: ISetState["previewTitle"];
  previewI: ISetState["previewImage"];
  handleCancel: () => void;
}
