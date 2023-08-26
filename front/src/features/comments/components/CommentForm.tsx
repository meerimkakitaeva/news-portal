import React, {useState} from 'react';
import {Container, Grid, TextField,} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {ICommentMutation} from "../../../types";
import {selectCreateCommentLoading} from "../commentsSlice";
import {createComment, fetchComments} from "../commentsThunk";

interface Props {
    news_id: string,
}

const CommentForm:React.FC<Props> = ({news_id}) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectCreateCommentLoading);

    const [state, setState] = useState<ICommentMutation>({
        news_id: news_id,
        author: '',
        content: '',
    });

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        await dispatch(createComment(state));
        await dispatch(fetchComments(news_id));

        setState({
            news_id: news_id,
            author: '',
            content: '',
        })
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setState(prevState => {
            return {...prevState, [name]: value , news_id: news_id};
        });
    };

    return (
        <Container maxWidth="md" sx={{mt: 8, mb: 4}}>
            <h5>Добавьте комментарий: </h5>
            <form
                autoComplete="off"
                onSubmit={submitFormHandler}
            >
                <Grid container direction="column" spacing={2}>
                    <Grid item xs>
                        <TextField
                            id="news_id" label="news_id"
                            value={state.news_id}
                            onChange={inputChangeHandler}
                            name="news_id"
                            style={{ display: 'none' }}
                            required
                        />
                    </Grid>

                    <Grid item xs>
                        <TextField
                            id="author" label="author"
                            value={state.author}
                            onChange={inputChangeHandler}
                            name="author"
                        />
                    </Grid>

                    <Grid item xs>
                        <TextField
                            id="content" label="content"
                            value={state.content}
                            onChange={inputChangeHandler}
                            name="content"
                        />
                    </Grid>

                    <Grid item xs>
                        <LoadingButton
                            type="submit"
                            size="small"
                            endIcon={<SendIcon />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                        >
                            <span>Send</span>
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </Container>

    );
};

export default CommentForm;