import {IComment} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createComment, fetchComments} from "./commentsThunk";

interface CommentsState {
    comments: IComment[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: CommentsState = {
    comments: [],
    fetchLoading: false,
    createLoading: false,
}

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.fetchLoading = false;
            state.comments = action.payload;
        });
        builder.addCase(fetchComments.rejected, (state) => {
            state.fetchLoading = true;
        });

        builder.addCase(createComment.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createComment.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createComment.rejected, (state) => {
            state.createLoading = true;
        });
    }
});

export const commentsReducer = commentsSlice.reducer;
export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsLoading = (state: RootState) => state.comments.fetchLoading;
export const selectCreateCommentLoading = (state: RootState) => state.comments.createLoading;
