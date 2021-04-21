import styled from "@emotion/styled";

export default function CardNew({ children, author, onClick }) {
  return (
    <StyledCard onClick={onClick}>
      {children}
      <span>- {author} -</span>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  border-bottom: 1px solid #cccccc;
  padding: 32px;
  margin: 0px 32px;
  span {
    color: gray;
    margin: 4px;
  }
`;
