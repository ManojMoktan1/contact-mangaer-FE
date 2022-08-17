import React from "react";
import "antd/dist/antd.css";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.css";
import registerInterface from "../../interfaces/registerInterface";
import axios from "../../constants/axios";

const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (values: registerInterface) => {
    const valuesToSend = {
      email: values.email,
      password: values.password,
    };
    axios
      .post("/register", valuesToSend)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate("/login");
  };

  return (
    <div className="wrapper">
      <div className="login-card">
        <h1 className="login-card__title">WELCOME TO CONTACT MANAGER</h1>
        <h1 className="login-card__title1">SIGN UP HERE</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className="input-field"
              data-testid="email-input"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              className="input-field"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              data-testid="password-input"
            />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            dependencies={["password"]}
            // hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input
              className="input-field"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
              data-testid="password-input"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button btn-login"
            >
              Sign Up
            </Button>
            <div className="register-now">
              Already Have an account? <Link to="/login"> Sign In here! </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
