import React from "react";

import "./Home.scss";
import Header from "../components/Header/Header";
import { Col, Row } from "antd";
import { Button, Input, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import DialogItem from "../components/messages/DialogItem";
import CorrespondenceItem from "../components/messages/CorrespondenceItem";
import { useQuery } from "react-query";
import PrintsMess from "../components/messages/PrintsMess";
import AudioMessage from "../components/messages/AudioMessage";
import chatService from "../service/chat.service";
import Loading from "../components/Loading";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputMyArea from "../components/Input";
import { noData } from "../static/img/noData";
import socket from "../core/socket";
import {
  createDialog,
  createNewDialog,
  getDialogs,
  addMessage,
} from "../redux/slices/dialogsSlice";
import Dialogs from "../containers/Dialogs";
import Messages from "../containers/Messages";

export const Home = () => {
  const barRef = React.useRef(null);

  const dispatch = useDispatch();
  const { statusDialogs, dialogs, messages, currentDialogId } = useSelector(
    (state) => state.dialogsSlice
  );
  const { infoMe } = useSelector((state) => state.authSlice);

  const [isTyping, setIsTyping] = React.useState(false);

  const getDialogForUser = (obj) => {
    dispatch(getDialogs());
  };

  // const onNewMessage = () => (mes) => {
  //   console.log(mes);
  //   dispatch(addMessage(mes));
  // };

  React.useEffect(() => {
    dispatch(getDialogs());

    socket.on("SERVER:DIALOG_CREATED", getDialogForUser);
    socket.on("SERVER:NEW_MESSAGE", getDialogForUser);
    socket.on("CLIENT:ONLINE", getDialogForUser);

    socket.emit("CLIENT:ONLINE", { userId: infoMe._id });

    return () => {
      socket.removeListener("SERVER:DIALOG_CREATED", getDialogForUser);
      socket.removeListener("SERVER:NEW_MESSAGE", getDialogForUser);
      socket.removeListener("CLIENT:ONLINE", getDialogForUser);
    };
  }, []);

  React.useEffect(() => {
    barRef.current.scrollTo(0, 999999);
  }, [messages, isTyping]);

  const onNewMessage = (mes) => {
    console.log(mes);
    dispatch(addMessage(mes));
  };

  React.useEffect(() => {
    console.log("render");
    socket.on("SERVER:NEW_MESSAGE", onNewMessage);

    return () => {
      socket.removeListener("SERVER:NEW_MESSAGE", onNewMessage);
    };
  }, [currentDialogId]);

  return (
    <>
      <div className="home">
        <Header data={dialogs} />
      </div>
      <div className="middle-section">
        <Row>
          <Col span={6}>
            <div className="middle-section__input">
              <Space.Compact size="large">
                <Input
                  addonBefore={<SearchOutlined />}
                  placeholder="Поиск среди контактов"
                />
              </Space.Compact>
            </div>
            <div className="middle-section__scroll-bar">
              <Dialogs />
            </div>
          </Col>
          <Col span={18}>
            <div ref={barRef} className="middle-section__right-bar">
              <Messages setIsTyping={setIsTyping} isTyping={isTyping} />
            </div>
          </Col>
          <Col span={6}></Col>
          <Col span={18}>
            <InputMyArea setIsTyping={setIsTyping}/>
          </Col>
        </Row>
      </div>
    </>
  );
};
