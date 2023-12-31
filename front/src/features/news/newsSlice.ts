import {INews} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createPost, deletePost, fetchNews, fetchOneNews} from "./newsThunk";
import {RootState} from "../../app/store";

interface NewsState {
    news: INews[];
    onePost: INews | null,
    fetchLoading: boolean;
    createLoading: boolean;
    fetchOneLoading: boolean;
    deleteLoading: boolean | string;
}

const initialState: NewsState = {
    news: [],
    onePost: null,
    fetchLoading: false,
    createLoading: false,
    fetchOneLoading: false,
    deleteLoading: false,
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
          state.createLoading = true;
      });
      builder.addCase(createPost.fulfilled, (state) => {
          state.createLoading = false;
      });
      builder.addCase(createPost.rejected, (state) => {
          state.createLoading = true;
      });

      builder.addCase(fetchOneNews.pending, (state) => {
         state.fetchOneLoading = true;
      });
      builder.addCase(fetchOneNews.fulfilled, (state, action) => {
          state.fetchOneLoading = false;
          state.onePost = action.payload;
      });
      builder.addCase(fetchOneNews.rejected, (state) => {
          state.fetchOneLoading = true;
      });


      builder.addCase(deletePost.pending, (state) => {
          state.deleteLoading = true;
      });
      builder.addCase(deletePost.fulfilled, (state) => {
          state.deleteLoading = false;
      });
      builder.addCase(deletePost.rejected, (state) => {
          state.deleteLoading = true;
      });
    }
});

export const newsReducer = newsSlice.reducer;
export const selectNews = (state: RootState) => state.news.news;
export const selectNewsLoading = (state: RootState) => state.news.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.news.createLoading;
export const selectOneLoading = (state:RootState) => state.news.fetchOneLoading;
export const selectOnePost = (state: RootState) => state.news.onePost;
export const selectDeleteLoading = (state: RootState) => state.news.deleteLoading;


