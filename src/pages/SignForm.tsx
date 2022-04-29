import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import SignBanner from "../components/auth/SignBanner";
import Signin from "../components/auth/Signin";
import Signup from "../components/auth/SignUp";
import useDesktop from "../hook/useDesktop";
import client from "../lib/api/client";
import { deleteCookie, getCookie, setCookie } from "../lib/cookie";
import { SIGNIN_SUCCESS, TOKEN_REQUEST } from "../modules/redux/User";
import media from "../lib/media";

interface SignFormProps {
  setIsSign: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignForm({ setIsSign }: SignFormProps) {
  const [signinToggle, setSigninToggle] = useState(true);
  const isDesktop = useDesktop();
  const dispatch = useDispatch();
  const userSelector = useSelector((state: any) => state.userSliceReducer);
  const userSelectorUser: any = useSelector(
    (state: any) => state.userSliceReducer.user
  );

  useEffect(() => {
    async function postAccessToken() {
      const token = getCookie("access_token");
      // console.log(token);
      if (!token) {
        console.log("토컨스");
        return;
      }
      try {
        dispatch(TOKEN_REQUEST(token));
      } catch (err) {
        console.log(err);
      }
    }
    postAccessToken();

    if (userSelector.signinSucceed) {
      const accessToken = userSelectorUser.accessToken;
      setCookie("access_token", accessToken, 1);
      setIsSign(false);
    }
  }, []);

  return (
    <SignFormWrap isDesktop={isDesktop}>
      <div className="signFormLayout theme-bg-element1">
        {isDesktop && (
          <div className="bannerLayout">
            <SignBanner />
          </div>
        )}
        <div className="signLayout">
          {signinToggle ? (
            <Signin setIsSign={setIsSign} setSigninToggle={setSigninToggle} />
          ) : (
            <Signup setSigninToggle={setSigninToggle} />
          )}
        </div>
      </div>
    </SignFormWrap>
  );
}

const SignFormWrap = styled.div<{ isDesktop: boolean }>`
  display: flex;
  align-items: center;
  min-height: 100%;
  .signFormLayout {
    display: flex;
    width: 1024px;
    height: 100%;
    margin: auto;
    border-radius: 1rem;
    box-shadow: 0 0.15rem 0.75rem black;
    /* box-shadow: 0 0.15rem 1.75rem rgba(34 39 46); */
  }
  .signLayout {
    position: relative;
    width: 50%;
    /* border-left: 1px solid #9b9b9b; */
  }
  .bannerLayout {
    width: 50%;
  }
  ${media.large} {
    .signFormLayout {
      max-width: 425px;
    }
    .signLayout {
      width: 100%;
    }
  }
`;
