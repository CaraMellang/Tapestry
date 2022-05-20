import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useInput from "../../hook/useInput";
import { setCookie } from "../../lib/cookie";
import media from "../../lib/media";
import { SIGNIN_REQUEST } from "../../modules/redux/User";
import { ReactComponent as GoogleIcon } from "../static/svg/googleIcon.svg";
import { ReactComponent as GithubIcon } from "../static/svg/githubIcon.svg";
import useDesktop from "../../hook/useDesktop";

interface SignInProps {
  setIsSign: React.Dispatch<React.SetStateAction<boolean>>;
  setSigninToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Signin({ setIsSign, setSigninToggle }: SignInProps) {
  const [email, onChangeEmail, setEmail] = useInput("");
  const [password, onChangePassword, setPassword] = useInput("");
  const [emailError, setEmailError] = useState<null | string>(null);
  const dispatch = useDispatch();
  const isDesktop = useDesktop();

  const userSelector: any = useSelector((state: any) => state.userSliceReducer);
  const userSelectorUser: any = useSelector(
    (state: any) => state.userSliceReducer.user
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault(); antd는 안써도됨
    e.preventDefault();
    if (email === "" || password === "") {
      window.alert("require Email && Password!");
      return;
    }
    // let reg =
    //   /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    // if (!reg.test(email)) {
    //   setEmailError("잘못된 형식의 이메일입니다.");
    //   return;
    // }

    const data = {
      email: email,
      password: password,
    };

    dispatch(SIGNIN_REQUEST(data));
    setEmail("");
    setPassword("");
  };

  // useEffect(() => {
  //   document.querySelectorAll("input").forEach((item) =>
  //     item.addEventListener("invalid", (e) => {
  //       e.preventDefault();
  //     })
  //   );
  // }, []);

  useEffect(() => {
    if (userSelector.signinSucceed) {
      // const accessToken = userSelectorUser.accessToken;
      // setCookie("access_token", accessToken, 1);
      setIsSign(false);
    }
  }, [userSelector]);

  return (
    <SignInWrap>
      <div style={{ marginBottom: "40px" }}>
        <div className="signInHead">{isDesktop ? "SignIn" : "Tapestry"}</div>
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
          <div className="input-warning">{emailError}</div>
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
          <div className="input-warning"></div>
        </div>
        <div style={{ marginBottom: "28px" }}>
          <button type="submit">로그인</button>
        </div>
      </form>
      <div className="sns-signin-wrap">
        <span className="sns-signin-text">SNS계정으로 로그인</span>
      </div>
      <div style={{ display: "flex" }}>
        <a
          href={
            process.env.NODE_ENV === `development`
              ? `http://localhost:4000/auth/google`
              : `http://mellang.xyz/auth/google`
          }
          className="theme-bg-element2"
          style={{
            width: "2rem",
            height: "2rem",
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "1rem",
            margin: "auto",
          }}
        >
          <GoogleIcon />
        </a>
        <div
          // href={`http://localhost:4000/auth/google`}
          className="theme-bg-element2"
          style={{
            width: "2rem",
            height: "2rem",
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "1rem",
            margin: "auto",
            color: "black",
          }}
          onClick={() => window.alert("준비중 입니다.")}
        >
          <GithubIcon />
        </div>
      </div>
      <span
        style={{
          cursor: "pointer",
          width: "fit-content",
          margin: "auto",
          marginTop: "18px",
          color: "var(--primary1)",
          fontWeight: "bold",
        }}
        onClick={() => setSigninToggle(false)}
      >
        아직 회원이 아니신가요?
      </span>
    </SignInWrap>
  );
}

const SignInWrap = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 4rem;
  .signInHead {
    width: fit-content;
    font-size: 24px;
    font-weight: bold;
    color: var(--primary1);
    /* border-bottom: 2px solid var(--primary1); */
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
  .input-warning {
    margin: 8px 0;
    color: #c21842;
    height: 25px;
  }
  .sns-signin-wrap {
    font-weight: bold;
    text-align: center;
    margin-bottom: 18px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sns-signin-wrap:before {
    content: "";
    position: absolute;
    border-top: 1px solid #d0d1d4;
    top: 50%;
    left: 0;
    right: 0;
    z-index: 10;
  }
  .sns-signin-text {
    padding: 0 0.5rem;
    background-color: var(--bg-element1);
    z-index: 20;
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
