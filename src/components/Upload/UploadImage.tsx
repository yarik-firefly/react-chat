import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { IUploadImage } from "./index.type";
const getBase64 = (file: RcFile) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const UploadImage = ({
  fileList,
  handlePreview,
  handleChange,
  previewO,
  previewT,
  previewI,
  handleCancel,
}: IUploadImage) => {
  return (
    <>
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      ></Upload>
      <Modal
        open={previewO}
        title={previewT}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewI}
        />
      </Modal>
    </>
  );
};
export default UploadImage;
