import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URI } from "../../app/config";

export const fecthNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await fetch(`${BASE_URI}/news`, {
    method: "GET",
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
    news: [],
  },
  reducers: {},
  extraReducers: {
    [fecthNews.pending]: (state, action) => {
      state.status = "loading";
    },
    [fecthNews.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.news = action.payload.news;
    },
    [fecthNews.failed]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export default newsSlice.reducer; 
