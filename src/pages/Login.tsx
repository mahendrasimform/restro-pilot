import React from "react";
import { Form, Input, Button, message, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/store";
import { login } from "src/store/features/authSlice";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../styles/login.css';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = (values: LoginForm) => {
    if (values.email === "admin@restro.com" && values.password === "admin@1234") {
      dispatch(login(values));
      message.success("Login successful!");
      navigate("/");
    } else {
      message.error("Invalid credentials!");
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <h1 className="login-title">Restaurant Admin</h1>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          className="login-form"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}