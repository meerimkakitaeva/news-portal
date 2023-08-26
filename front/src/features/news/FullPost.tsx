import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";
import dayjs from "dayjs";
import {selectOnePost} from "./newsSlice";
import {fetchOneNews} from "./newsThunk";
import CircularProgress from "@mui/material/CircularProgress";
import {selectComments, selectCommentsLoading} from "../comments/commentsSlice";
import OneComment from "../comments/components/OneComment";
import {fetchComments} from "../comments/commentsThunk";
import CommentForm from "../comments/components/CommentForm";


const FullPost = () => {
    const {id} = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const post = useAppSelector(selectOnePost);

    const items = useAppSelector(selectComments);
    const fetchLoading = useAppSelector(selectCommentsLoading);

    let comments: React.ReactNode = <CircularProgress />;

    if (!fetchLoading) {
        const newComments = [...items].reverse();
        comments = newComments.map((comment) => (
            <>
                <OneComment
                    key={comment.id}
                    id={comment.id}
                    author={comment.author}
                    content={comment.content}
                    news_id={id}
                />
            </>
        ));
    }

    useEffect(() => {
        dispatch(fetchOneNews(id));
        dispatch(fetchComments(id));
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
                                    <Grid item xs sx={{display: "flex", justifyContent: "space-between"}}>
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
                                        </Grid>
                                        <Grid>
                                            {cardImage && (
                                                <Grid item sx={{ marginLeft: '10px' }}>
                                                    <CardMedia
                                                        component="img"
                                                        image={cardImage}
                                                        sx={{ width: '300px', height: '300px' }}
                                                    />
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Container maxWidth="sm" >
                        {comments && (
                            <Grid item xs={12} >
                                {comments}
                            </Grid>
                        )}
                        <CommentForm news_id={id}/>
                    </Container>
                </Container>
            }
        </>

    );
};

export default FullPost;