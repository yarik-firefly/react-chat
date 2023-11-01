import React from "react";
import warning from "../../../static/img/warning.png";
import "./Register.scss";

const SuccessRegister = () => {
  return (
    <div className="success-register-block">
      <img src={warning} alt="warning" />
      <div className="success-register-block__text">
        <span>Подтвердите свой аккаунт</span>
        <span>
          На Вашу почту отправлено письмо с ссылкой на подтверждение аккаунта.
        </span>
      </div>
    </div>
  );
};

export default SuccessRegister;
