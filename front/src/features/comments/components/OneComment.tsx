import React from 'react';
import {Button, Card, CardActionArea, CardContent, Grid, Typography} from '@mui/material';
import {useAppDispatch} from "../../../app/hooks";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
    id: string,
    author: string,
    content: string,
}

const OneComment: React.FC<Props> = ({id, author, content}) => {
    const dispatch = useAppDispatch();

    return (
        <Card sx={{ mb: 3 }}>
            <CardActionArea>
                <CardContent>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography gutterBottom component="div" >
                                {author} wrote : {content}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
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