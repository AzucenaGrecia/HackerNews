import styled from "@emotion/styled";
import { Heading1, Heading5 } from "../text/heading";

export default function Header() {
  return (
    <StyledHeader>
      <Heading1 style={{ color: "white" }}>HN Feed</Heading1>
      <Heading5 style={{ color: "white" }}>We {"<3"} hacker news!</Heading5>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  width: 100%;
  padding: 32px;
  background-color: black;
`;
