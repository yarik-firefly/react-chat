import { IUploadData } from "@app/components/MyPage/index.type";
import { axios } from "../axios/axios";
import { TypeUploadedData } from "@app/components/Input/Input.type";
import { IUploadResponse } from "@app/types/slice";

class chatApi {
  async getAll() {
    window.localStorage.getItem("token");
    return await axios.get(`/dialogs`);
  }

  async upload(info: TypeUploadedData) {
    const formData = new FormData();

    //@ts-ignore
    formData.append("file", info);
    const { data } = await axios.post<IUploadResponse>(
      "/files",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  }
}

export default new chatApi();
