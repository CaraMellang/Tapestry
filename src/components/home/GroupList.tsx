import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getCookie } from "../../lib/cookie";
import {
  READ_GROUPS_EMPTY,
  READ_GROUPS_REQUEST,
} from "../../modules/redux/Groups";

export default function GroupList() {
  const [isLoading, setIsLoading] = useState(true);
  const userSelector = useSelector((state: any) => state.userSliceReducer);
  const groupsSelector = useSelector((state: any) => state.groupsSliceReducer);
  const dispatch = useDispatch();
  const [groups, setGroups] = useState([]);

  const onPaging = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    if (groupsSelector.groupsLoading === false && isLoading) {
      const data = { page: 1 };
      dispatch(READ_GROUPS_REQUEST(data));
      console.log("gd");
      setIsLoading(false);
    }
  }, [isLoading, groupsSelector.groupsLoading, dispatch]);

  // useEffect(() => { 그룹피드랑 연동되었기에 보류
  //   return () => {
  //     dispatch({ type: "groupReducer/READ_GROUP_EMPTY" });
  //   };
  // }, []);

  return (
    <GroupListWrap>
      <div>그룹목록</div>
      <div className="box-list-layer">
        {groupsSelector.groups ? (
          groupsSelector.groups.map((item: any, index: number) => {
            return (
              <div key={index} className="box-wrap ">
                <div className="box-padding">
                  <Link
                    to={`/group/${item._id}/post`}
                    className="box theme-bg-element2"
                  >
                    <div className="box-img">
                      <img
                        style={{
                          width: "100%",
                          borderRadius: "12px 12px 0 0",
                        }}
                        alt=""
                        src={item.group_img}
                      />
                    </div>
                    <div className="box-title">
                      <div>{item.group_name}</div>
                      <div>[그룹인원] {item.group_people_count} 명</div>
                      <div>[주인장] {item.owner_id.user_name}</div>
                      <div>[그룹설명] {item.group_description}</div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div>없음</div>
        )}
        <div onClick={onPaging} style={{ cursor: "pointer" }}>
          페이징
        </div>
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
    overflow: hidden;
    border-radius: 12px 12px 0 0;
  }
  .box-title {
    /* background-color: beige; */
    border-radius: 0 0 12px 12px;
    padding: 10px;
  }
`;
