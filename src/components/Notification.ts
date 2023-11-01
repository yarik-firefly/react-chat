import React from "react";
import { Button, notification, Space } from "antd";
type NotificationType = "success" | "info" | "warning" | "error";
const openNotification = (type: NotificationType) => {
  notification[type]({
    message: "Ошибка авторизации",
    description: "Неверный логин или пароль",
  });
};
export default openNotification;
