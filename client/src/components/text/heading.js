import { css } from "@emotion/react";
import styled from "@emotion/styled";

const baseStyles = css`
  font-weight: 700;
`;
export const Heading1 = styled.h1`
  ${baseStyles}
  font-size:90px;
  ${(props) => props.style}
`;
export const Heading5 = styled.h5`
  ${baseStyles}
  font-size:29px;
  ${(props) => props.style}
`;
