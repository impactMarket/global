import React from 'react';
import { createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { IGlobalValue } from '../types';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            fontFamily: 'Gelion'
        },
        description: {
            fontFamily: 'Gelion'
        },
    }),
);

const paper = {
    padding: 10
};


export default function GlobalScanner(props: { globalValues: IGlobalValue[] }) {
    const classes = useStyles();

    const dataText = (data: { title: string, value: string, isMoney: boolean }) => {
        if (data.isMoney) {
            return <Typography variant="body1" className={classes.description} gutterBottom>
                <span style={{ fontFamily: 'Gelion', fontWeight: 550, fontSize: 30 }}>${data.value}</span> cUSD
            </Typography>;
        }
        return <Typography variant="body1" className={classes.description} gutterBottom>
            <span style={{ fontFamily: 'Gelion', fontWeight: 550, fontSize: 30 }}>{data.value}</span>
        </Typography>;
    }

    return <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
                {props.globalValues.map((total) => (
                    <Grid key={total.title} item>
                        <Paper elevation={3} style={{ ...paper, width: 250 }}>
                            <Typography variant="h6" className={classes.title} gutterBottom>
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
