import React from "react";
import { Link } from "react-router-dom";
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
            <div>
              <span>{item.owner_id.user_name} </span>
              <Link to={`/group/${item.group_id._id}/post`}>
                - {item.group_id.group_name}
              </Link>
            </div>
            <div style={{ color: "gray" }}>{formatDate}</div>
          </div>
          <div className="menuoption-wrap">
            <MenuOption width={40} height={40} />
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
