import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { IGlobalValue } from '../types';

export default function GlobalScanner(props: { globalValues: IGlobalValue[] }) {
    const dataText = (data: { title: string, value: string, isMoney: boolean }) => {
        if (data.isMoney) {
            return <Typography variant="body1">
                <Typography variant="h3" display="inline">${data.value}</Typography> cUSD
            </Typography>;
        }
        return <Typography variant="body1">
            <Typography variant="h3">{data.value}</Typography>
        </Typography>;
    }

    return <Grid container justify="space-between" spacing={2}>
        {props.globalValues.map((total) => (
            <Grid key={total.title} item xs={3}>
                <Paper elevation={3} style={{ padding: 10 }}>
                    <Typography variant="h4">
                        {total.title}
                    </Typography>
                    {dataText(total)}
                </Paper>
            </Grid>
        ))}
    </Grid>

}
