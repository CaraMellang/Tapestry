import { Button, Form, Input } from "antd";
import React from "react";
import styled from "styled-components";

export default function Signin() {
  return (
    <SignInWrap>
      <Form>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Required Email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Required Password" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </SignInWrap>
  );
}

const SignInWrap = styled.div`
  display: flex;
  justify-content: center;
`;
