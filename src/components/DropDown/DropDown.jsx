import React from "react";
import { Dropdown, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../redux/slices/dialogsSlice";

const DropDown = ({ children }) => {
  const dispatch = useDispatch();
  const { toggle } = useSelector((state) => state.dialogsSlice);
  const menu = !!(toggle === "MENU");

  const items = [
    {
      label: menu ? <span>Диалоги</span> : <span>Мой Профиль</span>,
      key: "0",
      onClick: menu
        ? () => dispatch(toggleMenu("DIALOG"))
        : () => dispatch(toggleMenu("MENU")),
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
    >
      <a onClick={(e) => e.preventDefault()} >
        <Space>{children}</Space>
      </a>
    </Dropdown>
  );
};

export default DropDown;
