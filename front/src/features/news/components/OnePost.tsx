import React from 'react';
import {Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import {selectDeleteLoading} from "../newsSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {deletePost, fetchNews} from "../newsThunk";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import {Link} from "react-router-dom";

const dayjs = require('dayjs');


interface Props {
    id: string,
    title: string,
    datetime: string,
    image?: string | null;
}

const OnePost: React.FC<Props> = ({id, title, datetime, image}) => {
    const dispatch = useAppDispatch();
    const deleteLoading = useAppSelector(selectDeleteLoading);

    const onDelete = async () => {
        if (window.confirm('Delete this post ?')) {
            await dispatch(deletePost(id));
            await dispatch(fetchNews());
        }
    };

    const productImage = image ? `http://localhost:8000/${image}` : '';
    const newDate = dayjs(datetime).format('YYYY-MM-DD HH:mm:ss');

    return (
        <Card sx={{ mb: 3 }}>
            <CardActionArea>
                <CardContent>
                    <Grid container alignItems="center">
                        {productImage && (
                            <Grid item sx={{ marginLeft: '10px' }}>
                                <CardMedia
                                    component="img"
                                    image={productImage}
                                    sx={{ width: '70px', height: '70px' }}
                                />
                            </Grid>
                        )}
                        <Grid item xs>
                            <Typography gutterBottom component="div" sx={{ fontSize: '20px' }}>
                                {title} ...
                            </Typography>
                            <Typography gutterBottom component="div" sx={{ color: 'gray', fontSize: '12px' }}>
                                {newDate}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={onDelete}
                                disabled={deleteLoading ? deleteLoading === id : false}
                                startIcon={<DeleteIcon />}
                            >
                                Delete
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                component={Link}
                                to={'/news/' + id}
                            >
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