import { Avatar } from "@mui/material";
import React from "react";

interface UserAvatarProps {
  src: string;
}

export default function UserAvatar({ src }: UserAvatarProps) {
  return <Avatar src={src} />;
}
