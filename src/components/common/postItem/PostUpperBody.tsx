import React from "react";
import styled from "styled-components";
import DateFormat from "../../../hook/DateFormat";
import { Post } from "../../../modules/redux/Group";
import { ReactComponent as MenuOption } from "../../static/svg/menuOption.svg";

interface PostUpperBodyProps {
  item: Post;
}

export default function PostUpperBody({ item }: PostUpperBodyProps) {
  const formatDate = DateFormat(item.created_at);
  return (
    <PostUpperBodyWrap>
      <div className="author-area">
        <div className="img-wrap">
          <img width={40} height={40} src={item.owner_id.user_img} />
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
            <div>{item.owner_id.user_name}</div>
            <div>{formatDate}</div>
          </div>
          <div className="menuoption-wrap">
            <MenuOption width={40} height={40} />
          </div>
        </div>
      </div>
      <div>{item.text}</div>
    </PostUpperBodyWrap>
  );
}

const PostUpperBodyWrap = styled.section`
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
  .menuoption-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    color: var(--fixed-color1);
    cursor: pointer;
  }
  .menuoption-wrap:hover {
    background: var(--fixed-color1);
  }
`;
