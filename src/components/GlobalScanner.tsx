import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { IGlobalValue } from '../types';
import Paper from './Paper';

export default function GlobalScanner(props: { globalValues: IGlobalValue[] }) {
    const dataText = (data: { title: string, value: string, isMoney: boolean }) => {
        if (data.isMoney) {
            return (<>
                <Typography variant="h3" display="inline">{data.value}</Typography>&nbsp;
                <Typography variant="body1" display="inline">cUSD</Typography>
            </>);
        }
        return <Typography variant="h3">{data.value}</Typography>;
    }

    return <Grid container justify="space-between" spacing={2}>
        {props.globalValues.map((total) => (
            <Grid key={total.title} item xs={6} sm={3}>
                <Paper style={{ padding: 10 }}>
                    <Typography variant="h4">
                        {total.title}
                    </Typography>
                    {dataText(total)}
                </Paper>
            </Grid>
        ))}
    </Grid>

}
