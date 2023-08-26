import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from '@mui/material';
const dayjs = require('dayjs');

interface Props {
    title: string,
    datetime: string,
    image?: string | null;
}

const OnePost: React.FC<Props> = ({title, datetime, image}) => {

    const productImage = image ? `http://localhost:8000/${image}` : '';
    const newDate = dayjs(datetime).format('YYYY-MM-DD HH:mm:ss');

    return (
        <Card sx={{ mb: 3 }}>
            <CardActionArea>
                <CardContent sx={{ display: 'flex'}}>
                    <Grid>
                        {productImage && <Grid sx={{marginLeft: '10px'}}>
                            <CardMedia component="img" image={productImage} sx={{ width: '70px', height: '70px' }} />
                        </Grid>}
                        <Typography gutterBottom  component="div" sx={{fontSize: '20px' }}>
                            { title } ...
                        </Typography>
                        <Typography gutterBottom component="div" sx={{ color: 'gray', fontSize: '12px' }}>
                            { newDate }
                        </Typography>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default OnePost;