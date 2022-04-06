import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useInput from "../../hook/useInput";
import client from "../../lib/api/client";
import { TOKEN_REQUEST } from "../../modules/redux/User";

export default function ProfileInfo() {
  const [isToggle, setIsToggle] = useState(false);
  const userName = useSelector(
    (state: any) => state.userSliceReducer.user.username
  );
  const dispatch = useDispatch()
  const [name, onChangeName, setName] = useInput(userName);

  const onClickSave = async () => {
    try {
      await client.patch(`/profile/setname`, { update_user_name: name });
      setIsToggle(false);
      dispatch(TOKEN_REQUEST('.'))
    } catch (err) {
      window.alert("이름 저장중 오류가 발생했습니다!");
      console.log(err);
    }
  };

  return (
    <ProfileInfoWrap>
      <div>
        {isToggle ? (
          <input
            className="theme-bg-element2"
            value={name}
            onChange={onChangeName}
          />
        ) : (
          userName
        )}
      </div>
      <div>
        {isToggle ? (
          <button className="theme-bg-element2" onClick={onClickSave}>
            저장
          </button>
        ) : (
          <button
            className="theme-bg-element2"
            onClick={() => setIsToggle(true)}
          >
            수정
          </button>
        )}
      </div>
    </ProfileInfoWrap>
  );
}

const ProfileInfoWrap = styled.div`
  input {
    border: 0;
  }
  button {
    border: 0;
  }
`;
