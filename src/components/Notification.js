import React from "react";
import { Button, notification, Space } from "antd";
const openNotification = (type) => {
  notification[type]({
    message: "Ошибка авторизации",
    description: "Неверный логин или пароль",
  });
};
export default openNotification;
