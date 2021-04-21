import styled from "@emotion/styled";
import { differenceInDays, format } from "date-fns";
import { BsFillTrashFill } from "react-icons/bs";

export default function CardNew({ children, author, date, onClick }) {
  let newDate = new Date(date);
  let result = differenceInDays(Date.now(), newDate);
  let formatDate = null;

  if (result <= 1) {
    formatDate = format(newDate, "HH:mm aaaa");
    console.log(formatDate);
  } else if (result === 2) {
    formatDate = "Yesterday";
  } else {
    formatDate = format(newDate, "dd LLL");
  }

  return (
    <StyledCard onClick={onClick}>
      <div>
        {children}
        <span>- {author} -</span>
      </div>
      <div class="date_and_icon">
        {formatDate}
        <BsFillTrashFill />
      </div>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  border-bottom: 1px solid #cccccc;
  padding: 32px;
  margin: 0px 32px;
  display: flex;
  justify-content: space-between;
  :hover {
    background-color: #ccc;
    svg {
      visibility: visible;
    }
  }

  span {
    color: #999;
    margin: 4px;
  }
  .date_and_icon {
    display: flex;
    gap: 32px;
  }
  svg {
    visibility: hidden;
  }
`;
