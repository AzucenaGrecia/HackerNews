import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fecthNews } from "../features/news/NewsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);

  useEffect(() => {
    dispatch(fecthNews());
  }, []);

  return (
    <>
      <h1>Soy home</h1>
      {news.map((item) => {
        return <p>{item.story_title}</p>;
      })}
    </>
  );
}
