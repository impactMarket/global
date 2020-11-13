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
import { IGlobalDailyState } from '../types';

import moment from 'moment';
import { currencyValue, humanifyNumber, numericalValue } from '../helpers';
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

export default function Distribution(props: { globalValues: IGlobalDailyState[] }) {
    const classes = useStyles();
    const [outflow, setOutflow] = useState<any[]>([]);
    const [chartLineWidth, setChartLineWidth] = useState(100);
    const [chartBarWidth, setChartBarWidth] = useState(100);

    useEffect(() => {
        const loadOutflow = () => {
            const charts = [
                {
                    title: 'Claimed',
                    subtitle: currencyValue(humanifyNumber(props.globalValues.reduce((acc, c) => acc.plus(c.claimed), new BigNumber('0')).toString())),
                    postsubtitle: 'cUSD',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: parseFloat(humanifyNumber(g.claimed)) })).reverse(),
                    line: false,
                    tooltip: '{{date}} were claimed ${{value}}',
                },
                {
                    title: 'Claims',
                    subtitle: numericalValue(props.globalValues.reduce((acc, c) => acc + c.claims, 0).toString()),
                    postsubtitle: '',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: g.claims })).reverse(),
                    line: true,
                    tooltip: '{{date}} were realized {{value}} claims',
                },
                {
                    title: 'Beneficiaries',
                    subtitle: numericalValue(props.globalValues.reduce((acc, c) => acc + c.beneficiaries, 0).toString()),
                    postsubtitle: '',
                    data: props.globalValues.map((g) => ({ name: new Date(g.date).getTime(), uv: g.beneficiaries })).reverse(),
                    line: true,
                    tooltip: '{{date}} were added {{value}} new beneficiaries',
                },
            ]
            console.log(props.globalValues[0].date, new Date(props.globalValues[0].date))
            setOutflow(charts);
        }
        loadOutflow();
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
                Monthly Distribution
            </Typography>
            <Typography variant="subtitle1">
                Beneficiaries from different communities have access to an unconditional basic income, by claiming $cUSD on a regular basis from their community contracts. Each contract UBI parameters take into consideration their beneficiaries' basic needs, and assessment by local social organizations and community leaders.
            </Typography>
        </div>
        <div style={{ margin: '16px 0px' }}>
            <Grid container justify="space-between" spacing={2}>
                {outflow.map((chart) => (
                    <Grid key={chart.title} item xs={12} sm={4}>
                        <Paper
                            style={{ padding: 16 }}
                            ref={(r) => paperSize(r, chart.line)}
                        >
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
