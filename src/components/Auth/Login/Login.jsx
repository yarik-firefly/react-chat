import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "./Login.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import openNotification from "../../Notification";

const Login = ({ setToggle, toggle, status }) => {
  const dispatch = useDispatch();
  const { statusLogin } = useSelector((state) => state.authSlice);
  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(login(values));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    // <div className="wrapper__auth-fields__l">
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
