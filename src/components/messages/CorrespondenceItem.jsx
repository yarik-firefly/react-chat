import React from "react";
import "../../pages/Home.scss";
import avatar from "../../static/img/Bitmap (3).png";
import classNames from "classnames";
import check from "../../static/img/Combined Shape.png";
import noCheck from "../../static/img/1264356.png";
import PrintsMess from "./PrintsMess";
import AudioMessage from "./AudioMessage";
import { formatData } from "../../utils/formatData";
import { useSelector } from "react-redux";
import BurgerButton from "../Button/BurgerButton";

export const CorrespondenceItem = ({
  isMy,
  text,
  _id,
  createdAt,
  audio,
  readed,
  attachments,
}) => {
  console.log(isMy);
  return (
    <div
      className={`middle-section__correspondence${classNames({ __my: isMy })}`}
    >
      <div
        className={`middle-section__correspondence__avatar${classNames({
          __my: isMy,
        })}`}
      >
        <img src={avatar ? avatar : ""} alt="" />
      </div>
      {text ? (
        <>
          <div
            className={`middle-section__correspondence__text${classNames({
              __my: isMy,
            })}`}
          >
            <span>{text}</span>
            <span>{formatData(new Date(createdAt))}</span>
          </div>
          <div className="middle-section__correspondence__text__attachments">
            {attachments.length &&
              attachments.map((el) => (
                <div style={{ backgroundImage: `url(${el.url})` }} />
              ))}
          </div>
        </>
      ) : audio ? (
        <AudioMessage />
      ) : (
        <PrintsMess />
      )}

      {isMy && (
        <>
          <BurgerButton id={_id} />
          <span className="checkout">
            {readed ? (
              <img src={check} alt="check" />
            ) : (
              <img width={11} src={noCheck} alt="no check" />
            )}
          </span>
          <span></span>
        </>
      )}
    </div>
  );
};

export default CorrespondenceItem;
