import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import client from "../../lib/api/client";
import { Post } from "../../modules/redux/Group";
import PostCard from "../common/postItem/PostCard";

export default function WrotedPost() {
  const [posts, setPosts] = useState<Post[]>();
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
      const { data }: { data: Post[] } = await client.get(`/getmyposts`, {
        params: { user_id: userId },
      });
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
      {posts &&
        posts.map((item) => {
          return <PostCard postItem={item} />;
        })}
    </WrotedPostWrap>
  );
}

const WrotedPostWrap = styled.div``;
