import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { GROUP_EMPTY, GROUP_REQUEST } from "../../modules/redux/Group";
import Loading from "../Loading";

interface GroupBodyProps {
  group_id: string | undefined | null;
}

export default function GroupBody({ group_id }: GroupBodyProps) {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  const groupSelector = useSelector((state: any) => state.groupSliceReducer);
  const dispatch = useDispatch();
  console.log(groupSelector);

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entries[0].intersectionRatio <= 0)
        return console.log("인터섹션라티오", entries[0].intersectionRatio);
      if (entries[0].isIntersecting && groupSelector.groupLoading === false) {
        const data = {
          group_id: group_id,
          page: groupSelector.groupPageNumber,
        };
        dispatch(GROUP_REQUEST(data));
      }
    },
    [
      group_id,
      groupSelector.groupPageNumber,
      groupSelector.groupLoading,
      dispatch,
    ]
  );

  useEffect(() => {
    if (target) {
      let intersectionObserver = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      intersectionObserver.observe(target);
      return () => {
        intersectionObserver && intersectionObserver.disconnect();
      };
    }
  }, [target, onIntersect]);

  useEffect(() => {
    return () => {
      dispatch(GROUP_EMPTY("dummy"));
    };
  }, []);

  return (
    <GroupBodyWrap>
      <div>에어리어</div>
      <aside>그룹정보영역{groupSelector.groupPageNumber}</aside>
      <main>
        {groupSelector.groupPosts.map((item: any, index: number) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "150px",
              }}
              key={index}
            >
              <div>
                <div>{item.group_id.group_name}</div>
                <div>{item.text}</div>
                <div>
                  {item.owner_id !== null ? item.owner_id.user_name : "null"}
                </div>
                <div>{item.created_at}</div>
              </div>
              <div>
                {item.comment.map((commentItem: any) => {
                  return (
                    <div
                      key={commentItem._id}
                      style={{ backgroundColor: "beige" }}
                    >
                      {commentItem.text}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {groupSelector.groupLoading &&
        groupSelector.groupPageEnd === false ? (
          <Loading />
        ) : (
          <div>더이상 게시글이 없습니다.</div>
        )}
        <div ref={setTarget}></div>
      </main>
    </GroupBodyWrap>
  );
}

const GroupBodyWrap = styled.div``;
