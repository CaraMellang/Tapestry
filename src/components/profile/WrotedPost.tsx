import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import client from "../../lib/api/client";
import { Post } from "../../modules/redux/Group";
import MyGroupList from "../common/myGroupList/MyGroupList";
import PostCard from "../common/postItem/PostCard";

export default function WrotedPost() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const userId = useSelector(
    (state: any) => state.userSliceReducer.user.userId
  );

  const getPosts = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const {
        data: { data },
      }: { data: { data: Post[] } } = await client.get(`/profile/getmyposts`, {
        params: { user_id: userId, page: 1 },
      });
      console.log("하위", data);
      setPosts(data);
      setLoading(false);
    } catch (err) {
      console.dir(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <WrotedPostWrap>
      <MyGroupList />
      <div style={{ width: "950px" }}>
        {posts.length > 0 &&
          posts.map((item) => {
            return <PostCard postItem={item} />;
          })}
      </div>
    </WrotedPostWrap>
  );
}

const WrotedPostWrap = styled.div`
  width: 1200px;
  margin: auto;
  margin-top: 2rem;
  display: flex;
`;
