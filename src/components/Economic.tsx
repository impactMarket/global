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

export default function Economic(props: { globalValues: IGlobalDailyState[] }) {
    const classes = useStyles();
    const [fundraising, setFundraising] = useState<any[]>([]);
    const [chartLineWidth, setChartLineWidth] = useState(100);
    const [chartBarWidth, setChartBarWidth] = useState(100);


    useEffect(() => {
        const loadFundraising = () => {
            const charts = [
                {
                    title: 'Volume',
                    subtitle: currencyValue(humanifyNumber(props.globalValues.reduce((acc, c) => acc.plus(c.volume), new BigNumber('0')).toString())),
                    postsubtitle: 'cUSD',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: parseFloat(humanifyNumber(g.volume)) })).reverse(),
                    line: false,
                    tooltip: '{{date}} were transacted ${{value}}',
                },
                {
                    title: '# Transactions',
                    subtitle: numericalValue(props.globalValues.reduce((acc, c) => acc + c.transactions, 0).toString()),
                    postsubtitle: '',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: g.transactions })).reverse(),
                    line: true,
                    tooltip: '{{date}} happened {{value}} transactions',
                },
                {
                    title: 'Reach',
                    subtitle: numericalValue(props.globalValues.reduce((acc, c) => acc + c.reach, 0).toString()),
                    postsubtitle: '',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: g.reach })).reverse(),
                    line: true,
                    tooltip: '{{date}} new {{value}} addresses were reach',
                },
            ]
            setFundraising(charts);
        }
        loadFundraising();
    }, [props.globalValues]);

    const paperSize = (instance: unknown, isLine: boolean) => {
        if (instance === null) {
            return;
        }
        if (isLine) {
            setChartLineWidth((instance as any).getBoundingClientRect().width - 20);
        } else {
            setChartBarWidth((instance as any).getBoundingClientRect().width - 20);
        }
    }

    const drawChart = (chart: any) => {
        if (chart.line) {
            return <LineChart width={chartLineWidth} height={200} data={chart.data}>
                <XAxis dataKey="name" hide />
                <Tooltip content={<CustomTooltip tooltip={chart.tooltip} />} />
                <Line type="monotone" dataKey="uv" stroke={colors.aquaBlue} strokeWidth={2} dot={<></>} />
            </LineChart>
        }
        return <BarChart
            width={chartBarWidth}
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
                        <Paper style={{ padding: 10 }} ref={(r) => paperSize(r, chart.line)}>
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
