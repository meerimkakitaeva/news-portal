import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";
import dayjs from "dayjs";
import {selectOnePost} from "./newsSlice";
import {fetchOneNews} from "./newsThunk";


const FullPost = () => {
    const {id} = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const post = useAppSelector(selectOnePost);

    useEffect(() => {
        dispatch(fetchOneNews(id));
    }, [dispatch]);

    let cardImage = '';

    if (post && post.image !== null) {
        cardImage = `http://localhost:8000/${post.image}`;
    }

    return (
        <>
            {post &&
                <Container maxWidth="lg">
                    <Card sx={{ mb: 3 }}>
                        <CardActionArea>
                            <CardContent>
                                <Grid container alignItems="center">
                                    <Grid item xs>
                                        <Typography gutterBottom component="div" sx={{ fontSize: '20px' }}>
                                            {post.title}
                                        </Typography>
                                        <Typography gutterBottom component="div" sx={{ color: 'gray', fontSize: '12px' }}>
                                            {dayjs(post.datetime).format('YYYY-MM-DD HH:mm:ss')}
                                        </Typography>
                                        <Typography gutterBottom component="div" >
                                            {post.content}
                                        </Typography>
                                        {cardImage && (
                                            <Grid item sx={{ marginLeft: '10px' }}>
                                                <CardMedia
                                                    component="img"
                                                    image={cardImage}
                                                    sx={{ width: '70px', height: '70px' }}
                                                />
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Container>
            }
        </>

    );
};

export default FullPost;