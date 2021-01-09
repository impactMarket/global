import { Grid, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';
import { useStyles } from '../../helpers/theme';
import { currencyValue, humanifyNumber, numericalValue } from '../../helpers';
import { ChartData, IGlobalDailyState } from '../../types';
import ChartBox from '../../components/ChartBox';

export default function Inflow(props: { globalValues: IGlobalDailyState[] }) {
    const classes = useStyles();
    const [fundraising, setFundraising] = useState<ChartData[]>([]);

    useEffect(() => {
        const loadFundraising = () => {
            const charts: ChartData[] = [
                {
                    title: 'Raised',
                    subtitle: currencyValue(humanifyNumber(props.globalValues.reduce((acc, c) => acc.plus(c.raised), new BigNumber('0')).toString())),
                    postsubtitle: 'cUSD',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: parseFloat(humanifyNumber(g.raised)) })).reverse(),
                    line: false,
                    tooltip: '${{value}} raised on {{date}}',
                    growth: Math.ceil((parseFloat(humanifyNumber(props.globalValues[0].raised)) - parseFloat(humanifyNumber(props.globalValues[props.globalValues.length - 1].raised))) / parseFloat(humanifyNumber(props.globalValues[props.globalValues.length - 1].raised)) * 100),
                },
                {
                    title: '# Backers',
                    subtitle: numericalValue(props.globalValues[0].backers.toString()),
                    postsubtitle: '',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: g.backers })).reverse(),
                    line: true,
                    tooltip: '{{value}} monthy active backers on {{date}}',
                    growth: Math.ceil((props.globalValues[0].backers - props.globalValues[props.globalValues.length - 1].backers) / props.globalValues[props.globalValues.length - 1].backers * 100),
                },
                {
                    title: 'Funding Rate',
                    subtitle: props.globalValues[0].fundingRate.toString(),
                    postsubtitle: '%',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: g.fundingRate })).reverse(),
                    line: true,
                    tooltip: '{{value}} funding rate on {{date}}',
                    growth: Math.ceil((props.globalValues[0].fundingRate - props.globalValues[props.globalValues.length - 1].fundingRate) / props.globalValues[props.globalValues.length - 1].fundingRate * 100),
                },
            ]
            setFundraising(charts);
        }
        loadFundraising();
    }, [props.globalValues]);

    return <>
        <div>
            <Typography variant="h2" className={classes.headerSection}>
                Monthly Fundraising
            </Typography>
            <Typography variant="subtitle1">
                Anyone can back those communities by sending $cUSD (Celo Dollar) directly to their contracts. This measures global monthly inflow, and its rate vs distribution.
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
