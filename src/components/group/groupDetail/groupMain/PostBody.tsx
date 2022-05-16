import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";
import { Post } from "../../../../modules/redux/Group";
import DateFormat from "../../../../hook/DateFormat";
import { ReactComponent as MenuOption } from "../../../static/svg/menuOption.svg";

interface PostBodyProps {
  item: Post;
}

export default function PostBody({ item }: PostBodyProps) {
  const formatDate = DateFormat(item.created_at);
  console.log("z", formatDate);

  return (
    <PostBodyWrap>
      <div className="author-area">
        {/* {item.group_id.group_name} */}
        <div className="imgWrap">
          <img width={40} height={40} src={item.owner_id.user_img} />
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
            {/* <div>
              {dayjs(item.created_at).get("hour") < 12
                ? dayjs(item.created_at).format("YYYY년MM월DD일 A오전 HH:mm")
                : dayjs(item.created_at).format(`YYYY년MM월DD일 오후 HH:mm`)}
            </div> */}
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
