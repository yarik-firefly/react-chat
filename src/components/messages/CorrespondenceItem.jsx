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
import { Modal } from "antd";

export const CorrespondenceItem = ({
  isMy,
  text,
  _id,
  createdAt,
  audio,
  readed,
  attachments,
  isTyping,
  user,
}) => {
  const [previewImage, setPreviewImage] = React.useState(null);

  return (
    <>
      <div
        className={`middle-section__correspondence${classNames({
          __my: isMy,
        })}`}
      >
        <div
          className={`middle-section__correspondence__avatar${classNames({
            __my: isMy,
          })}`}
        >
          <img src={user ? user.avatar : ""} alt="" />
        </div>
        {(text || !text) && (
          <>
            {(text && attachments.length >= 1) ||
            (text && !attachments.length) ? (
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
                  {!!attachments.length &&
                    attachments.map((el) => {
                      el.ext !== "webm" ? (
                        <div
                          style={{ backgroundImage: `url(${el.url})` }}
                          onClick={() => setPreviewImage(el.url)}
                        ></div>
                      ) : (
                        <AudioMessage audioSrc={el.url} />
                      );
                    })}
                </div>
              </>
            ) : (
              <div className="middle-section__correspondence__one-photo">
                <div className="data">{formatData(new Date(createdAt))}</div>
                <div
                  className={`middle-section__correspondence__text__attachments${classNames(
                    { "__one-photo": attachments.length === 1 }
                  )}`}
                >
                  {attachments.length &&
                    attachments.map((el) =>
                      el.ext !== "webm" ? (
                        <div
                          className={classNames({
                            "one-photo": attachments.length === 1,
                          })}
                          style={{ backgroundImage: `url(${el.url})` }}
                          onClick={() => setPreviewImage(el.url)}
                        />
                      ) : (
                        <AudioMessage audioSrc={el.url} />
                      )
                    )}
                </div>
              </div>
            )}
          </>
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
          </>
        )}

        <Modal
          open={!!previewImage}
          onCancel={() => setPreviewImage(null)}
          footer={null}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
      </div>
    </>
  );
};

export default CorrespondenceItem;
