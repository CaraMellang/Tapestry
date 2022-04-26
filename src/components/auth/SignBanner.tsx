import React from "react";
import styled from "styled-components";

export default function SignBanner() {
  return (
    <SignBannerWrap>
      <div>welcome to tapestry</div>
      <div className="circle circle1 theme-bg-element2">
        <div className="innetCircle" />
      </div>
      {/* <div className="circle circle2" />
      <div className="circle circle3" /> */}
    </SignBannerWrap>
  );
}

const SignBannerWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--primary1);
  border-radius: 1rem 0 0 1rem;
  overflow: hidden;
  .circle {
    position: absolute;
    width: 200px;
    height: 200px;
    /* background: #63e6be; */
    /* border: 2rem solid #63e6be; */
    border-radius: 100px;
  }
  .circle1 {
    top: 50%;
    right: -100px;
  }
  .innetCircle {
    position: absolute;
    background: var(--primary1);
    width: 126px;
    height: 126px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 63px;
  }
  .circle2 {
    bottom: -120px;
    left: calc(50% + 20px);
    transform: translate(-50%);
  }
  .circle3 {
    bottom: -50px;
    right: -50px;
  }
`;
