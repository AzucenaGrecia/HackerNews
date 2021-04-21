import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardNew from "../components/containers/CardNew";
import Header from "../components/containers/Header";
import { fecthNews } from "../features/news/NewsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);

  useEffect(() => {
    dispatch(fecthNews());
  }, []);

  function OpenUrl(link) {
    window.open(link);
  }

  return (
    <>
      <Header />
      {news.map((item) => {
        return (
          <CardNew author={item.author} onClick={() => OpenUrl(item.story_url)}>
            {item.story_title}
          </CardNew>
        );
      })}
    </>
  );
}
