import { Avatar, AvatarProps, AvatarTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";

interface UserAvatarProps
  extends AvatarProps{}
// interface UserAvatarProps
//   extends Omit<
//     React.DetailedHTMLProps<
//       React.ImgHTMLAttributes<HTMLImageElement>,
//       HTMLImageElement
//     >,
//     "ref"
//   > {}

export default function UserAvatar({ ...rest }: UserAvatarProps) {
  return <Avatar {...rest} />;
}
