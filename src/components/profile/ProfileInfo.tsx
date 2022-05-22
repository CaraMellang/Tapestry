import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useInput from "../../hook/useInput";
import client from "../../lib/api/client";
import { TOKEN_REQUEST } from "../../modules/redux/User";

export default function ProfileInfo() {
  const [isToggle, setIsToggle] = useState(false);
  const userName = useSelector(
    (state: any) => state.userSliceReducer.user.user_name
  );
  const dispatch = useDispatch();
  const [name, onChangeName, setName] = useInput(userName);

  const onClickSave = async () => {
    try {
      await client.patch(`/profile/setname`, { update_user_name: name });
      setIsToggle(false);
      dispatch(TOKEN_REQUEST("."));
    } catch (err) {
      window.alert("이름 저장중 오류가 발생했습니다!");
      console.log(err);
    }
  };
  //나중에 form으로 변경
  return (
    <ProfileInfoWrap>
      {isToggle ? (
        <input value={name} onChange={onChangeName} />
      ) : (
        <h1>{userName}</h1>
      )}
      <div className="btn-wrap">
        {isToggle ? (
          <button onClick={onClickSave}>저장</button>
        ) : (
          <button onClick={() => setIsToggle(true)}>수정</button>
        )}
      </div>
    </ProfileInfoWrap>
  );
}

const ProfileInfoWrap = styled.div`
  flex: 1 1 0%;
  border-left: 1px solid #2a2a2a;
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  input {
    border: 0;
    background: #1e1e1e;
    border: 1px solid #4d4d4d;
    border-radius: 4px;
    font-size: 2rem;
    font-weight: bold;
    padding: 0.5rem;
  }
  .btn-wrap {
    display: flex;
    margin-top: 1.5rem;
    justify-content: flex-end;
  }
  button {
    border: 0;
    background: var(--primary1);
    font-size: 1rem;
    padding: 0.25rem 1.25rem;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background: var(--primary2);
  }
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
  }
`;
