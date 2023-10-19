import React from "react";
import { useSelector } from "react-redux";
import CorrespondenceItem from "../components/messages/CorrespondenceItem";
import { MailOutlined } from "@ant-design/icons";
import Loading from "../components/Loading";
import socket from "../core/socket";
import PrintsMess from "../components/messages/PrintsMess";

export const Messages = ({ setIsTyping, isTyping }) => {
  const { messages, statusMessage } = useSelector(
    (state) => state.dialogsSlice
  );
  const { infoMe } = useSelector((state) => state.authSlice);
  const { files } = useSelector((state) => state.uploadSlice);

  let typingInterval = null;

  const userIsTyping = () => {
    setIsTyping(true);

    clearTimeout(typingInterval);
    typingInterval = setTimeout(() => {
      setIsTyping(false);
    }, 500);
  };

  React.useEffect(() => {
    socket.on("DIALOG:TYPING", userIsTyping);

    return () => {
      socket.removeListener("DIALOG:TYPING", userIsTyping);
    };
  }, []);

  return (
    <>
      {statusMessage === "LOADING" ? (
        <div id="center">
          <Loading />
        </div>
      ) : statusMessage === "SUCCESS" && !messages.length ? (
        <div id="center">
          <MailOutlined />
          <p>Диалог Пуст</p>
        </div>
      ) : !messages.length && statusMessage !== "SUCCESS" ? (
        <div id="center">
          <MailOutlined />
          <p>Откройте Диалог</p>
        </div>
      ) : statusMessage === "SUCCESS" && messages.length ? (
        messages.map((el) => (
          <CorrespondenceItem
            key={el._id}
            isMy={el.user._id === infoMe._id}
            {...el}
            isTyping={el.user !== infoMe._id && isTyping}
          />
        ))
      ) : (
        123
      )}
      {isTyping && <PrintsMess />}
    </>
  );
};

export default Messages;
