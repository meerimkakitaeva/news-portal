import {createAsyncThunk} from "@reduxjs/toolkit";
import {IComment, ICommentMutation} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchComments = createAsyncThunk<IComment[], string>(
    'comments/fetchComments',
    async (id) => {
        const response = await axiosApi.get<IComment[]>('/comments?news_id=' + id);
        return response.data;
    }
);

export const createComment = createAsyncThunk<void, ICommentMutation>(
    'comments/createComment',
    async (comment) => {
        await axiosApi.post('comments', comment);
    }
);