import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Signin from "../components/auth/Signin";
import { deleteCookie, getCookie, setCookie } from "../lib/cookie";

interface SignFormProps {
  setIsSign: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignForm({ setIsSign }: SignFormProps) {
  const useSeletor = useSelector((state: any) => state.userSliceReducer);

  useEffect(() => {
    async function postAccessToken() {
      const token = getCookie("access_token");
      console.log(token);
      if (!token) {
        console.log("토컨스");
        return;
      }
      try {
        const { data } = await axios.post(
          "http://localhost:5000/auth/verify",
          { key: "value" },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(data);
        setIsSign(false);
      } catch (err) {
        console.log(err);
      }
    }
    postAccessToken();
  }, []);

  return (
    <SignFormWrap>
      <Signin setIsSign={setIsSign} />
    </SignFormWrap>
  );
}

const SignFormWrap = styled.div``;
