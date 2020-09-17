import { createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import React from 'react';


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

export default function GlobalScanner() {
    const classes = useStyles();

    const totalValues = [
        {
            title: 'Total Raised',
            value: '2,360,401',
            isMoney: true,
        },
        {
            title: 'Total Distributed',
            value: '952,778',
            isMoney: true,
        },
        {
            title: 'Total Beneficiaries',
            value: '6,912',
            isMoney: false,
        },
        {
            title: 'Total Claims',
            value: '380,847',
            isMoney: false,
        },
    ];

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
                {totalValues.map((total) => (
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
