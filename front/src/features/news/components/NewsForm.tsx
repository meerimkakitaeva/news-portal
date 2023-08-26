import React, {useState} from 'react';
import {Container, Grid, TextField,} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import FileInput from "../../../components/UI/FileInput/FileInput";
import {selectCreateLoading} from "../newsSlice";
import {INewsMutation} from "../../../types";
import {createPost} from "../newsThunk";
import {useNavigate} from "react-router";

const NewsForm = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectCreateLoading);
    const navigate= useNavigate();

    const [state, setState] = useState<INewsMutation>({
        title: '',
        content: '',
        image: null,
    });

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setState(prevState => ({
                ...prevState, [name]: files[0]
            }));
        }
    };

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        await dispatch(createPost(state));
        navigate('/');
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    return (
        <Container maxWidth="md">
            <form
                autoComplete="off"
                onSubmit={submitFormHandler}
            >
                <Grid container direction="column" spacing={2}>
                    <Grid item xs>
                        <TextField
                            id="title" label="title"
                            value={state.title}
                            onChange={inputChangeHandler}
                            name="title"
                            required
                        />
                    </Grid>

                    <Grid item xs>
                        <TextField
                            id="content" label="content"
                            value={state.content}
                            onChange={inputChangeHandler}
                            name="content"
                            required
                        />
                    </Grid>

                    <Grid item xs>
                        <FileInput
                            onChange={fileInputChangeHandler}
                            name="image"
                            label="image"
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

export default NewsForm;