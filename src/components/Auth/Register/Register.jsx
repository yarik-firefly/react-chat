import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "./Register.scss";
import { useForm } from "react-hook-form";

import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../redux/slices/authSlice";
import SuccessRegister from "./SuccessRegister";
import Loading from "../../Loading";

const Register = ({ toggle, setToggle, status }) => {
  const dispatch = useDispatch();
  const { statusRegister } = useSelector((state) => state.authSlice);
  const onFinish = (values) => {
    const { password2, ...userData } = values;
    dispatch(register(userData));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {statusRegister === "SUCCESS" ? (
        <SuccessRegister />
      ) : statusRegister === "LOADING" ? (
        <Loading />
      ) : statusRegister === "ERROR" ? (
        window.alert("Произошла ошибка при регистрации")
      ) : (
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
                message: "Введите e-mail",
              },
            ]}
          >
            <Input placeholder="E-mail" type="email" />
          </Form.Item>

          <Form.Item
            name="fullname"
            rules={[
              {
                required: true,
                message: "Введите имя",
              },
            ]}
          >
            <Input placeholder="Имя" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: "Введите пароль",
                message: "Введите пароль",
              },
              {
                min: 8,
                message: "Минимум 8 символов",
              },
            ]}
          >
            <Input placeholder="Пароль" type="password" />
          </Form.Item>
          <Form.Item
            dependencies={["password"]}
            name="password2"
            rules={[
              {
                required: true,
                message: "Повторите пароль",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Пароли должны совпадать!"));
                },
              }),
            ]}
          >
            <Input placeholder="Повторите" type="password" />
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
          <p onClick={() => setToggle("LOGIN")} className="register">
            {toggle === "LOGIN" ? "Зарегистрироваться" : "Есть аккаунт"}
          </p>
        </Form>
      )}
    </>
  );
};

export default Register;
