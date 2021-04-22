import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URI } from "../../app/config";

export const fecthNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await fetch(`${BASE_URI}/news`, {
    method: "GET",
    headers: {},
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }
  return { news: data };
});

const newsSlice = createSlice({
  name: "news",
  initialState: {
    status: "iddle",
    error: null,
    news_server: [],
    news: JSON.parse(localStorage.getItem("news")) || [],
    delete_news_ids: JSON.parse(localStorage.getItem("delete_news_ids")) || [],
  },
  reducers: {
    removeNews: function (state, action) {
      const newsFilter = state.news.filter(
        (item) => item.story_id !== action.payload.story_id
      );
      const deletedNews = state.news.find(
        (item) => item.story_id == action.payload.story_id
      );
      state.news = newsFilter;
      state.delete_news_ids = [deletedNews.story_id, ...state.delete_news_ids];

      localStorage.setItem("news", JSON.stringify(newsFilter));
      localStorage.setItem(
        "delete_news_ids",
        JSON.stringify(state.delete_news_ids)
      );
    },
  },
  extraReducers: {
    [fecthNews.pending]: (state, action) => {
      state.status = "loading";
    },
    [fecthNews.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.news_server = action.payload.news;

      const newsFilter = action.payload.news.filter(
        (item) => item.story_id !== null
      );
      const objUniquesNews = newsFilter.reduce((acc, curr) => {
        if (!acc[curr.story_id]) acc[curr.story_id] = curr;
        return acc;
      }, {});

      state.news = [...Object.values(objUniquesNews)]
        .sort(function (a, b) {
          return new Date(b.created_at) - new Date(a.created_at);
        })
        .filter((item) => !state.delete_news_ids.includes(item.story_id));

      localStorage.setItem("news", JSON.stringify(state.news));
    },
    [fecthNews.failed]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export const { removeNews } = newsSlice.actions;

export default newsSlice.reducer;
