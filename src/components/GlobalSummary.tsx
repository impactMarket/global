import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { IGlobalDailyState } from '../types';
import Paper from './Paper';
import { useStyles } from '../helpers/theme';
import Box from './Box';
import { currencyValue, humanifyNumber, numericalValue } from '../helpers';

export default function GlobalSummary(props: { globalValues: IGlobalDailyState }) {
    const classes = useStyles();

    const inflowOutflowValues = [
        {
            title: 'Total Raised',
            subtitle: currencyValue(humanifyNumber(props.globalValues.totalRaised)),
            postsubtitle: 'cUSD',
        },
        {
            title: 'Total Distributed',
            subtitle: currencyValue(humanifyNumber(props.globalValues.totalDistributed)),
            postsubtitle: 'cUSD',
        },
        {
            title: 'Total Beneficiaries',
            subtitle: numericalValue(props.globalValues.totalBeneficiaries.toString()),
        },
        {
            title: 'Total Backers',
            subtitle: numericalValue(props.globalValues.totalBackers.toString()),
        },
    ];

    const ubiPulseValues = [
        {
            title: 'Giving Rate per Backer',
            subtitle: '~' + currencyValue(props.globalValues.givingRate.toString()),
            postsubtitle: '/Day',
        },
        {
            title: 'UBI Rate per Beneficiary',
            subtitle: currencyValue(props.globalValues.ubiRate.toString()),
            postsubtitle: '/Day',
        },
        {
            title: 'Avg Cumulative UBI',
            subtitle: '~' + currencyValue(humanifyNumber(props.globalValues.avgComulativeUbi), false),
            postsubtitle: '/Beneficiary',
        },
        {
            title: 'Avg. UBI duration',
            subtitle: '~' + numericalValue(props.globalValues.avgUbiDuration.toString(), false),
            postsubtitle: 'Months/Beneficiary',
        },
    ];

    const economicActivityValues = [
        {
            title: 'Total Volume',
            subtitle: currencyValue(humanifyNumber(props.globalValues.totalVolume)),
            postsubtitle: 'cUSD',
        },
        {
            title: '#Transactions',
            subtitle: numericalValue(props.globalValues.totalTransactions.toString()),
        },
        {
            title: 'Reach',
            subtitle: numericalValue(props.globalValues.totalReach.toString()),
        },
        {
            title: 'Spending Rate',
            subtitle: '- -',
        },
    ];

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
                <Typography variant="subtitle1">
                    Explore the main indicators of impactMarket system both on inflow of funds and distribution of basic income to beneficiaries through their UBI community contracts.
                </Typography>
            </div>
            <div style={{ margin: '16px 0px' }}>
                <Typography variant="h5" className={classes.header}>
                    Inflow / Outflow
                </Typography>
                <Grid container justify="space-between" spacing={2}>
                    {inflowOutflowValues.map((total) => (
                        <Grid key={total.title} item xs={6} sm={3}>
                            <Paper style={{ padding: 10 }}>
                                {/* <Typography variant="h4">
                                    {total.title}
                                </Typography>
                                {dataText(total)} */}
                                <Box
                                    title={total.title}
                                    subtitle={total.subtitle}
                                    postsubtitle={total.postsubtitle}
                                />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <Typography variant="h5" className={classes.header}>
                    UBI Pulse
                </Typography>
                <Grid container justify="space-between" spacing={2}>
                    {ubiPulseValues.map((total) => (
                        <Grid key={total.title} item xs={6} sm={3}>
                            <Paper style={{ padding: 10 }}>
                                {/* <Typography variant="h4">
                                    {total.title}
                                </Typography>
                                {dataText(total)} */}
                                <Box
                                    title={total.title}
                                    subtitle={total.subtitle}
                                    postsubtitle={total.postsubtitle}
                                />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                <Typography variant="h5" className={classes.header}>
                    Economic activity
                </Typography>
                <Grid container justify="space-between" spacing={2}>
                    {economicActivityValues.map((total) => (
                        <Grid key={total.title} item xs={6} sm={3}>
                            <Paper style={{ padding: 10 }}>
                                {/* <Typography variant="h4">
                                    {total.title}
                                </Typography>
                                {dataText(total)} */}
                                <Box
                                    title={total.title}
                                    subtitle={total.subtitle}
                                    postsubtitle={total.postsubtitle}
                                />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    </div>
}
