import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { IGlobalValue } from '../types';
import Paper from './Paper';
import { useStyles } from '../helpers/theme';

export default function GlobalSummary(props: { globalValues: IGlobalValue[] }) {
    const classes = useStyles();

    const dataText = (data: { title: string, value: string, isMoney: boolean }) => {
        if (data.isMoney) {
            return (<>
                <Typography variant="h3" display="inline">{data.value}</Typography>&nbsp;
                <Typography variant="body1" display="inline">cUSD</Typography>
            </>);
        }
        return <Typography variant="h3">{data.value}</Typography>;
    }

    return <div className={classes.headerContainer}>
        <Container maxWidth="lg">
            <div>
                <Typography variant="h2" className={classes.header}>
                    Global Summary
                </Typography>
                <Typography variant="subtitle1" className={classes.subtitle1}>
                    Explore the main indicators of impactMarket system both on inflow of funds and distribution of basic income to beneficiaries through their UBI community contracts.
                </Typography>
            </div>
            <div style={{ margin: '16px 0px' }}>
                <Grid container justify="space-between" spacing={2}>
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
            </div>
        </Container>
    </div>
}
