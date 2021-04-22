import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardNew from "../components/containers/CardNew";
import Header from "../components/containers/Header";
import { fecthNews } from "../features/news/NewsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  console.log(news);

  useEffect(() => {
    dispatch(fecthNews());
  }, []);

  // implemntar un setInterval que cada 1 hora, pues haga un dispatch(fecthNews())
  
  function OpenUrl(link) {
    window.open(link);
  }

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
