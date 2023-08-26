import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {INews, INewsMutation} from "../../types";

export const fetchNews = createAsyncThunk<INews[]>(
    'news/fetchAll',
    async () => {
        const newsResponse = await axiosApi.get<INews[]>('/news');
        return newsResponse.data;
    }
);
export const createPost = createAsyncThunk<void, INewsMutation>(
    'news/create',
    async (post) => {
        const formData = new FormData();

        const keys = Object.keys(post) as (keyof INewsMutation)[];
        keys.forEach(key => {
            const value = post[key];

            if (value !== undefined && value !== null) {
                formData.append(key, value);
            }
        });

        await axiosApi.post('/news', formData);
    }
);

export const fetchOneNews = createAsyncThunk<INews, string>(
    'news/fetchOnePost',
    async (id) => {
        const response = await axiosApi.get<INews>('/news/' + id);
        return response.data;
    }
);

export const deletePost = createAsyncThunk<void, string>(
    'news/deleteOnePost',
    async (id) => {
        await axiosApi.delete('/news/' + id);
    }
);



