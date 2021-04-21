import { css } from "@emotion/react";
import styled from "@emotion/styled";

const baseStyles = css`
  font-weight: 400;
`;
export const Content = styled.p`
  ${baseStyles}
  font-size:13px;
  ${(props) => props.style}
`;

