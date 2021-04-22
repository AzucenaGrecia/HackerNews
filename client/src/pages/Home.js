import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardNew from "../components/containers/CardNew";
import Header from "../components/containers/Header";
import { fecthNews } from "../features/news/NewsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const newsfilter = news.filter((item) => item.story_url != null);
  const arrayUnqNews = [
    ...new Map(
      newsfilter.map((item) => [
        item["story_id"],
        {
          story_id: item.story_id,
          story_title: item.story_title,
          story_url: item.story_url,
          author: item.author,
          created_at: new Date(item.created_at),
        },
      ])
    ).values(),
  ].sort((a, b) => b.created_at - a.created_at);

  localStorage.setItem("arrayUnqNews", JSON.stringify(arrayUnqNews));
  const arrayUnqNewsLocalStorage = localStorage.getItem("arrayUnqNews");

  useEffect(() => {
    dispatch(fecthNews());
  },[]);

  function OpenUrl(link) {
    window.open(link);
  }

  return (
    <>
      <Header />
      {JSON.parse(arrayUnqNewsLocalStorage).map((item) => {
        return (
          <CardNew
            key={item.story_id}
            story_id={item.story_id}
            author={item.author}
            date={item.created_at}
            onClick={() => OpenUrl(item.story_url)}
          >
            {item.story_title}
          </CardNew>
        );
      })}
    </>
  );
}
