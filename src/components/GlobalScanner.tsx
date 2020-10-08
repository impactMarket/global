import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { IGlobalValue } from '../types';
import { useStyles } from '../helpers/theme';

export default function GlobalScanner(props: { globalValues: IGlobalValue[] }) {
    const classes = useStyles();

    const dataText = (data: { title: string, value: string, isMoney: boolean }) => {
        if (data.isMoney) {
            return <Typography variant="body1">
                <span style={{ fontFamily: 'Gelion', fontWeight: 550, fontSize: 30 }}>${data.value}</span> cUSD
            </Typography>;
        }
        return <Typography variant="body1">
            <span style={{ fontFamily: 'Gelion', fontWeight: 550, fontSize: 30 }}>{data.value}</span>
        </Typography>;
    }

    return <Grid container style={{ flexGrow: 1 }} spacing={2}>
        <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
                {props.globalValues.map((total) => (
                    <Grid key={total.title} item>
                        <Paper elevation={3} style={{ padding: 10, width: 250 }}>
                            <Typography variant="h6">
                                {total.title}
                            </Typography>
                            {dataText(total)}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    </Grid>

}
