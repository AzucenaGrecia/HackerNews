import { el } from "date-fns/locale";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardNew from "../components/containers/CardNew";
import Header from "../components/containers/Header";
import { fecthNews } from "../features/news/NewsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const delete_news = useSelector((state) => state.news.delete_news);
  // const newsSort = news.sort(function (a, b) {
  //   return new Date(a.created_at) - new Date(b.created_at);
  // });

  useEffect(() => {
    dispatch(fecthNews());
  }, []);

  function OpenUrl(link) {
    window.open(link);
  }

 

  // console.log(newsSort);

  return (
    <>
      <Header />
      {news.map((item) => {
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
