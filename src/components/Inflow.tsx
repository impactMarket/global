import { Grid, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';

import {
    LineChart,
    Line,
    BarChart,
    Bar, Tooltip, XAxis
} from 'recharts';
import { colors } from '../contants';
import { useStyles } from '../helpers/theme';

import moment from 'moment';
import { currencyValue, humanifyNumber, numericalValue } from '../helpers';
import { IGlobalDailyState } from '../types';
import Paper from './Paper';
import Box from './Box';

function CustomTooltip(props: {
    tooltip: string,
    type?: string,
    payload?: any[],
    label?: string,
    active?: boolean,
}) {
    const { active, payload, label, tooltip } = props;
    if (active && payload !== null && tooltip !== undefined) {
        return (
            <Paper style={{ padding: 10, textAlign: "center" }}>
                <p>{tooltip.replace('{{date}}', moment(parseInt(label!)).format('MMMM Do')).replace('{{value}}', payload![0].value)}</p>
            </Paper>
        );
    }
    return null;
}

export default function Inflow(props: { globalValues: IGlobalDailyState[] }) {
    const classes = useStyles();
    const [fundraising, setFundraising] = useState<any[]>([]);
    const [chartWidth, setChartWidth] = useState(100);


    useEffect(() => {
        const loadFundraising = () => {
            const charts = [
                {
                    title: 'Raised',
                    subtitle: currencyValue(humanifyNumber(props.globalValues.reduce((acc, c) => acc.plus(c.raised), new BigNumber('0')).toString())),
                    postsubtitle: 'cUSD',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: parseFloat(humanifyNumber(g.raised)) })).reverse(),
                    line: false,
                    tooltip: '{{date}} were raised ${{value}}',
                },
                {
                    title: 'Backers',
                    subtitle: numericalValue(props.globalValues[0].backers.toString()),
                    postsubtitle: '',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: g.backers })).reverse(),
                    line: true,
                    tooltip: '{{date}} were {{value}} new backers',
                },
                {
                    title: 'Funding Rate',
                    subtitle: props.globalValues[0].fundingRate,
                    postsubtitle: '%',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: g.fundingRate })).reverse(),
                    line: true,
                    tooltip: '{{date}} had {{value}} funding rate',
                },
            ]
            setFundraising(charts);
        }
        loadFundraising();
    }, [props.globalValues]);

    const paperSize = (instance: unknown) => {
        if (instance === null) {
            return;
        }
        setChartWidth((instance as any).getBoundingClientRect().width - 20);
    }

    const drawChart = (chart: any) => {
        if (chart.line) {
            return <LineChart width={chartWidth} height={200} data={chart.data}>
                <XAxis dataKey="name" hide />
                <Tooltip content={<CustomTooltip tooltip={chart.tooltip} />} />
                <Line type="monotone" dataKey="uv" stroke={colors.aquaBlue} strokeWidth={2} dot={<></>} />
            </LineChart>
        }
        return <BarChart
            width={chartWidth}
            height={200}
            data={chart.data}
        >
            <XAxis dataKey="name" hide />
            <Tooltip content={<CustomTooltip tooltip={chart.tooltip} />} />
            <Bar dataKey="uv" fill={colors.aquaBlue} barSize={4} />
        </BarChart>
    }

    return <>
        <div>
            <Typography variant="h2" className={classes.header}>
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
                        <Paper style={{ padding: 10 }} ref={(r) => paperSize(r)}>
                            <Box
                                title={chart.title}
                                subtitle={chart.subtitle}
                                postsubtitle={chart.postsubtitle}
                            >
                                {drawChart(chart)}
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    </>

}
