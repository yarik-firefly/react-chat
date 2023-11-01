import React from "react";
import { Button, Result } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "../redux/slices/authSlice";
import Loading from "../components/Loading";

import "./VerifyUser.scss";
import { AppDispatch, RootState } from "../redux/store";

const VerifyUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { statusVerify } = useSelector((state: RootState) => state.authSlice);
  const { search } = useLocation();
  const hash = search.split("hash=")[1];
  React.useEffect(() => {
    if (hash) {
      dispatch(verifyUser(hash));
    }
  }, []);

  return (
    <div className="wrapper">
      {statusVerify === "LOADING" ? (
        <div className="wrapper__loading">
          <Loading dialog={false} />
        </div>
      ) : (
        <Result
          status={statusVerify === "SUCCESS" ? "success" : "error"}
          title={
            statusVerify === "SUCCESS"
              ? "Верификация прошла успешно"
              : "Что-то пошло не так :("
          }
          subTitle={
            statusVerify === "SUCCESS"
              ? "Закройте вкладку или перейдите по ссылке"
              : "Произошла ошибка при верификации"
          }
          extra={
            statusVerify === "SUCCESS" && [
              <Button
                onClick={() => navigate("/auth")}
                type="primary"
                key="console"
              >
                Войти
              </Button>,
            ]
          }
        />
      )}
    </div>
  );
};

export default VerifyUser;
