import React from 'react';
import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { selectDeleteLoading } from '../newsSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deletePost, fetchNews } from '../newsThunk';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Link } from 'react-router-dom';
import newsImage from "../../../assets/news.jpg";

import dayjs from 'dayjs';

interface Props {
    id: string;
    title: string;
    datetime: string;
    image?: string | null;
}

const OnePost: React.FC<Props> = ({ id, title, datetime, image }) => {
    const dispatch = useAppDispatch();
    const deleteLoading = useAppSelector(selectDeleteLoading);

    const onDelete = async () => {
        if (window.confirm('Delete this post ?')) {
            await dispatch(deletePost(id));
            await dispatch(fetchNews());
        }
    };

    const productImage = image ? `http://localhost:8000/${image}` : newsImage;
    const newDate = dayjs(datetime).format('YYYY-MM-DD HH:mm:ss');

    return (
        <Card sx={{ mb: 3 }}>
            <CardActionArea>
                <CardContent>
                    <Grid container spacing={2}>
                        {productImage && (
                            <Grid item xs={12} sm={4}>
                                <CardMedia
                                    component="img"
                                    image={productImage}
                                    sx={{ width: '100%', height: 'auto' }}
                                />
                            </Grid>
                        )}
                        <Grid item xs={12} sm={productImage ? 8 : 12}>
                            <Typography gutterBottom component="div" sx={{ fontSize: '20px' }}>
                                {title} ...
                            </Typography>
                            <Typography gutterBottom component="div" sx={{ color: 'gray', fontSize: '12px' }}>
                                {newDate}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={onDelete} disabled={deleteLoading ? deleteLoading === id : false} startIcon={<DeleteIcon />}>
                                Delete
                            </Button>
                            <Button component={Link} to={'/news/' + id}>
                                <ArrowCircleRightOutlinedIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default OnePost;
