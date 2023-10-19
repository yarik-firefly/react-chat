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

  const color = Math.round(Math.random() * 12);

  const screen = window.screen.availWidth;

  const dispatch = useDispatch();
  const { dialogs, currentDialogId, statusDialogs } = useSelector(
    (state) => state.dialogsSlice
  );

  const onClickMobile = () => {
    const grid = document.querySelector(
      ".middle-section .ant-col.ant-col-18.css-dev-only-do-not-override-pr0fja"
    );
    const scrollBar = document.querySelector(".middle-section__scroll-bar");
    const input = document.querySelector("#my-area");
    grid.style.display = "block";
    scrollBar.style.display = "none";
    input.style.display = "block";

    dispatch(getMessages(_id));
  };

  const { infoMe } = useSelector((state) => state.authSlice);

  const myPartner = () => {
    return infoMe._id === author._id ? partner : author;
  };

  const { fullname, isOnline, avatar } = myPartner();

  return (
    <div
      onClick={
        screen < 400 ? () => onClickMobile() : () => dispatch(getMessages(_id))
      }
      className={`middle-section__dialogs${classNames({
        __select: selectDialog,
      })}`}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{ backgroundColor: !avatar && colors[3] }}
          className="middle-section__dialogs__avatar"
        >
          <img src={avatar ? avatar : null} />
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
