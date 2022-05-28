import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import client from "../../lib/api/client";
import { User } from "../../modules/redux/User";
import MyFollowersItem from "./MyFollowersItem";

export default function MyFollowers() {
  const [followers, setFollowers] = useState<User[]>();
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state: any) => state.userSliceReducer.user._id);

  useEffect(() => {
    (async function () {
      const {
        data: { data },
      } = await client.get(`/profile/getmyfollower`, {
        params: { user_id: userId, page: 1 },
      });
      console.log(data);
      setFollowers(data);
    })();
  }, []);

  return (
    <MyFollowersWrap>
      {followers &&
        followers.map((item) => <MyFollowersItem key={item._id} item={item} />)}
    </MyFollowersWrap>
  );
}

const MyFollowersWrap = styled.div``;
