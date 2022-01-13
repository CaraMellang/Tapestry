import React, { useState } from "react";
import styled from "styled-components";

export default function Loading() {
  const [active, setActive] = useState(false);
  return (
    <LoadingWrap active={active}>
      <div className="loader-wrap">
        <div className="loader"></div>
      </div>
    </LoadingWrap>
  );
}

const LoadingWrap = styled.div<{ active: boolean }>`
  position: relative;
  width: 100%;
  .loader-wrap {
    position: absolute;

    left: 50%;
    transform: translate(-50%);
  }
  .loader {
    width: 3rem;
    height: 3rem;
    border: 6px solid #bbbbbb;
    border-right: 6px solid #cc3300;
    border-radius: 100%;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    animation: spin 0.8s infinite linear;
  }
`;
