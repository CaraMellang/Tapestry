import { group } from "console";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Group } from "../../../modules/redux/Groups";
import MyGroupListItem from "./MyGroupListItem";

export default function MyGroupList() {
  const groups: Group[] = useSelector(
    (state: any) => state.groupsSliceReducer.groups
  );

  return (
    <MyGroupListWrap>
      <div
        style={{
          background: "var(--bg-element2)",
          borderRadius: "0.5rem",
          padding: "0.5rem 0",
          position: "sticky", //height , top 속성이 필수
          minHeight: "200px",
          top: "100px",
        }}
      >
        <div
          style={{
            position: "relative",
            margin: "0 1rem",
            marginBottom: "0.5rem",
            borderBottom: "1px solid var(--color-text)",
          }}
        >
          <div
            style={{
              position: "relative",
              textAlign: "center",
              padding: "0.5rem 0",
            }}
          >
            내 그룹
          </div>
          <div
            style={{
              position: "absolute",
              background: "var(--color-text)",
              zIndex: "20",
              width: "10px",
              height: "10px",
              border: "2px solid var(--bg-element2)",
              borderRadius: "5px",
              bottom: "-5px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>
        <div style={{ margin: "0 1rem" }}>
          {groups.map((item) => (
            <MyGroupListItem item={item} />
          ))}
        </div>
      </div>
    </MyGroupListWrap>
  );
}

const MyGroupListWrap = styled.div`
  width: 250px;
  box-sizing: border-box;
  padding: 0 1rem;
`;
