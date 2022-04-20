import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ProfileImage from "../profile/ProfileImage";
import Signup from "./SignUp";

interface SignupCarouselProps {
  setSigninToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignUpCarousel({
  setSigninToggle,
}: SignupCarouselProps) {
  const signupRef = useRef<HTMLDivElement>(null);
  const profileImageRef = useRef<HTMLDivElement>(null);
  const [sumWidth, setSumWidth] = useState(0);
  useEffect(() => {
    console.log("widths", signupRef.current?.offsetWidth);
    if (signupRef.current?.offsetWidth && profileImageRef.current?.offsetWidth)
      setSumWidth(
        signupRef.current.offsetWidth + profileImageRef.current?.offsetWidth
      );
  }, []);

  return (
    <SignupCarouselWrap sumWidth={sumWidth}>
      <div className="form">
        <div className="flex">
          <div ref={signupRef}>
            <Signup setSigninToggle={setSigninToggle} />
          </div>
          <div ref={profileImageRef}>
            <ProfileImage />
          </div>
        </div>
      </div>
    </SignupCarouselWrap>
  );
}

const SignupCarouselWrap = styled.div<{ sumWidth: number }>`
  .form {
    width: 200px;
    margin: auto;
    /* overflow: hidden;
    width: ${({ sumWidth }) => sumWidth + "px"}; */
  }
  .flex {
    display: flex;
  }
`;
