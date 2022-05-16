import React from "react";
import styled from "styled-components";
import { Post } from "../../../modules/redux/Group";

interface PostCardProps {
  item: Post;
}

export default function PostCard({ item }: PostCardProps) {
  return <PostCardWrap>{item.text}</PostCardWrap>;
}

const PostCardWrap = styled.div``;
