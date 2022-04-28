import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useInput from "../../hook/useInput";
import client from "../../lib/api/client";
import { setCookie } from "../../lib/cookie";
import media from "../../lib/media";
import { SIGNIN_REQUEST } from "../../modules/redux/User";

interface SignupProps {
  setSigninToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Signup({ setSigninToggle }: SignupProps) {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [confirmPassword, onChangeConfirmPassword] = useInput("");
  const [username, onChangeUsername] = useInput("");
  const dispatch = useDispatch();

  const userSelector: any = useSelector((state: any) => state.userSliceReducer);
  const userSelectorUser: any = useSelector(
    (state: any) => state.userSliceReducer.user
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // return;

    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      username === ""
    ) {
      window.alert("필수 항목들을 기입하세요.");
      return;
    }
    if (password !== confirmPassword)
      return window.alert("확인패스워드가 일치하지 않습니다.");
    //success
    try {
      await client.post("/auth/signup", {
        email,
        password,
        username,
        userImg: null,
      });
      window.alert("가입완료");
      setSigninToggle(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SignupWrap>
      <div style={{ marginBottom: "40px" }}>
        <div className="signInHead">SignUp</div>
      </div>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: "28px" }}>
          <input
            type={"email"}
            className="signInFormTagInput"
            value={email}
            onChange={onChangeEmail}
            placeholder="Email"
            spellCheck={false}
            required
          />
          <div className="inputWarning"></div>
        </div>
        <div style={{ marginBottom: "28px" }}>
          <input
            type={"text"}
            className="signInFormTagInput"
            value={username}
            onChange={onChangeUsername}
            placeholder="Username"
            spellCheck={false}
            required
          />
          <div className="inputWarning"></div>
        </div>
        <div style={{ marginBottom: "28px" }}>
          <input
            type={"password"}
            className="signInFormTagInput"
            value={password}
            onChange={onChangePassword}
            placeholder="Password"
            spellCheck={false}
            required
          />
          <div className="inputWarning"></div>
        </div>
        <div style={{ marginBottom: "28px" }}>
          <input
            type={"password"}
            className="signInFormTagInput"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            placeholder="ConfirmPassword"
            spellCheck={false}
            required
          />
          <div className="inputWarning"></div>
        </div>
        <div style={{ marginBottom: "28px" }}>
          <button type="submit">회원가입</button>
        </div>
      </form>
      <span
        style={{
          cursor: "pointer",
          width: "fit-content",
          margin: "auto",
          marginTop: "18px",
          color: "var(--primary1)",
          fontWeight: "bold",
        }}
        onClick={() => setSigninToggle(true)}
      >
        회원이신가요?
      </span>
    </SignupWrap>
  );
}

const SignupWrap = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 4rem;
  .signInHead {
    width: fit-content;
    font-size: 24px;
    font-weight: bold;
    color: var(--primary1);
    border-bottom: 4px solid var(--primary1);
    padding-bottom: 2px;
    margin: auto;
  }
  .signInFormTag {
    color: inherit;
  }
  .signInFormTagInput {
    width: 100%;
    background-color: var(--bg-element1);
    color: var(--color-text);
    border: 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--primary1);
  }
  .inputWarning {
    margin: 8px 0;
    color: #c21842;
    height: 25px;
  }
  button {
    width: 100%;
    background: var(--primary1);
    color: white;
    padding: 12px 0;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background: var(--primary2);
  }
  ${media.small} {
    padding: 4rem 0.5rem;
  }
`;
