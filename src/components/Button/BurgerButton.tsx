import React from "react";
import icon from "../../static/img/Bitmap (2).png"
import "./Button.scss";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useDispatch } from "react-redux";
import { deleteMessage } from "../../redux/slices/dialogsSlice";
import { AppDispatch } from "@app/redux/store";

export const BurgerButton = ({ id }: { id: string }) => {
  const dispatch: AppDispatch = useDispatch();
  const deleteMessageHandle = () => {
    dispatch(deleteMessage(id));
  };
  const items = [
    {
      label: <span>Удалить сообщение</span>,
      key: "0",
      onClick: () => deleteMessageHandle(),
    },
  ];
  return (
    <span className="burger-button">
      <Dropdown menu={{ items }} trigger={["click"]}>
        <img src={icon} alt="burger" />
      </Dropdown>
    </span>
  );
};

export default BurgerButton;
