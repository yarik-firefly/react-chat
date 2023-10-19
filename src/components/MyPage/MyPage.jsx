import React from "react";
import { LinkOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import "./MyPage.scss";
import "../../pages/Home.scss";
import { Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { uploadAvatar } from "../../redux/slices/uploadSlice";
import socket from "../../core/socket";
import Loading from "../Loading";

const MyPage = () => {
  const [url, setUrl] = React.useState(null);

  const { infoMe } = useSelector((state) => state.authSlice);

  const handleChangeAvatar = (url) => {
    setUrl(url);
  };

  React.useEffect(() => {
    setUrl(infoMe.avatar);
    socket.on("CHANGE:AVATAR", handleChangeAvatar);

    return () => {
      socket.removeListener("CHANGE:AVATAR", handleChangeAvatar);
    };
  }, []);

  const { statusAvatar } = useSelector((state) => state.uploadSlice);

  const dispatch = useDispatch();

  const onUploadAvatar = async (e) => {
    dispatch(uploadAvatar(e.file)).then(({ payload }) => {});
  };

  return (
    <div className="my-page-wrap">
      <div className="my-page-wrap__avatar">
        {statusAvatar === "LOADING" ? (
          <div id="center">
            <Loading />
          </div>
        ) : (
          <>
            <img src={url} alt="avatar"/>
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
            action={() => console.log(1234)}
            customRequest={(e) => onUploadAvatar(e)}
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
