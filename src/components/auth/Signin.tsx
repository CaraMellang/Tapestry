import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useInput from "../../hook/useInput";
import { setCookie } from "../../lib/cookie";
import { SIGNIN_REQUEST } from "../../modules/redux/User";
import httpPath from "../../lib/mode";

interface SignInProps {
  setIsSign: React.Dispatch<React.SetStateAction<boolean>>;
  setSigninToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Signin({ setIsSign, setSigninToggle }: SignInProps) {
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const dispatch = useDispatch();

  const userSelector: any = useSelector((state: any) => state.userSliceReducer);
  const userSelectorUser: any = useSelector(
    (state: any) => state.userSliceReducer.user
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault(); antd는 안써도됨
    if (email === "" || password === "") {
      window.alert("require Email && Password!");
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    dispatch(SIGNIN_REQUEST(data));
  };
  useEffect(() => {
    if (userSelector.signinSucceed) {
      const accessToken = userSelectorUser.accessToken;
      setCookie("access_token", accessToken, 1);
      setIsSign(false);
    }
  }, [userSelector]);

  return (
    <SignInWrap>
      <Form onFinish={onSubmit} style={{ color: "inherit" }}>
        <Form.Item
          // label="Email"
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
          // label="Password"
          name="password"
          rules={[{ required: true, message: "Required Password" }]}
        >
          <Input.Password
            value={password}
            onChange={setPassword}
            placeholder="Password"
          />
        </Form.Item>
        <a href={`${httpPath}/auth/google`} className="theme-bg-element2">
          google login
        </a>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <div
          className="theme-bg-element2"
          onClick={() => setSigninToggle(false)}
        >
          아직 회원이 아니신가요?
        </div>
      </Form>
    </SignInWrap>
  );
}

const SignInWrap = styled.div`
  display: flex;
  justify-content: center;
`;
