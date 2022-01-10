import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import Signin from "../components/auth/Signin";
import { deleteCookie, getCookie, setCookie } from "../lib/cookie";

interface SignFormProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignForm({ setToggle }: SignFormProps) {
  useEffect(() => {
    async function postAccessToken() {
      const token = getCookie("accessToken");
      if (!token) {
        console.log("토컨스");
        return;
      }
      try {
        await axios.post("http://localhost:5000/auth/verify", {
          Headers: { Authorization: `Bearer ${token}` },
        });
        setToggle(true);
      } catch (err) {
        console.log(err);
      }
    }
    postAccessToken();
  }, []);

  return (
    <SignFormWrap>
      <Signin />
    </SignFormWrap>
  );
}

const SignFormWrap = styled.div``;
