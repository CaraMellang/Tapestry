import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Signin from "../components/auth/Signin";
import Signup from "../components/auth/SignUp";
import client from "../lib/api/client";
import { deleteCookie, getCookie, setCookie } from "../lib/cookie";
import { SIGNIN_SUCCESS, TOKEN_REQUEST } from "../modules/redux/User";

interface SignFormProps {
  setIsSign: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignForm({ setIsSign }: SignFormProps) {
  const [signinToggle, setSigninToggle] = useState(true);
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

  // useEffect(() => {
  //   async function dddd() {
  //     try {
  //       await client.post(`/profile/test`,".");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   dddd();
  // }, []);

  return (
    <SignFormWrap>
      {signinToggle ? (
        <Signin setIsSign={setIsSign} setSigninToggle={setSigninToggle} />
      ) : (
        <Signup setSigninToggle={setSigninToggle} />
      )}
    </SignFormWrap>
  );
}

const SignFormWrap = styled.div``;
