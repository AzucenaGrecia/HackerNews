import styled from "@emotion/styled";

export default function CardNew({ children, author, date, onClick }) {
  return (
    <StyledCard onClick={onClick}>
      <div>
        {children}
        <span>- {author} -</span>
      </div>
      <div>{date}</div>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  border-bottom: 1px solid #cccccc;
  padding: 32px;
  margin: 0px 32px;
  display: flex;
  justify-content: space-between;
  span {
    color: #999;
    margin: 4px;
  }
`;
