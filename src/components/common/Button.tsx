import React, { ReactNode } from "react";
import styled from "styled-components";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

interface ButtonProps extends MuiButtonProps {
  children?: ReactNode;
}

export default function Button({ children, ...rest }: ButtonProps) {
  return <MuiButton {...rest}>{children}</MuiButton>;
}
