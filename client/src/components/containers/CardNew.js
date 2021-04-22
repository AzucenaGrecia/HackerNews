import styled from "@emotion/styled";
import { format, isToday, isYesterday } from "date-fns";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { removeNews } from "../../features/news/NewsSlice";

export default function CardNew({ story_id, children, author, date, onClick }) {
  let newDate = new Date(date);
  let today = isToday(newDate);
  let yesterday = isYesterday(newDate)
  let formatDate = null;
  const dispatch = useDispatch();

  console.log("today",today)
  console.log("yesterday",yesterday)
  if (today) {
    formatDate = format(newDate, "HH:mm aaaa");
  } else if (yesterday) {
    formatDate = "Yesterday";
  } else {
    formatDate = format(newDate, "dd LLLL");
  }

  function handleDelete(story_id) {
    dispatch(removeNews({ story_id }));
  }

  return (
    <StyledCard>
      <div onClick={onClick}>
        {children}
        <span>- {author} -</span>
      </div>
      <div className="date_and_icon">
        {formatDate}

        <BsFillTrashFill onClick={() => handleDelete(story_id)} />
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
