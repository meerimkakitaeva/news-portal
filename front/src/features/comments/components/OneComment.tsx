import React from 'react';
import {Button, Card, CardActionArea, CardContent, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import {selectDeleteCommentLoading} from "../commentsSlice";
import {deleteComment, fetchComments} from "../commentsThunk";

interface Props {
    id: string,
    author: string,
    content: string,
    news_id: string
}

const OneComment: React.FC<Props> = ({id, author, content, news_id}) => {
    const dispatch = useAppDispatch();
    const deleteLoading = useAppSelector(selectDeleteCommentLoading);

    const onDelete = async () => {
        if (window.confirm('Delete this post ?')) {
            await dispatch(deleteComment(id));
            await dispatch(fetchComments(news_id));
        }
    };

    return (
        <Card sx={{ mb: 3 }}>
            <CardActionArea>
                <CardContent>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography gutterBottom component="div" >
                                {author} написал(а) : {content}
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
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default OneComment;