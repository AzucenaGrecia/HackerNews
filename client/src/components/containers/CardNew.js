import styled from "@emotion/styled";
import { differenceInDays, format } from "date-fns";
import { BsFillTrashFill } from "react-icons/bs";

export default function CardNew({ story_id, children, author, date, onClick }) {
  let newDate = new Date(date);
  let result = differenceInDays(Date.now(), newDate);
  let formatDate = null;

  if (result <= 1) {
    formatDate = format(newDate, "HH:mm aaaa");
  } else if (result === 2) {
    formatDate = "Yesterday";
  } else {
    formatDate = format(newDate, "dd LLL");
  }

  function handleDelete(story_id) {
    console.log("Borra!",story_id );
    // const arrayUnqNewsLocalStorage = localStorage.getItem("arrayUnqNews");
    // const newarray = JSON.parse(arrayUnqNewsLocalStorage).filter(item => item.story_id != story_id)
    // localStorage.clear("arrayUnqNews");
    // localStorage.setItem("arrayUnqNews",newarray);

    // console.log(JSON.parse(arrayUnqNewsLocalStorage).length, newarray.length)
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
