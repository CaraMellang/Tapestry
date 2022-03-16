import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import {
  GROUP_FEED_EMPTY,
  GROUP_FEED_REQUEST,
} from "../../modules/redux/GroupFeed";
import Loading from "../Loading";

export default function GroupFeed() {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  const groupFeedSelector = useSelector(
    (state: any) => state.groupFeedSliceReducer
  );
  const userSelector = useSelector((state: any) => state.userSliceReducer);
  const groupsSelector = useSelector((state: any) => state.groupsSliceReducer);
  const dispatch = useDispatch();

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entries[0].intersectionRatio <= 0)
        return console.log("인터섹션라티오", entries[0].intersectionRatio);
      if (
        entries[0].isIntersecting &&
        groupFeedSelector.groupFeedLoading === false
      ) {
        console.log(groupsSelector.groups);
        const data = {
          group_arr: groupsSelector.groups,
          page: groupFeedSelector.groupPageNumber,
        };
        dispatch(GROUP_FEED_REQUEST(data));
      }
    },
    [
      groupFeedSelector.groupPageNumber,
      groupFeedSelector.groupFeedLoading,
      groupsSelector.group,
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
      dispatch(GROUP_FEED_EMPTY("dummy"));
    };
  }, []);

  return (
    <div>
      <h1 className="dd">그룹피드{groupFeedSelector.groupPageNumber}</h1>
      <div>
        {groupFeedSelector.groupFeeds.map((item: any, index: number) => {
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
        {groupFeedSelector.groupFeedLoading &&
        groupFeedSelector.groupPageEnd === false ? (
          <Loading />
        ) : (
          <div>더이상 게시글이 없습니다.</div>
        )}
        <div ref={setTarget}>인식범위 입니다.(옵저버)</div>
      </div>
    </div>
  );
}
