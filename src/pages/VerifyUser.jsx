import React from "react";
import { Button, Result } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "../redux/slices/authSlice";
import Loading from "../components/Loading";

import "./VerifyUser.scss";

const VerifyUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { statusVerify } = useSelector((state) => state.authSlice);
  const { search } = useLocation();
  const hash = search.split("hash=")[1];
  console.log(hash);
  React.useEffect(() => {
    if (hash) {
      dispatch(verifyUser(hash));
    }
  }, []);

  return (
    <div className="wrapper">
      {statusVerify === "LOADING" ? (
        <div className="wrapper__loading">
          <Loading />
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
                Перейти к профилю
              </Button>,
            ]
          }
        />
      )}
    </div>
  );
};

export default VerifyUser;
