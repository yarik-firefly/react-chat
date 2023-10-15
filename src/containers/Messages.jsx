import React from "react";
import { useSelector } from "react-redux";
import CorrespondenceItem from "../components/messages/CorrespondenceItem";
import { MailOutlined } from "@ant-design/icons";
import Loading from "../components/Loading";

export const Messages = () => {
  const { messages, statusMessage } = useSelector(
    (state) => state.dialogsSlice
  );
  const { infoMe } = useSelector((state) => state.authSlice);



  return (
    <>
      {!messages.length && statusMessage !== "SUCCESS" ? (
        <div id="center">
          <MailOutlined />
          <p>Откройте Диалог</p>
        </div>
      ) : statusMessage === "SUCCESS" && !messages.length ? (
        <div id="center">
          <MailOutlined />
          <p>Диалог Пуст</p>
        </div>
      ) : statusMessage === "LOADING" ? (
        <div id="center">
          <Loading />
        </div>
      ) : statusMessage === "SUCCESS" && messages.length ? (
        messages.map((el) => (
          <CorrespondenceItem
            key={el._id}
            isMy={el.dialog.author || el.user === infoMe._id}
            {...el}
          />
        ))
      ) : (
        123
      )}
    </>
  );
};

export default Messages;
