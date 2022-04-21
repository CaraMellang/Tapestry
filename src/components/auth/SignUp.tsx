import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useInput from "../../hook/useInput";
import client from "../../lib/api/client";
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault(); antd는 안써도됨

    return;

    // if (
    //   email === "" ||
    //   password === "" ||
    //   confirmPassword === "" ||
    //   username === ""
    // ) {
    //   window.alert("필수 항목들을 기입하세요.");
    //   return;
    // }
    // if (password !== confirmPassword)
    //   return window.alert("확인패스워드가 일치하지 않습니다.");
    // //success
    // try {
    //   await client.post("/auth/signup", {
    //     email,
    //     password,
    //     username,
    //     userImg: "",
    //   });
    //   window.alert("가입완료");
    //   setSigninToggle(true);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  //해당 컴포넌트는 나중에 따로 빼서 로켓펀치같은 방식으로 캐로셀로 구현해 이미지 설정, 이름설정 등등을 할 예정.
  return (
    <SignupWrap>
      <Form onFinish={onSubmit} style={{ color: "inherit" }}>
        <Form.Item
          //   label="Username"
          name="Username"
          rules={[{ required: true, message: "Required Username" }]}
          style={{ marginBottom: "18px" }}
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
          style={{ marginBottom: "18px" }}
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
          style={{ marginBottom: "18px" }}
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
          style={{ marginBottom: "18px" }}
        >
          <Input.Password
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="confirmPassword"
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
          style={{ marginBottom: "18px" }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <div
          className="theme-bg-element2"
          onClick={() => setSigninToggle(true)}
        >
          회원이신가요?
        </div>
      </Form>
    </SignupWrap>
  );
}

const SignupWrap = styled.div`
  display: flex;
  /* justify-content: center; */
  width: 200px;
  /* box-sizing: border-box;
  margin: auto; */
`;
