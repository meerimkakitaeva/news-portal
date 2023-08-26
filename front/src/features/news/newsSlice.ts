import {INews} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createPost, fetchNews} from "./newsThunk";
import {RootState} from "../../app/store";

interface NewsState {
    news: INews[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: NewsState = {
    news: [],
    fetchLoading: false,
    createLoading: false,
}

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchNews.pending, (state) => {
          state.fetchLoading = true;
      });
      builder.addCase(fetchNews.fulfilled, (state, action) => {
          state.fetchLoading = false;
          state.news = action.payload;
      });
      builder.addCase(fetchNews.rejected, (state) => {
          state.fetchLoading = true;
      });


      builder.addCase(createPost.pending, (state) => {
          state.fetchLoading = true;
      });
      builder.addCase(createPost.fulfilled, (state) => {
          state.fetchLoading = false;
      });
      builder.addCase(createPost.rejected, (state) => {
          state.fetchLoading = true;
      });
    }
});

export const newsReducer = newsSlice.reducer;
export const selectNews = (state: RootState) => state.news.news;
export const selectNewsLoading = (state: RootState) => state.news.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.news.createLoading;

