import React, { useState } from "react";
import "../../pages/Home.scss";
import { Row, Col } from "antd";
import icon from "../../static/img/Bitmap.png";
import icon2 from "../../static/img/Bitmap (1).png";
import dod from "../../static/img/Bitmap (2).png";
import { useSelector } from "react-redux";
import ModalSelect from "../Modal/ModalSelect";

export const Header = ({ data }) => {
  const { dialogs, currentDialogId, statusDialogs } = useSelector(
    (state) => state.dialogsSlice
  );

  const [show, setShow] = useState();

  const { infoMe } = useSelector((state) => state.authSlice);

  let partner = {};

  if (!currentDialogId && statusDialogs !== "SUCCESS") {
    return;
  }

  const dialogObj =
    currentDialogId &&
    statusDialogs === "SUCCESS" &&
    dialogs.filter((obj) => obj._id === currentDialogId)[0];

  if (
    currentDialogId &&
    statusDialogs === "SUCCESS" &&
    infoMe._id === dialogObj.author._id
  ) {
    partner = dialogObj.partner;
  } else if (
    currentDialogId &&
    statusDialogs === "SUCCESS" &&
    infoMe._id !== dialogObj.author._id
  ) {
    partner = dialogObj.author;
  }

  return (
    <header className="home__header">
      <Row>
        <Col span={6}>
          <div className="first-col">
            <div className="first-col__title">
              <span>
                <img src={icon} alt="" />
              </span>
              <span>Список диалогов</span>
              <span>
                <img onClick={() => setShow(!show)} src={icon2} alt="icon" />
              </span>
            </div>
          </div>
        </Col>
        <Col span={18}>
          <div className="second-col">
            <div className="second-col__title">
              <Col style={{ height: 0 }} span={8}></Col>
              <Col span={10}>
                <span>{currentDialogId && partner.fullname}</span>
                <span>
                  {currentDialogId &&
                    (partner.isOnline ? (
                      <>
                        <b></b>online
                      </>
                    ) : (
                      <>
                        <b style={{ backgroundColor: "#b9c0bd" }}></b>offline
                      </>
                    ))}
                </span>
              </Col>
              <Col span={6}>
                <div className="second-col__image">
                  <img src={dod} alt="" />
                </div>
              </Col>
            </div>
          </div>
        </Col>
      </Row>
      <ModalSelect setShow={setShow} show={show} />
    </header>
  );
};

export default Header;
