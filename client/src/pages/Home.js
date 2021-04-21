import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/containers/Header";
import { fecthNews } from "../features/news/NewsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);

  useEffect(() => {
    dispatch(fecthNews());
  }, []);

  return (
    <>
      <Header/>
      {news.map((item) => {
        return <p>{item.story_title}</p>;
      })}
    </>
  );
}

