import { Grid, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';
import { useStyles } from '../../helpers/theme';
import { currencyValue, humanifyNumber, numericalValue } from '../../helpers';
import { ChartData, GlobalGrowth, IGlobalDailyState } from '../../types';
import ChartBox from '../../components/ChartBox';

export default function Economic(props: { globalValues: IGlobalDailyState[], reachedLastMonth: number,  growth: GlobalGrowth }) {
    const classes = useStyles();
    const [fundraising, setFundraising] = useState<ChartData[]>([]);

    useEffect(() => {
        const loadFundraising = () => {
            const charts: ChartData[] = [
                {
                    title: 'Volume',
                    subtitle: currencyValue(humanifyNumber(props.globalValues.reduce((acc, c) => acc.plus(c.volume), new BigNumber('0')).toString())),
                    postsubtitle: 'cUSD',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: parseFloat(humanifyNumber(g.volume)) })).reverse(),
                    line: false,
                    tooltip: '${{value}} transacted on {{date}}',
                    growth: props.growth.volume,
                },
                {
                    title: '# Transactions',
                    subtitle: numericalValue(props.globalValues.reduce((acc, c) => acc + c.transactions, 0).toString()),
                    postsubtitle: '',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: g.transactions })).reverse(),
                    line: true,
                    tooltip: '{{value}} transactions on {{date}}',
                    growth: props.growth.transactions,
                },
                {
                    title: 'Reach',
                    subtitle: numericalValue(props.reachedLastMonth.toString()),
                    postsubtitle: '',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: g.reach })).reverse(),
                    line: true,
                    tooltip: '{{value}} addresses reached on {{date}}',
                    growth: props.growth.reach,
                },
            ]
            setFundraising(charts);
        }
        loadFundraising();
    }, [props.globalValues]);

    return <>
        <div>
            <Typography variant="h2" className={classes.headerSection}>
                Monthly Economic Development
            </Typography>
            <Typography variant="subtitle1">
                Main indicators on beneficiaries' direct financial activity including volume transacted last month, number of transactions, and how many people they have reached/transacted with.
            </Typography>
        </div>
        <div style={{ margin: '16px 0px' }}>
            <Grid container justify="space-between" spacing={2}>
                {fundraising.map((chart) => (
                    <Grid key={chart.title} item xs={12} sm={4}>
                        <ChartBox chart={chart} />
                    </Grid>
                ))}
            </Grid>
        </div>
    </>

}
