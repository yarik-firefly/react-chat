import React from "react";
import "./AuthPage.scss";
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import { useLocation } from "react-router-dom";
import classNames from "classnames";

export const AuthPage = () => {
  const [toggle, setToggle] = React.useState<"LOGIN" | "REGISTER">("LOGIN");
  const status = toggle === "LOGIN";

  return (
    <div>
      <div className={`wrapper${classNames({ __r: !status })}`}>
        <div className="wrapper__auth-window-title">
          <h3>{toggle === "LOGIN" ? "Войти в аккаунт" : "Регистрация"}</h3>
          <p>
            {toggle === "LOGIN"
              ? "Пожалуйста, войдите в свой аккаунт"
              : "Для входа в чат, вам нужно зарегистрироваться"}
          </p>
        </div>
        <div
          className={`wrapper__auth-fields${classNames(
            { __l: status },
            { __r: !status }
          )}`}
        >
          {toggle === "LOGIN" ? (
            <Login setToggle={setToggle} toggle={toggle} status={status} />
          ) : (
            <Register setToggle={setToggle} toggle={toggle} status={status} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
