import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "./Login.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import openNotification from "../../Notification";
import { AppDispatch, RootState } from "../../../redux/store";
import { ILoginRequest } from "../../../types/slice";
import { IRegisterOrLoginProps } from "../Register/index.type";

const Login = ({ setToggle, toggle, status }: IRegisterOrLoginProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { statusLogin } = useSelector((state: RootState) => state.authSlice);
  const onFinish = (values: ILoginRequest) => {
    console.log("Success:", values);
    dispatch(login(values));
  };
  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Введите почту",
            },
          ]}
        >
          <Input placeholder="Почта" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Введите пароль",
            },
          ]}
        >
          <Input placeholder="Пароль" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" id="button--submit" htmlType="submit">
            {status ? "Войти" : "Зарегистрироваться"}
          </Button>
        </Form.Item>
        <p onClick={() => setToggle("REGISTER")} className="register">
          {toggle === "LOGIN" ? "Зарегистрироваться" : "Есть аккаунт"}
        </p>
      </Form>
      {statusLogin === "ERROR" ? openNotification("error") : null}
    </>
    // </div>
  );
};

export default Login;
