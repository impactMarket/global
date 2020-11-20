import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { IGlobalDailyState } from '../types';
import Paper from './Paper';
import { useStyles } from '../helpers/theme';
import Box from './Box';
import { currencyValue, humanifyNumber, numericalValue } from '../helpers';
import BigNumber from 'bignumber.js';

export default function GlobalSummary(props: { globalValues: IGlobalDailyState; todayData: { totalClaimed: string, totalBeneficiaries: number, totalRaised: string }; totalBackers: number }) {
    const classes = useStyles();

    const inflowOutflowValues = [
        {
            title: 'Total Raised',
            subtitle: currencyValue(humanifyNumber(new BigNumber(props.globalValues.totalRaised).plus(props.todayData.totalRaised).toString())),
            postsubtitle: 'cUSD',
        },
        {
            title: 'Total Distributed',
            subtitle: currencyValue(humanifyNumber(new BigNumber(props.globalValues.totalDistributed).plus(props.todayData.totalClaimed).toString())),
            postsubtitle: 'cUSD',
        },
        {
            title: '# Backers',
            subtitle: numericalValue(props.totalBackers.toString()),
        },
        {
            title: '# Beneficiaries',
            subtitle: numericalValue((props.globalValues.totalBeneficiaries + props.todayData.totalBeneficiaries).toString()),
        },
    ];

    const ubiPulseValues = [
        {
            title: 'Giving Rate per Backer',
            subtitle: '~' + currencyValue(props.globalValues.givingRate.toString()),
            postsubtitle: ' / day',
        },
        {
            title: 'UBI Rate per Beneficiary',
            subtitle: '~' + currencyValue(props.globalValues.ubiRate.toString()),
            postsubtitle: ' / day',
        },
        {
            title: 'Avg Cumulative UBI',
            subtitle: '~' + currencyValue(humanifyNumber(props.globalValues.avgComulativeUbi), false),
            postsubtitle: ' / beneficiary',
        },
        {
            title: 'Avg UBI duration',
            subtitle: '~' + numericalValue(props.globalValues.avgUbiDuration.toString(), false),
            postsubtitle: ' months / beneficiary',
        },
    ];

    const economicActivityValues = [
        {
            title: 'Total Volume',
            subtitle: currencyValue(humanifyNumber(props.globalValues.totalVolume)),
            postsubtitle: 'cUSD',
        },
        {
            title: '# Transactions',
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
                    Explore the main indicators of impactMarket system, including inflow of funds, distribution of basic income to beneficiaries through their UBI community contracts, and usage of those funds.
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
                        <Grid key={total.title} item xs={12} sm={3}>
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
                    Economic beneficiaries' activity
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
