import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GROUP_EMPTY, GROUP_REQUEST } from "../../../../modules/redux/Group";
import Loading from "../../../Loading";
import GroupCreatePost from "./GroupCreatePost";
import GroupPostItem from "./GroupPostItem";

interface GroupBodyProps {}

export default function GroupBody() {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  const { _id: group_id } = useParams();
  const groupSelector = useSelector((state: any) => state.groupSliceReducer);
  const dispatch = useDispatch();

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
      //타겟이 안보이면 옵저빙이 해제되는듯, 개선의 필요가 있음.(몰?루)
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
      <GroupCreatePost />
      <div>
        {groupSelector.groupPosts.map((item: any, index: number) => {
          return (
            <div key={index}>
              <GroupPostItem postItem={item} group_id={group_id} />
            </div>
          );
        })}
        {groupSelector.groupLoading && groupSelector.groupPageEnd === false ? (
          <Loading />
        ) : (
          <div></div>
        )}
        <div ref={setTarget} style={{ height: "1rem" }}></div>
      </div>
    </GroupBodyWrap>
  );
}

const GroupBodyWrap = styled.div`
  .post-img {
    width: 20%;
  }
`;
