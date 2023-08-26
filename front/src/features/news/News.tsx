import React, {useEffect} from 'react';
import {Container, Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import CircularProgress from '@mui/material/CircularProgress';
import {selectNews, selectNewsLoading} from "./newsSlice";
import OnePost from "./components/OnePost";
import {fetchNews} from "./newsThunk";

const News = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectNews);
    const fetchLoading = useAppSelector(selectNewsLoading);

    let news: React.ReactNode = <CircularProgress />;

    if (!fetchLoading) {
        const newPosts = [...items].reverse();
        news = newPosts.map((post) => (
            <OnePost
                id={post.id}
                key={post.id}
                title={post.title}
                datetime={post.datetime}
            />
        ));
    }

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{mb:3, mt: 2}} textAlign="center">
                        News :
                    </Typography>
                    { news }
                </Grid>
            </Grid>
        </Container>
    );
};

export default News;