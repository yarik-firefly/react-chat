import React from "react";
import { useSelector } from "react-redux";
import CorrespondenceItem from "../components/messages/CorrespondenceItem";
import { MailOutlined } from "@ant-design/icons";
import Loading from "../components/Loading";
import socket from "../core/socket";
import PrintsMess from "../components/messages/PrintsMess";
import { ISendMsgResponse } from "@app/types/slice";
import { RootState } from "@app/redux/store";
import { IMessagesProps } from "./index.type";

export const Messages = ({ setIsTyping, isTyping }: IMessagesProps) => {
  const { messages, statusMessage } = useSelector(
    (state: RootState) => state.dialogsSlice
  );
  const { infoMe } = useSelector((state: RootState) => state.authSlice);

  React.useEffect(() => {
    socket.on("DIALOG:TYPING", userIsTyping);

    return () => {
      socket.removeListener("DIALOG:TYPING", userIsTyping);
    };
  }, []);

  let typingInterval: NodeJS.Timeout;

  const userIsTyping = () => {
    setIsTyping(true);

    clearTimeout(typingInterval);
    typingInterval = setTimeout(() => {
      setIsTyping(false);
    }, 500);
  };

  return (
    <>
      {statusMessage === "LOADING" ? (
        <div id="center">
          <Loading dialog={false} />
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
        messages.map((el: ISendMsgResponse) => (
          <CorrespondenceItem
            key={el._id}
            isMy={el.user._id === infoMe._id}
            {...el}
            isTyping={el.user._id !== infoMe._id && isTyping}
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
