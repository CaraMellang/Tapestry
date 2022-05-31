import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import client from "../../lib/api/client";
import { User } from "../../modules/redux/User";
import Loading from "../Loading";
import MyFollowingItem from "./MyFollowingItem";

export default function MyFollowing() {
  const [followers, setFollowers] = useState<User[]>();
  const [page, setPage] = useState(1);
  const [pageEnd, setPageEnd] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state: any) => state.userSliceReducer.user._id);

  const getFollowing = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const {
        data: { data, page_end },
      } = await client.get(`/profile/getmyfollowing`, {
        params: { user_id: userId, page },
      });
      console.log(data);
      setFollowers(data);
      setPageEnd(page_end);
      setLoading(false);
    } catch (err) {
      console.dir(err);
      setLoading(false);
    }
  };
  const nextPage = () => {
    setPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setPage((prev) => prev - 1);
  };
  useEffect(() => {
    getFollowing();
  }, [page]); //pagenation용

  useEffect(() => {
    getFollowing();
  }, []);

  return (
    <MyFollowingWrap>
      <h2 style={{ fontWeight: "bold" }}>내 팔로잉</h2>
      {loading ? (
        <Loading />
      ) : (
        followers &&
        followers.map((item) => (
          <MyFollowingItem
            key={item._id}
            item={item}
            getFollowing={getFollowing}
          />
        ))
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {page === 1 ? (
            <button
              className="pagenation-btn"
              style={{
                opacity: "0.5",
                cursor: "not-allowed",
              }}
              disabled
            >
              이전페이지
            </button>
          ) : (
            <button className="pagenation-btn" onClick={prevPage}>
              이전페이지
            </button>
          )}
        </div>
        <div>
          {pageEnd ? (
            <button
              className="pagenation-btn"
              style={{
                opacity: "0.5",
                cursor: "not-allowed",
              }}
              disabled
            >
              다음페이지
            </button>
          ) : (
            <button className="pagenation-btn" onClick={nextPage}>
              다음페이지
            </button>
          )}
        </div>
      </div>
    </MyFollowingWrap>
  );
}

const MyFollowingWrap = styled.div`
  width: 768px;
  margin: auto;
  margin-top: 2rem;
  min-height: 500px;
  .pagenation-btn {
    color: white;
    background: var(--primary1);
    border-radius: 4px;
    cursor: pointer;
  }
  .pagenation-btn:hover {
    background: var(--primary2);
  }
`;
