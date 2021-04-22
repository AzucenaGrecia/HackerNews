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
    news: JSON.parse(localStorage.getItem("news")) || [],
    delete_news:  []
  },
  reducers: {
    removeNews: function (state, action) {
      const newsFilter = state.news.filter(
        (item) => item.story_id !== action.payload.story_id
      );  
      const deletedNews = state.news.filter(item => item.story_id == action.payload.story_id);
      localStorage.setItem("news", JSON.stringify(newsFilter));
      state.news = newsFilter;
      console.log("deletenews",deletedNews[0]);
      // console.log(state.news);
    },
    // addDeleteNew(state, action) {
    //   console.log("action",action.payload);
    //   console.log(state.news);
    //   const deletedNews = state.news.find(item => {
    //     console.log("item",item);
    //     return item.story_id === action.payload.story_id
    //   });
    //   console.log(deletedNews);
    //   state.delete_news = [deletedNews, ...state.delete_news];
    //   localStorage.setItem('deletedNews', JSON.stringify(state.delete_news));
    // }
  },
  extraReducers: {
    [fecthNews.pending]: (state, action) => {
      state.status = "loading";
    },
    [fecthNews.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const newsFilter = action.payload.news.filter(
        (item) => item.story_url !== null
      );
      const objUniquesNews = newsFilter.reduce((acc, curr) => {
        if (!acc[curr.story_id]) acc[curr.story_id] = curr;
        return acc;
      }, {});
      localStorage.setItem(
        "news",
        JSON.stringify([...Object.values(objUniquesNews)])
      );
      state.news = [...Object.values(objUniquesNews)];
    },
    [fecthNews.failed]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export const { removeNews } = newsSlice.actions;

export default newsSlice.reducer;
