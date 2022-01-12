import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useInput from "../../hook/useInput";
import { setCookie } from "../../lib/cookie";
import { SIGNIN_REQUEST } from "../../modules/redux/User";

interface SignupProps {
  setSigninToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Signup({ setSigninToggle }: SignupProps) {
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [confirmPassword, setConfirmPassword] = useInput("");
  const [username, setUsername] = useInput("");
  const dispatch = useDispatch();

  const userSelector: any = useSelector((state: any) => state.userSliceReducer);
  const userSelectorUser: any = useSelector(
    (state: any) => state.userSliceReducer.user
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault(); antd는 안써도됨
    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      username === ""
    ) {
      window.alert("필수 항목들을 기입하세요.");
      return;
    }
    //success
    window.alert("가입완료");
    setSigninToggle(true);
  };

  return (
    <SignupWrap>
      <Form onFinish={onSubmit} style={{ width: "15%" }}>
        <Form.Item
          //   label="Username"
          name="Username"
          rules={[{ required: true, message: "Required Username" }]}
        >
          <Input
            type={"text"}
            value={username}
            onChange={setUsername}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          //   label="Email"
          name="email"
          rules={[{ required: true, message: "Required Email" }]}
        >
          <Input
            type={"email"}
            value={email}
            onChange={setEmail}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          //   label="Password"
          name="password"
          rules={[{ required: true, message: "Required Password" }]}
        >
          <Input.Password
            value={password}
            onChange={setPassword}
            placeholder="password"
          />
        </Form.Item>
        <Form.Item
          //   label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Required confirmPassword" }]}
        >
          <Input.Password
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="confirmPassword"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <div onClick={() => setSigninToggle(true)}>회원이신가요?</div>
      </Form>
    </SignupWrap>
  );
}

const SignupWrap = styled.div`
  display: flex;
  justify-content: center;
`;
