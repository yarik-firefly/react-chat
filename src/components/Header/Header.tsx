import React, { useState } from "react";
import "../../pages/Home.scss";
import { Row, Col, Button } from "antd";
import icon2 from "../../static/img/Bitmap (1).png";
import dod from "../../static/img/Bitmap (2).png";
import { useDispatch, useSelector } from "react-redux";
import ModalSelect from "../Modal/ModalSelect";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { dialogIdToNull } from "../../redux/slices/dialogsSlice";
import { MenuOutlined } from "@ant-design/icons";
import DropDown from "../DropDown/DropDown";
import { AppDispatch, RootState } from "@app/redux/store";
import { IDialog, TypeDialogs } from "@app/types/slice";
import { IPartner, TypeDialogObj } from "./index.type";

export const Header = () => {
  const { dialogs, currentDialogId, statusDialogs, toggle } = useSelector(
    (state: RootState) => state.dialogsSlice
  );

  const dispatch: AppDispatch = useDispatch();

  const [show, setShow] = useState<boolean>(false);

  const { infoMe } = useSelector((state: RootState) => state.authSlice);

  let partner: IPartner = {
    _id: "",
    author: {
      fullname: "",
      isOnline: false,
    },
    partner: {
      fullname: "",
      isOnline: false,
    },
    createdAt: "",
    updatedAt: "",
    __v: 0,
    last_message: "",
    email: "",
    fullname: "",
    password: "",
    confirmed: false,
    last_seen: "",
    isOnline: false,
    avatar: "",
    id: "",
  };

  if (!currentDialogId && statusDialogs !== "SUCCESS") return;

  const dialogObj: TypeDialogObj = dialogs.filter(
    (obj) => obj._id === currentDialogId
  )[0];

  if (
    currentDialogId &&
    statusDialogs === "SUCCESS" &&
    dialogObj &&
    infoMe._id === dialogObj.author._id
  ) {
    partner = dialogObj.partner as unknown as IPartner;
  } else if (
    currentDialogId &&
    statusDialogs === "SUCCESS" &&
    dialogObj &&
    infoMe._id !== dialogObj.author._id
  ) {
    partner = dialogObj.author as unknown as IPartner;
  }

  const renderBackButton = () => {
    return (
      currentDialogId && (
        <ArrowLeftOutlined onClick={() => handleBackDialog()} />
      )
    );
  };

  const screen = window.screen.availWidth;

  const handleBackDialog = () => {
    const grid: HTMLDivElement | null = document.querySelector(
      ".middle-section .ant-col.ant-col-18.css-dev-only-do-not-override-pr0fja"
    );

    const input: HTMLInputElement | null = document.querySelector("#my-area");
    input && (input.style.display = "none");

    const scrollBar: HTMLDivElement | null = document.querySelector(
      ".middle-section__scroll-bar"
    );
    grid && (grid.style.display = "none");
    scrollBar && (scrollBar.style.display = "block");
    dispatch(dialogIdToNull());
  };

  return (
    <header className="home__header">
      <Row>
        <Col span={6}>
          <div className="first-col">
            <div className="first-col__title">
              <span>
                {screen < 400 ? (
                  renderBackButton()
                ) : (
                  <DropDown>
                    <Button type="text">
                      <MenuOutlined />
                    </Button>
                  </DropDown>
                )}
              </span>
              <span>Список диалогов</span>
              <span>
                <img
                  onClick={() => setShow(!show)}
                  src={icon2}
                  alt="icon"
                  style={{
                    pointerEvents: toggle === "MENU" ? "none" : undefined,
                  }}
                />
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
