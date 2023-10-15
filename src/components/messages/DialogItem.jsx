import React from "react";
import "../../pages/Home.scss";
import { formatData } from "../../utils/formatData";
import { Link } from "react-router-dom";
import chatService from "../../service/chat.service";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../core/socket";
import {
  addMessage,
  getMessages,
  sendMessage,
} from "../../redux/slices/dialogsSlice";
import classNames from "classnames";

export const DialogItem = ({
  author,
  partner,
  createdAt,
  _id,
  isSuccess,
  last_message,
  selectDialog,
}) => {
  const colors = [
    "#2b2c2f",
    "#092fa3",
    "#e81952",
    "#8506ac",
    "#00c980",
    "#faad14",
    "##14faf7",
    "#ffd666",
    "#ff0000",
    "#5d14fa",
  ];

  const dispatch = useDispatch();
  const { dialogs, currentDialogId, statusDialogs } = useSelector(
    (state) => state.dialogsSlice
  );

  const { infoMe } = useSelector((state) => state.authSlice);

  const color = Math.round(Math.random() * 12);

  const myPartner = () => {
    return infoMe._id === author._id ? partner : author
  }

  const {fullname, isOnline} = myPartner()

  return (
    <div
      onClick={() => dispatch(getMessages(_id))}
      className={`middle-section__dialogs${classNames({
        __select: selectDialog,
      })}`}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{ backgroundColor: colors[2] }}
          className="middle-section__dialogs__avatar"
        >
          <img src={null} alt="" />
          {isOnline && (
            <b className="middle-section__dialogs__avatar__online"></b>
          )}
        </div>
        <div className="middle-section__dialogs__user-info">
          <span>{fullname}</span>
          <span>{last_message?.text}</span>
        </div>
      </div>
      <div className="middle-section__dialogs__message">
        <span>{formatData(new Date(createdAt))}</span>
        <span className="middle-section__dialogs__message--count">3</span>
      </div>
    </div>
  );
};

export default DialogItem;
