import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getCookie } from "../../lib/cookie";

export default function GroupList() {
  const userSelector = useSelector((state: any) => state.userSliceReducer);
  const dispatch = useDispatch();
  const [groups,setGroups] =  useState([])
  console.log(userSelector);

  const getGroups = async () => {
    const token = getCookie("access_token");
    const dd = await axios.post(
      `http://localhost:5000/group/readgroup`,
      {
        page: 1,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setGroups(dd.data.data.group)
    console.log(dd.data.data);
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <GroupListWrap>
      <div>그룹목록</div>
      <div className="box-list-layer">
        {groups ? (
          groups.map((item: any, index: number) => {
            return (
              <div key={index} className="box-wrap">
                <div className="box-padding">
                  <div className="box">
                    <div className="box-img">이미지입니다{item.group_img}</div>
                    <div className="box-title">
                      <div>{item.group_name}</div>
                      {/* <div>[그룹인원] {item.group_people_count} 명</div>
                    <div>[주인장] {item.owner_id.user_name}</div>
                    <div>[그룹설명] {item.group_description}</div> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>없음</div>
        )}
      </div>
    </GroupListWrap>
  );
}

const GroupListWrap = styled.div`
  .box-list-layer {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .box-wrap {
    width: 25%;
    box-sizing: border-box;
  }
  .box-padding {
    padding: 5px;
  }
  .box {
    display: flex;
    flex-direction: column;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    cursor: pointer;
  }
  .box:hover {
    transform: scale(1.02);
    transition: 0.3s;
  }
  .box-img {
    background-color: white;
    width: 100%;
    height: 10rem;
  }
  .box-title {
    background-color: beige;
    border-radius: 0 0 12px 12px;
    padding: 10px;
  }
`;
