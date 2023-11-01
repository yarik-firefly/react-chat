import React, { ReactNode } from "react";
import { LinkOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import "./MyPage.scss";
import "../../pages/Home.scss";
import { Upload, UploadProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { uploadAvatar } from "../../redux/slices/uploadSlice";
import socket from "../../core/socket";
import Loading from "../Loading";
import { AppDispatch, RootState } from "@app/redux/store";
import { TypeUploadedData } from "../Input/Input.type";
import { IUploadData } from "./index.type";

const MyPage = () => {
  const [url, setUrl] = React.useState<string>("");

  React.useEffect(() => {
    setUrl(infoMe.avatar as string);
    socket.on("CHANGE:AVATAR", handleChangeAvatar);

    return () => {
      socket.removeListener("CHANGE:AVATAR", handleChangeAvatar);
    };
  }, []);

  const onUploadAvatar = async (obj: UploadProps<IUploadData>) => {
    //@ts-ignore
    dispatch(uploadAvatar(obj.file)).then(({ payload }) => {});
  };

  const { infoMe } = useSelector((state: RootState) => state.authSlice);
  const { statusAvatar } = useSelector((state: RootState) => state.uploadSlice);

  const handleChangeAvatar = (url: string) => {
    setUrl(url);
  };

  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="my-page-wrap">
      <div className="my-page-wrap__avatar">
        {statusAvatar === "LOADING" ? (
          <div id="center">
            <Loading dialog={false} />
          </div>
        ) : (
          <>
            <img src={url} alt="avatar" />
            <div className="my-page-wrap__info">
              <div>{infoMe.fullname}</div>
              <div></div>
            </div>
          </>
        )}
      </div>
      <div className="my-page-wrap__under-avatar">
        <div>
          <MailOutlined />
          <span>{infoMe.email}</span>
        </div>
        <div>
          <LinkOutlined />
          <span>{infoMe.fullname}</span>
        </div>
        <div>
          <Upload
            onDownload={() => console.log(123)}
            onPreview={() => console.log(123)}
            onDrop={() => console.log(123)}
            customRequest={(file: UploadProps<IUploadData>) =>
              onUploadAvatar(file)
            }
          >
            <UserOutlined />
            <span>Сменить Аватар</span>
          </Upload>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
