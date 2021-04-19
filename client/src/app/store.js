import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/news/NewsSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});
