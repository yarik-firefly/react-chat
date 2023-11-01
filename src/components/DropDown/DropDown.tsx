import React, { ReactNode } from "react";
import { Dropdown, MenuProps, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../../redux/slices/dialogsSlice";
import { AppDispatch, RootState } from "@app/redux/store";

type Props = {
  children: ReactNode;
};

const DropDown = ({ children }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { toggle } = useSelector((state: RootState) => state.dialogsSlice);
  const menu = !!(toggle === "MENU");

  const items: MenuProps["items"] = [
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
      <a onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}>
        <Space>{children}</Space>
      </a>
    </Dropdown>
  );
};

export default DropDown;
