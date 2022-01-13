import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import FeedHeader from "../components/feed/FeedHeader";
import GroupFeed from "../components/feed/GroupFeed";
import NewFeed from "../components/feed/NewFeed";
import Popular from "../components/feed/Popular";

export default function Feed() {
  return (
    <FeedWrap>
      <h1>feed</h1>
      <div>새글, 인기글 , 내 그룹내 게시글(최신순 으로 정렬)</div>
      <FeedHeader />
      <div>
        <Routes>
          <Route path={`newfeed`} element={<NewFeed />} />
          <Route path={`popular`} element={<Popular />} />
          <Route path={`groupfeed`} element={<GroupFeed />} />
        </Routes>
        {/* 1. 인기글
        <p>
          1) 인기글 인기글은 각 카페에서 멤버들이 관심을 갖고 많은 반응을 보인
          게시글로, 24시간 내 조회 수/댓글 수/좋아요 수 등을 조합해 자동으로
          추출합니다. 하루 2번, 1시와 15시에 최대 200개 내외의 인기글이
          소개됩니다.
        </p>
        <p>
          2) 댓글 TOP, 좋아요 TOP 댓글을 많이 받은 게시글, 좋아요를 많이 받은
          게시글을 최대 200개까지 볼 수 있습니다. 날짜 옵션이 제공되며 최근 7일,
          30일, 전체 옵션을 선택할 수 있습니다. 하루 한 번 업데이트됩니다. 각
          카페 운영 원칙과 맞지 않는 게시글은 개별 카페 관리자에 의해 인기글
          목록에서 제외될 수 있습니다.
        </p>
        <p>
          2. 인기멤버 인기멤버는 일주일 간 작성한 게시글 수와 멤버들로부터 받은
          게시글 조회 수/댓글 수/좋아요 수/멤버 알림을 받은 수를 조합해 주
          1회(매주 월요일) 자동으로 추출합니다. 월요일부터 일요일까지의 데이터를
          기준으로 매주 월요일 새로운 인기멤버가 추출되며, 최대 10명까지
          소개됩니다. 단, 아래와 같은 경우 인기멤버가 추출되지 않습니다. - 추출
          기준에 맞는 대상의 멤버가 없는경우 - 카페가 징계 중이거나, 성인 및
          비공개 카페인 경우
        </p> */}
      </div>
    </FeedWrap>
  );
}

const FeedWrap = styled.div`
  color: black;
`;
