import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DateFormat from "../../../hook/DateFormat";
import { Post } from "../../../modules/redux/Group";
import { ReactComponent as MenuOption } from "../../static/svg/menuOption.svg";
import UserAvatar from "../UserAvatar";

interface PostUpperBodyProps {
  item: Post;
}

export default function PostUpperBody({ item }: PostUpperBodyProps) {
  const [menuToggle, setMenuToggle] = useState(false);
  const userId = useSelector((state: any) => state.userSliceReducer.user._id);
  const formatDate = DateFormat(item.created_at);

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
    <PostUpperBodyWrap>
      <div className="author-area">
        <div className="img-wrap">
          <UserAvatar src={item.owner_id.user_img} />
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            marginLeft: "0.5rem",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <span>{item.owner_id.user_name} </span>
              <Link to={`/group/${item.group_id._id}/post`}>
                - {item.group_id.group_name}
              </Link>
            </div>
            <div style={{ color: "gray" }}>{formatDate}</div>
          </div>
          <div className="menuoption-wrap">
            <MenuOption
              className="menu-icon"
              width={40}
              height={40}
              onClick={() => setMenuToggle((prev) => !prev)}
            />
            {menuToggle && (
              <div className="menuoption-list">
                <div onClick={() => window.alert("구현 예정")}>공유하기</div>
                {userId === item.owner_id._id && (
                  <div onClick={() => window.alert("구현 예정")}>수정</div>
                )}
                {userId === item.owner_id._id && (
                  <div
                    onClick={() =>
                      window.alert("나중에 아토믹으로 분리, 조건문 사용할거")
                    }
                  >
                    삭제
                  </div>
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
    </PostUpperBodyWrap>
  );
}

const PostUpperBodyWrap = styled.section`
  margin-bottom: 1.25rem;
  .author-area {
    display: flex;
    width: 100%;
  }
  .img-wrap {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    overflow: hidden;
  }
  img {
    border-radius: 20px;
  }
  .post-img {
    width: 20%;
  }
  .menuoption-wrap {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

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
