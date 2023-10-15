import { axios } from "../axios/axios";

class chatApi {
  async getAll() {
    window.localStorage.getItem("token");
    return await axios.get(`/dialogs`);
  }

  async uploadImage(info) {
    const formData = new FormData();

    formData.append("image", info);
    const { data } = await axios.post("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }
}

export default new chatApi();
