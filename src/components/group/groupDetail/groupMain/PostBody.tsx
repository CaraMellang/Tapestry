import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GROUP_EMPTY, Post } from "../../../../modules/redux/Group";
import DateFormat from "../../../../hook/DateFormat";
import { ReactComponent as MenuOption } from "../../../static/svg/menuOption.svg";
import { getCookie } from "../../../../lib/cookie";
import client from "../../../../lib/api/client";
import { useDispatch, useSelector } from "react-redux";
import UserAvatar from "../../../common/UserAvatar";

interface PostBodyProps {
  item: Post;
}

export default function PostBody({ item }: PostBodyProps) {
  const [menuToggle, setMenuToggle] = useState(false);
  const ref = useRef(null);
  const formatDate = DateFormat(item.created_at);
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.userSliceReducer.user._id);

  const onDeleteClick = async () => {
    let isDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (!isDelete) return;
    try {
      const cookie = getCookie("access_token");
      await client.delete(`/post/delete`, { data: { post_id: item._id } });
      dispatch(GROUP_EMPTY("dummy"));
    } catch (err) {
      console.log(err);
    }
  };

  const onClickMenu = () => {
    setMenuToggle((prev) => !prev);
  };

  const onClickOutside = () => {
    if (menuToggle) setMenuToggle(false);
  };

  useEffect(() => {
    window.addEventListener("click", onClickOutside);
    return () => {
      window.removeEventListener("click", onClickOutside);
    };
  }, [menuToggle]);

  return (
    <PostBodyWrap ref={ref}>
      <div className="author-area">
        {/* {item.group_id.group_name} */}
        <div className="imgWrap">
          <UserAvatar src={item.owner_id.user_img} />
        </div>
        <div
          style={{
            display: "flex",
            marginLeft: "0.5rem",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              {item.owner_id.user_name ? item.owner_id.user_name : "알수없음"}
            </div>
            <div>{formatDate}</div>
          </div>
          <div className="menuoption-wrap">
            <MenuOption
              className="menu-icon"
              width={40}
              height={40}
              onClick={onClickMenu}
            />
            {menuToggle && (
              <div className="menuoption-list">
                <div onClick={() => window.alert("구현 예정")}>공유하기</div>
                {userId === item.owner_id._id && (
                  <div onClick={() => window.alert("구현 예정")}>수정</div>
                )}
                {userId === item.owner_id._id && (
                  <div onClick={onDeleteClick}>삭제</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ marginTop: "1rem" }}>
        {item.text.split("\n").map((item: string, index: number) => {
          return (
            <span key={index}>
              {item} <br />
            </span>
          );
        })}
      </div>
      <div>
        {item.images.map((imgUrl: string, index: number) => (
          <img key={index} className="post-img" alt="??" src={imgUrl} />
        ))}
      </div>
    </PostBodyWrap>
  );
}

const PostBodyWrap = styled.div`
  margin-bottom: 1.25rem;
  .author-area {
    display: flex;
    width: 100%;
  }
  .imgWrap {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    overflow: hidden;
  }
  .menuoption-wrap {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* .menuoption-wrap:hover {
    background: var(--fixed-color1);
  } */

  .menu-icon {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    color: var(--fixed-color1);
    cursor: pointer;
  }
  .menu-icon:hover {
    background: var(--fixed-color1);
  }
  .menuoption-list {
    position: absolute;
    right: 0;
    top: 3rem;
    width: 8rem;
    background: var(--bg-element4);
    color: white;
    border-radius: 8px;
    z-index: 22;
  }
  .menuoption-list > div {
    cursor: pointer;
    padding: 0.75rem 1rem;
  }
  .menuoption-list > div:hover {
    color: var(--primary1);
  }
`;
