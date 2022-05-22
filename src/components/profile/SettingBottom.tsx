import { Switch } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function SettingBottom() {
  const selector = useSelector((state: any) => state.userSliceReducer);
  const [switchToggle, setswitchToggle] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  const onSwitchChange = (toggle: boolean) => {
    console.log("ㅎㅇㅎㅇ", toggle);
    if (toggle === true) {
      localStorage.setItem("theme", "dark");
      document.body.dataset.theme = "dark";

      setswitchToggle(true);
    }
    if (toggle === false) {
      localStorage.setItem("theme", "light");
      document.body.dataset.theme = "light";

      setswitchToggle(false);
    }
  };
  return (
    <SettingBottomWrap>
      <div className="wrapper">
        <div className="title-wrapper">다크모드 활성화</div>
        <div className="content-wrapper">
          <Switch defaultChecked={switchToggle} onChange={onSwitchChange} />
        </div>
      </div>
      <div className="wrapper" style={{ borderTop: "1px solid #2a2a2a" }}>
        <div className="title-wrapper">회원탈퇴</div>
        <div className="content-wrapper">
          <button
            className="secession-btn"
            onClick={() => {
              window.alert("아직 탈퇴하실 수 없습니다.");
            }}
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </SettingBottomWrap>
  );
}

const SettingBottomWrap = styled.section`
  margin-top: 4rem;
  .wrapper {
    display: flex;
    padding: 1rem 0;
    align-items: center;
  }
  .title-wrapper {
    width: 9rem;
    font-weight: bold;
    font-size: 1.125rem;
  }
  .content-wrapper {
  }
  .ant-switch-checked {
    background: var(--primary1);
  }
  .secession-btn {
    background: #ff5757;
    color: white;
    border-radius: 4px;
    font-size: 1rem;
    padding: 0.125rem 1.25rem;
    cursor: pointer;
  }
  .secession-btn:hover {
    background: #ff4141;
  }
`;
