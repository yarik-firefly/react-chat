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
          <img
            src={
              avatar
                ? avatar
                : "data:image/png;base64,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"
            }
          />
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
